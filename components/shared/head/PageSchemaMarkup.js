import Head from 'next/head';
import { sanitizeJsonLd } from 'utils/sanitize-json-ld';

/**
 * Renders author-written JSON-LD (ACF field `pageSchemaJsonLd`) into <head>
 * server-side. Kept separate from the *SiteHead components on purpose: those
 * are shared by dozens of pages, this one only renders where it is placed.
 *
 * Renders nothing when the field is empty or holds invalid JSON — an empty
 * <script type="application/ld+json"> tag is never emitted.
 */
const PageSchemaMarkup = ({ schemaJson }) => {
  const sanitized = sanitizeJsonLd(schemaJson);

  if (!sanitized) return null;

  return (
    <Head>
      <script
        key="page-schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </Head>
  );
};

export default PageSchemaMarkup;
