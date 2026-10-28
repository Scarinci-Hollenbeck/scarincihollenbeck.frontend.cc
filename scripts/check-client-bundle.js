// Fails the build when server-only code or secrets end up in client chunks.
// Runs after `next build` (see the `build` script in package.json).
//
// Typical cause: a page exports a helper besides getStaticProps/getStaticPaths.
// Next strips only those two from the client bundle, so any other export that
// calls fetchAPI drags the WordPress service-account login into the browser.
// Keep data helpers in pages unexported, or move them to requests/.

const fs = require('fs');
const path = require('path');
const { loadEnvConfig } = require('@next/env');

const CHUNKS_DIR = path.join(__dirname, '..', '.next', 'static');

// Code markers of server-only modules (requests/api.js).
const FORBIDDEN_CODE = [
  'mutation { login',
  'authToken',
  'WP_LOGIN',
  'WP_PASSWORD',
  'FIREBASE_PRIVAT_KEY',
  'wp-json/wcra/v1',
  'secret_key',
  'PRIVATE KEY-----',
];

// Secret values, checked only when the build environment has them. Values are
// never printed. Short values are skipped to avoid matching unrelated code.
// NEXT_PUBLIC_WP_REST_KEY is the old name of WP_REST_KEY, kept until it is removed from Vercel.
const SECRET_ENV_VARS = [
  'WP_PASSWORD',
  'FIREBASE_PRIVAT_KEY',
  'WP_REST_KEY',
  'NEXT_PUBLIC_WP_REST_KEY',
];
const MIN_SECRET_LENGTH = 8;

const listJsFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const fullPath = path.join(dir, entry.name);
  if (entry.isDirectory()) return listJsFiles(fullPath);
  return entry.name.endsWith('.js') ? [fullPath] : [];
});

if (!fs.existsSync(CHUNKS_DIR)) {
  console.error(
    `check-client-bundle: ${CHUNKS_DIR} not found, run next build first`,
  );
  process.exit(1);
}

// Same .env* files next build reads; on Vercel the vars are already set.
loadEnvConfig(path.join(__dirname, '..'));

const secrets = SECRET_ENV_VARS.map((name) => ({
  name,
  value: process.env[name],
})).filter(({ value }) => value && value.length >= MIN_SECRET_LENGTH);

const files = listJsFiles(CHUNKS_DIR);
const problems = files.flatMap((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const relative = path.relative(process.cwd(), file);

  return [
    ...FORBIDDEN_CODE.filter((marker) => content.includes(marker)).map(
      (marker) => `${relative}: contains "${marker}"`,
    ),
    ...secrets
      .filter(({ value }) => content.includes(value))
      .map(({ name }) => `${relative}: contains the value of ${name}`),
  ];
});

if (problems.length) {
  console.error(
    'check-client-bundle: server-only code or secrets found in client chunks:',
  );
  problems.forEach((problem) => console.error(`  ${problem}`));
  process.exit(1);
}

console.warn(
  `check-client-bundle: ${files.length} client chunks clean `
    + `(${FORBIDDEN_CODE.length} code markers, ${secrets.length} secret values checked)`,
);
