/**
 * Matches a value that an editor accidentally wrapped in a <script> tag.
 * The contract is "JSON only", but the safeguard must not break on a wrapper.
 * The capture is greedy on purpose: a `</script>` may legitimately appear
 * inside a string value, and only the last one closes the wrapper.
 */
const SCRIPT_WRAPPER_REGEX = /^<script\b[^>]*>([\s\S]*)<\/script\s*>$/i;

const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

/**
 * Characters that must not reach a <script> block verbatim:
 *   `<`       — would allow a `</script>` breakout.
 *   U+2028/9  — legal raw inside a JSON string (JSON.stringify leaves them
 *               alone) but line terminators to a JavaScript parser, so they
 *               break any consumer that evaluates the payload.
 * All three can only occur inside string literals, so escaping them globally
 * keeps the output valid JSON.
 */
const UNSAFE_CHARS_REGEX = new RegExp(
  `[<${LINE_SEPARATOR}${PARAGRAPH_SEPARATOR}]`,
  'g',
);

const UNSAFE_CHAR_ESCAPES = {
  '<': '\\u003c',
  [LINE_SEPARATOR]: '\\u2028',
  [PARAGRAPH_SEPARATOR]: '\\u2029',
};

/**
 * Prepares author-written JSON-LD (ACF field `pageSchemaJsonLd`) for
 * server-side rendering inside <head>.
 *
 * Pipeline:
 *   1. non-string / empty / whitespace-only -> null
 *   2. trim (also drops a byte order mark, which counts as whitespace)
 *   3. unwrap an accidental <script>...</script> wrapper, then trim again
 *   4. JSON.parse — unparseable -> null (a tag without valid JSON is worse
 *      than no tag at all)
 *   5. reject anything that is not a non-empty object or array — an empty
 *      `{}` would render a useless tag, and a bare string/number is not JSON-LD
 *   6. JSON.stringify to canonicalise the output. This can throw a RangeError
 *      on input that JSON.parse accepted (stringify recurses, the parser does
 *      not), so it is guarded — a broken field must never take the page down.
 *   7. escape the characters listed above.
 *
 * Never throws: any malformed value yields null and simply renders no tag.
 *
 * @param {unknown} raw value straight from the GraphQL field
 * @returns {string|null} canonical JSON string safe for dangerouslySetInnerHTML,
 *                        or null when there is nothing to render
 */
export const sanitizeJsonLd = (raw) => {
  if (typeof raw !== 'string') return null;

  let value = raw.trim();
  if (!value) return null;

  const unwrapped = value.match(SCRIPT_WRAPPER_REGEX);
  if (unwrapped) {
    value = unwrapped[1].trim();
    if (!value) return null;
  }

  let canonical;
  try {
    const parsed = JSON.parse(value);

    if (parsed === null || typeof parsed !== 'object') return null;

    const isEmpty = Array.isArray(parsed)
      ? parsed.length === 0
      : Object.keys(parsed).length === 0;
    if (isEmpty) return null;

    canonical = JSON.stringify(parsed);
  } catch (error) {
    return null;
  }

  return canonical.replace(
    UNSAFE_CHARS_REGEX,
    (char) => UNSAFE_CHAR_ESCAPES[char],
  );
};

export default sanitizeJsonLd;
