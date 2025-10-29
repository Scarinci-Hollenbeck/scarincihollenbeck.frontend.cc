import empty from 'is-empty';
import Link from 'next/link';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { NewsCardBlock, CardFooterBox } from 'styles/SimpleNewsCard.style';
import { formatDate } from '../../utils/helpers';
import { videoRender } from '../../utils/videoRender';

const renderDate = (date) => {
  if (empty(date)) return null;
  return (
    <time dateTime={date} className="news-card-date">
      {formatDate(date)}
    </time>
  );
};

const SimpleNewsCard = ({
  title,
  textPost,
  label,
  authors,
  date,
  link,
  video,
  services,
  isSpecial = false,
  isWide,
  isFull,
  isJSXDescription,
  isWhite,
  isRedTitle,
}) => {
  const DescriptionComponent = isJSXDescription ? 'div' : 'p';
  const videoData = typeof video === 'string'
    ? video
    : {
      type: video?.mimeType,
      src: video?.mediaItemUrl,
    };

  return (
    <NewsCardBlock
      $isWide={isWide}
      $isFull={isFull}
      $isWhite={isWhite}
      $isRedTitle={isRedTitle}
      $isSpecial={isSpecial}
    >
      {!empty(video) && (
        <div className="news-card-video">
          {videoRender(videoData, null, { height: 208 })}
        </div>
      )}

      <div className="news-card-content">
        <div className="news-card-info">
          {!empty(title) && (
            <h3 className="news-card-title" title={title}>
              {title}
            </h3>
          )}

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

          {!empty(services) && (
            <div>
              {services.map((service) => (
                <Link
                  key={service?.databaseId}
                  href={service?.uri}
                  className="news-card-service"
                >
                  {service?.title}
                </Link>
              ))}
            </div>
          )}

          {isSpecial && renderDate(date)}

          {!empty(authors) && (
            <div>
              {authors.map((author, index) => (
                <Link
                  key={author?.databaseId}
                  href={author?.uri}
                  className={`news-card-author ${
                    author?.isCurrent ? 'current' : ''
                  }`}
                >
                  {`${author?.title}${index < authors.length - 1 ? ', ' : ''}`}
                </Link>
              ))}
            </div>
          )}
        </div>

        {(!empty(label) || !empty(date)) && !isSpecial && (
          <CardFooterBox>
            {!empty(label) && (
              <p className="news-card-label" title={label}>
                {label}
              </p>
            )}

            {renderDate(date)}
          </CardFooterBox>
        )}
      </div>

      {empty(video) && !empty(link?.url) && (
        <Link
          href={link?.url}
          passHref
          target={link?.target === '_blank' ? '_blank' : undefined}
          rel={link?.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="news-card-link"
        />
      )}
    </NewsCardBlock>
  );
};

export default SimpleNewsCard;
