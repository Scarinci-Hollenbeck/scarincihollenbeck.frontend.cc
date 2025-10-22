import empty from 'is-empty';
import Link from 'next/link';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { NewsCardBlock, CardFooterBox } from 'styles/SimpleNewsCard.style';
import { formatDate } from '../../utils/helpers';
import { videoRender } from '../../utils/videoRender';

const SimpleNewsCard = ({
  title,
  textPost,
  label,
  date,
  link,
  video,
  isWide,
  isAuthor,
  isFull,
  isJSXDescription,
  isWhite,
}) => {
  const Component = empty(video) && !empty(link) ? Link : 'div';
  const DescriptionComponent = isJSXDescription ? 'div' : 'p';
  const conditionLayoutProps = empty(video) && !empty(link)
    ? {
      href: link?.url,
      passHref: true,
      target: link?.target === '_blank' ? '_blank' : undefined,
      rel: link?.target === '_blank' ? 'noopener noreferrer' : undefined,
    }
    : null;

  const videoData = typeof video === 'string'
    ? video
    : {
      type: video?.mimeType,
      src: video?.mediaItemUrl,
    };

  return (
    <NewsCardBlock $isWide={isWide} $isFull={isFull} $isWhite={isWhite}>
      <Component {...conditionLayoutProps} className="news-card-wrapper">
        {!empty(video) && (
          <div className="news-card-video">
            {videoRender(videoData, null, { height: 208 })}
          </div>
        )}

        <div className="news-card-content">
          <div className="news-card-info">
            <h4 className="news-card-title" title={title}>
              {title}
            </h4>
            {!empty(textPost) && (
              <DescriptionComponent
                className="news-card-text"
                title={!isJSXDescription ? textPost : undefined}
              >
                {isJSXDescription ? (
                  <JSXWithDynamicLinks HTML={textPost} />
                ) : (
                  textPost
                )}
              </DescriptionComponent>
            )}
          </div>

          {(!empty(label) || !empty(date)) && (
            <CardFooterBox>
              {!empty(label) && (
                <p className="news-card-label" title={label}>
                  {isAuthor && <span>Author: </span>}
                  {label}
                </p>
              )}

              {!empty(date) && (
                <time dateTime={date} className="news-card-date">
                  {formatDate(date)}
                </time>
              )}
            </CardFooterBox>
          )}
        </div>
      </Component>
    </NewsCardBlock>
  );
};

export default SimpleNewsCard;
