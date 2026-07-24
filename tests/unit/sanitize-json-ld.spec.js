import { test, expect } from '@playwright/test';
import { sanitizeJsonLd } from '../../utils/sanitize-json-ld';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a data broker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A business that sells personal data.',
      },
    },
  ],
};

test.describe('sanitizeJsonLd — step 1: empty / non-string input', () => {
  test('returns null for null', () => {
    expect(sanitizeJsonLd(null)).toBeNull();
  });

  test('returns null for undefined', () => {
    expect(sanitizeJsonLd(undefined)).toBeNull();
  });

  test('returns null for an empty string', () => {
    expect(sanitizeJsonLd('')).toBeNull();
  });

  test('returns null for a whitespace-only string', () => {
    expect(sanitizeJsonLd('   \n\t  ')).toBeNull();
  });

  test('returns null for a number', () => {
    expect(sanitizeJsonLd(42)).toBeNull();
  });

  test('returns null for an object', () => {
    expect(sanitizeJsonLd({ '@type': 'FAQPage' })).toBeNull();
  });

  test('returns null for an array', () => {
    expect(sanitizeJsonLd([1, 2, 3])).toBeNull();
  });

  test('returns null for a boolean', () => {
    expect(sanitizeJsonLd(true)).toBeNull();
  });
});

test.describe('sanitizeJsonLd — steps 2 & 5: trim and canonical output', () => {
  test('returns a canonical JSON string for a valid JSON object', () => {
    const result = sanitizeJsonLd(JSON.stringify(FAQ_SCHEMA));

    expect(result).toBe(JSON.stringify(FAQ_SCHEMA));
    expect(JSON.parse(result)['@type']).toBe('FAQPage');
  });

  test('collapses pretty-printed JSON to a single line', () => {
    const result = sanitizeJsonLd(JSON.stringify(FAQ_SCHEMA, null, 2));

    expect(result).toBe(JSON.stringify(FAQ_SCHEMA));
    expect(result).not.toContain('\n');
  });

  test('trims surrounding whitespace before parsing', () => {
    const result = sanitizeJsonLd(`\n\t  ${JSON.stringify(FAQ_SCHEMA)}  \n`);

    expect(result).toBe(JSON.stringify(FAQ_SCHEMA));
  });

  test('strips a byte order mark', () => {
    const result = sanitizeJsonLd(
      `${String.fromCharCode(0xfeff)}${JSON.stringify(FAQ_SCHEMA)}`,
    );

    expect(result).toBe(JSON.stringify(FAQ_SCHEMA));
  });
});

test.describe('sanitizeJsonLd — step 3: accidental <script> wrapper', () => {
  test('strips a <script type="application/ld+json"> wrapper', () => {
    const raw = `<script type="application/ld+json">${JSON.stringify(
      FAQ_SCHEMA,
    )}</script>`;

    expect(sanitizeJsonLd(raw)).toBe(JSON.stringify(FAQ_SCHEMA));
  });

  test('strips a bare <script> wrapper', () => {
    const raw = `<script>${JSON.stringify(FAQ_SCHEMA)}</script>`;

    expect(sanitizeJsonLd(raw)).toBe(JSON.stringify(FAQ_SCHEMA));
  });

  test('strips a wrapper padded with whitespace inside and outside', () => {
    const raw = `\n  <script type="application/ld+json">\n    ${JSON.stringify(
      FAQ_SCHEMA,
    )}\n  </script>\n`;

    expect(sanitizeJsonLd(raw)).toBe(JSON.stringify(FAQ_SCHEMA));
  });

  test('is case-insensitive about the SCRIPT tag name', () => {
    const raw = `<SCRIPT TYPE="application/ld+json">${JSON.stringify(
      FAQ_SCHEMA,
    )}</SCRIPT>`;

    expect(sanitizeJsonLd(raw)).toBe(JSON.stringify(FAQ_SCHEMA));
  });

  test('strips a wrapper whose closing tag has trailing whitespace', () => {
    expect(sanitizeJsonLd('<script>{"@type":"FAQPage"}</script >')).toBe(
      '{"@type":"FAQPage"}',
    );
  });

  test('keeps a </script> that sits inside a string value', () => {
    const raw = '<script>{"@type":"X","n":"</script>"}</script>';

    expect(JSON.parse(sanitizeJsonLd(raw)).n).toBe('</script>');
  });

  test('returns null for two separate wrappers', () => {
    const raw = '<script>{"@type":"A"}</script><script>{"@type":"B"}</script>';

    expect(sanitizeJsonLd(raw)).toBeNull();
  });

  test('returns null when junk trails the wrapper', () => {
    expect(sanitizeJsonLd('<script>{"@type":"X"}</script>junk')).toBeNull();
  });
});

test.describe('sanitizeJsonLd — step 4: invalid JSON', () => {
  test('returns null for a truncated object', () => {
    expect(sanitizeJsonLd('{oops')).toBeNull();
  });

  test('returns null for JSON with a trailing comma', () => {
    expect(sanitizeJsonLd('{"@type": "FAQPage",}')).toBeNull();
  });

  test('returns null for plain prose', () => {
    expect(sanitizeJsonLd('please add my schema here')).toBeNull();
  });

  test('returns null for a <script> wrapper around invalid JSON', () => {
    expect(sanitizeJsonLd('<script>{oops</script>')).toBeNull();
  });

  test('returns null for a <script> wrapper with an empty body', () => {
    expect(
      sanitizeJsonLd('<script type="application/ld+json">   </script>'),
    ).toBeNull();
  });

  test('returns null for HTML-entity-encoded quotes', () => {
    expect(sanitizeJsonLd('{&quot;@type&quot;:&quot;X&quot;}')).toBeNull();
  });

  test('returns null for an HTML comment wrapper', () => {
    expect(sanitizeJsonLd('<!-- {"@type":"X"} -->')).toBeNull();
  });
});

test.describe('sanitizeJsonLd — step 6: </script> breakout protection', () => {
  test('escapes < inside string values so no </script> survives', () => {
    const raw = JSON.stringify({
      '@type': 'FAQPage',
      name: 'Breakout attempt </script><script>alert(1)</script>',
    });

    const result = sanitizeJsonLd(raw);

    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<');
    expect(result).toContain('\\u003c');
  });

  test('escapes the <!-- comment opener too', () => {
    const result = sanitizeJsonLd(
      JSON.stringify({ '@type': 'X', n: 'a <!-- b' }),
    );

    expect(result).not.toContain('<');
    expect(JSON.parse(result).n).toBe('a <!-- b');
  });

  test('escaped output is still parseable JSON with the value intact', () => {
    const raw = JSON.stringify({ '@type': 'FAQPage', name: 'a < b </script>' });

    const result = sanitizeJsonLd(raw);

    expect(() => JSON.parse(result)).not.toThrow();
    expect(JSON.parse(result).name).toBe('a < b </script>');
  });

  test('escapes < that appears in a key as well as a value', () => {
    const result = sanitizeJsonLd(JSON.stringify({ '<key>': '<value>' }));

    expect(result).not.toContain('<');
    expect(JSON.parse(result)['<key>']).toBe('<value>');
  });

  test('an already-escaped \\u003c round-trips without doubling', () => {
    const result = sanitizeJsonLd('{"@type":"X","n":"\\u003c"}');

    expect(JSON.parse(result).n).toBe('<');
    expect(result).not.toContain('<');
  });
});

test.describe('sanitizeJsonLd — unicode line terminators', () => {
  const LINE_SEP = String.fromCharCode(0x2028);
  const PARA_SEP = String.fromCharCode(0x2029);

  test('escapes U+2028 and U+2029, which JSON.stringify leaves raw', () => {
    const name = `a${LINE_SEP}b${PARA_SEP}c`;
    const result = sanitizeJsonLd(JSON.stringify({ '@type': 'FAQPage', name }));

    expect(result).not.toContain(LINE_SEP);
    expect(result).not.toContain(PARA_SEP);
    expect(JSON.parse(result).name).toBe(name);
  });
});

test.describe('sanitizeJsonLd — never throws, whatever the field holds', () => {
  test('returns null instead of throwing when JSON is too deep to serialise', () => {
    // JSON.parse copes with this depth; JSON.stringify blows the call stack.
    const tooDeep = `${'['.repeat(5000)}${']'.repeat(5000)}`;

    expect(() => sanitizeJsonLd(tooDeep)).not.toThrow();
    expect(sanitizeJsonLd(tooDeep)).toBeNull();
  });

  test('still handles nesting that is deep but serialisable', () => {
    const deep = `{"@type":"X","a":${'['.repeat(500)}${']'.repeat(500)}}`;

    expect(() => sanitizeJsonLd(deep)).not.toThrow();
    expect(JSON.parse(sanitizeJsonLd(deep))['@type']).toBe('X');
  });

  test('does not pollute Object.prototype via a __proto__ key', () => {
    const result = sanitizeJsonLd('{"@type":"X","__proto__":{"polluted":1}}');

    expect({}.polluted).toBeUndefined();
    expect(JSON.parse(result)['@type']).toBe('X');
  });
});

test.describe('sanitizeJsonLd — @graph and other shapes', () => {
  test('canonicalises an @graph array of several schemas', () => {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        FAQ_SCHEMA,
        { '@type': 'BreadcrumbList', itemListElement: [] },
        { '@type': 'HowTo', name: 'How to comply' },
      ],
    };

    const result = sanitizeJsonLd(JSON.stringify(graph));

    expect(result).toBe(JSON.stringify(graph));
    expect(JSON.parse(result)['@graph']).toHaveLength(3);
  });

  test('accepts a top-level array of schemas', () => {
    const arr = [FAQ_SCHEMA, { '@type': 'HowTo' }];

    expect(JSON.parse(sanitizeJsonLd(JSON.stringify(arr)))).toHaveLength(2);
  });

  test('returns null for valid JSON that is not an object or array', () => {
    expect(sanitizeJsonLd('"just a string"')).toBeNull();
    expect(sanitizeJsonLd('42')).toBeNull();
    expect(sanitizeJsonLd('null')).toBeNull();
    expect(sanitizeJsonLd('true')).toBeNull();
  });

  test('returns null for an empty object or empty array', () => {
    expect(sanitizeJsonLd('{}')).toBeNull();
    expect(sanitizeJsonLd('[]')).toBeNull();
  });

  test('preserves unicode content', () => {
    const raw = JSON.stringify({ '@type': 'FAQPage', name: 'Ünïcøde — тест' });

    expect(JSON.parse(sanitizeJsonLd(raw)).name).toBe('Ünïcøde — тест');
  });
});
