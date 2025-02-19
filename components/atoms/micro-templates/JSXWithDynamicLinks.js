import parse, { domToReact } from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import empty from 'is-empty';
import {
  BASE_API_URL,
  HTTP_PRODUCTION_URL,
  HTTP_WWW_PRODUCTION_URL,
  PRODUCTION_URL,
} from '../../../utils/constants';
import {
  cutSlashFromTheEnd,
  getCloudinaryImageUrl,
} from '../../../utils/helpers';

const createImageSrc = (attribs) => {
  if (
    empty(attribs?.['data-srcset'])
    && !empty(attribs?.['data-version'])
    && !empty(attribs?.['data-public-id'])
  ) {
    return getCloudinaryImageUrl(
      attribs?.['data-version'],
      attribs?.['data-public-id'],
    );
  }
  return attribs?.['data-srcset'] || attribs?.src;
};

const getWikiLink = (href) => {
  if (!empty(href) && !href.includes('http')) {
    return href?.replace(
      '//upload.wikimedia.org/',
      'https://upload.wikimedia.org/',
    );
  }
  return href;
};

const productionUrls = [
  PRODUCTION_URL,
  HTTP_PRODUCTION_URL,
  HTTP_WWW_PRODUCTION_URL,
  BASE_API_URL,
];
// Parsing HTML and replace a hardcode-domain to dynamic href for <Link/>. This function returns React jsx components.
export const JSXWithDynamicLinks = ({ HTML, print, isHoliday }) => {
  if (empty(HTML)) return null;

  const options = {
    replace: (domNode) => {
      if (domNode.type !== 'tag') return;

      if (domNode.attribs?.style) {
        delete domNode.attribs.style;
      }

      if (domNode.name === 'h1') {
        domNode.attribs.class = 'animate__animated animate__fadeInDown animate__fast';
      }

      if (domNode.name === 'a') {
        if (
          productionUrls.some((url) => domNode.attribs.href?.includes(url))
          && !domNode.attribs.href.includes('/wp-content/')
        ) {
          const uri = domNode.attribs.href?.split('/');
          const uriSliced = `/${uri.slice(3).join('/')}`;
          const urlCutPossibleSlash = cutSlashFromTheEnd(uriSliced);
          const href = !urlCutPossibleSlash ? '/' : urlCutPossibleSlash;
          // Using default tag <a> because with Next component <Link> don't work redirects from next config.
          // Example redirect - from /practices/sports-and-entertainment-law to /practices/entertainment-and-media
          return (
            <a href={href}>
              {domNode.children[0]?.data
                || domNode.children[0]?.children[0]?.data}
            </a>
          );
        }

        if (!empty(domNode.attribs.href)) {
          const alienUrl = domNode.attribs.href;
          const modifiedAlienUrl = alienUrl.startsWith('http:')
            ? `https:${alienUrl.slice(5)}`
            : alienUrl;
          const modifiedAlienUrlCutSlash = !modifiedAlienUrl.includes(PRODUCTION_URL)
            && modifiedAlienUrl.endsWith('/')
            ? cutSlashFromTheEnd(modifiedAlienUrl)
            : modifiedAlienUrl;
          const hrefTarget = modifiedAlienUrlCutSlash.includes('http')
            && !modifiedAlienUrlCutSlash.includes('scarincihollenbeck.com')
            ? '_blank'
            : domNode.attribs?.target;
          const imageSrc = createImageSrc(domNode?.children[0]?.attribs);

          return (
            <Link href={modifiedAlienUrlCutSlash} target={hrefTarget}>
              {domNode.children[0]?.data
                || domNode.children[0]?.children[0]?.data}
              {domNode.children[0]?.name === 'img' && (
                <Image
                  src={getWikiLink(imageSrc)}
                  alt={domNode.children[0]?.attribs?.alt}
                  width={domNode.children[0]?.attribs?.width || 750}
                  height={domNode.children[0]?.attribs?.height || 350}
                />
              )}
            </Link>
          );
        }
      }

      if (domNode.name === 'img') {
        const imageSrc = createImageSrc(domNode?.attribs);
        if (print) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              // blurDataURL={domNode.attribs['data-srcset'] || domNode.attribs.src}
              src={getWikiLink(imageSrc)}
              alt={domNode.attribs.alt}
              width={domNode.attribs.width || 750}
              height={domNode.attribs.height || 350}
            />
          );
        }

        return (
          <Image
            className="floated-image"
            placeholder="blur"
            blurDataURL={imageSrc}
            loading="lazy"
            src={getWikiLink(imageSrc)}
            alt={domNode.attribs.alt}
            width={domNode.attribs?.width || 1000}
            height={domNode.attribs?.height || 500}
            quality={90}
          />
        );
      }

      if (domNode.name === 'iframe') {
        domNode.attribs.width = '100%';
        domNode.attribs.height = '300';

        return domNode;
      }

      if (domNode.attribs.class === 'wp-video') {
        let video;

        domNode.children.forEach((child) => {
          if (child.name === 'video') {
            video = child;
          }
        });

        return (
          // eslint bug.
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video preload="metadata" controls>
            <source
              type={video.children[0].attribs.type}
              src={video.children[0].attribs.src}
            />
          </video>
        );
      }

      if (domNode.name === 'table') {
        const {
          class: className,
          cellpadding: cellPadding,
          cellspacing: cellSpacing,
          ...restAttribs
        } = domNode.attribs;

        return (
          <div className="table-wrapper">
            <table
              className={className}
              cellPadding={cellPadding}
              cellSpacing={cellSpacing}
              {...restAttribs}
            >
              {domToReact(domNode.children, options)}
            </table>
          </div>
        );
      }

      if (domNode.name === 'ul' || domNode.name === 'ol') {
        domNode.attribs.class = 'text-list';
      }
    },
  };
  return parse(HTML, options);
};
