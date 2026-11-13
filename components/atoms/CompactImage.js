import { useCallback, useState } from 'react';
import { getImageProps } from 'next/image';
import { trimSrcSet } from 'utils/trim-src-set';

const PLACEHOLDER_STYLES = [
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
];

/**
 * next/image for a fixed-size slot (`sizes` in pixels only, e.g. a card photo).
 * Same props and markup as next/image, but srcSet lists only the files a
 * browser picks at 1x, 2x and 3x instead of all 13 widths (tasks #13); see
 * utils/trim-src-set.js. With `sizes` in vw (or none) it renders exactly what
 * next/image would.
 *
 * It mirrors what next/image does after render: the blur placeholder is
 * dropped once the image has loaded, and the alt text shows when it fails.
 * Not for `preload` images: next/image adds a preload link for those.
 */
const CompactImage = ({ onLoad, onError, ...imageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const { props } = getImageProps(imageProps);

  const style = { ...props.style };
  if (loaded) PLACEHOLDER_STYLES.forEach((key) => delete style[key]);
  if (failed) delete style.color;

  // An image can finish (or fail) before hydration, when React attaches no
  // handlers yet; check it once the element is mounted.
  const ref = useCallback((img) => {
    if (!img || !img.complete) return;
    if (img.naturalWidth) setLoaded(true);
    else setFailed(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      data-nimg={imageProps.fill ? 'fill' : '1'}
      style={style}
      srcSet={trimSrcSet(props.srcSet, props.sizes)}
      ref={ref}
      onLoad={(event) => {
        setLoaded(true);
        if (onLoad) onLoad(event);
      }}
      onError={(event) => {
        setFailed(true);
        if (onError) onError(event);
      }}
    />
  );
};

export default CompactImage;
