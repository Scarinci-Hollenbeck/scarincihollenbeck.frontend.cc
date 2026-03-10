import {
  CareerCard,
  CareerCardContent,
  CareerCardDescription,
  CareerCardDuration,
  CareerCardFooter,
  CareerCardLocation,
  CareerCardTitle,
} from 'styles/PositionCard.style';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import empty from 'is-empty';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';

const checkAllOffices = (locations) => {
  if (empty(locations)) return null;

  if (locations.length > 1) {
    return 'Multiple locations';
  }

  return locations[0].title;
};

export default function PositionCard({
  title,
  miniDescription,
  locations,
  duration,
  href,
}) {
  return (
    <CareerCard href={href}>
      <CareerCardContent>
        {title && <CareerCardTitle title={title}>{title}</CareerCardTitle>}
        {miniDescription && (
          <CareerCardDescription>
            <JSXWithDynamicLinks HTML={miniDescription} />
          </CareerCardDescription>
        )}
      </CareerCardContent>

      {(!empty(locations) || !empty(duration)) && (
        <CareerCardFooter>
          {!empty(locations) && (
            <CareerCardLocation>
              {checkAllOffices(locations)}
            </CareerCardLocation>
          )}
          {!empty(duration) && (
            <CareerCardDuration>
              <BsFillBriefcaseFill />
              {duration}
            </CareerCardDuration>
          )}
        </CareerCardFooter>
      )}
    </CareerCard>
  );
}
