import parse from 'html-react-parser';
import empty from 'is-empty';

const getTextContent = (children) => children.map((c) => c.data ?? getTextContent(c.children ?? [])).join('');

export const extractHeadings = (html) => {
  if (empty(html)) return [];
  const results = [];
  parse(html, {
    replace: (node) => {
      if (
        node.type === 'tag'
        && /^h[1-6]$/.test(node.name)
        && node.attribs?.class?.includes('wp-block-heading')
      ) {
        results.push({
          id: `title-${results.length + 1}`,
          title: getTextContent(node.children).trim(),
        });
      }
    },
  });
  return results;
};
