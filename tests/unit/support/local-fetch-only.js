// Preloaded (NODE_OPTIONS=--require) into scripts run by unit tests: any fetch
// to a host other than 127.0.0.1 throws, so a test can never reach
// production, staging or WordPress.

const realFetch = global.fetch;

global.fetch = (input, init) => {
  const url = new URL(typeof input === 'string' ? input : input.url);
  if (url.hostname !== '127.0.0.1') {
    const error = new Error(`blocked non-local fetch: ${url.origin}`);
    process.stderr.write(`${error.message}\n`);
    return Promise.reject(error);
  }
  return realFetch(input, init);
};
