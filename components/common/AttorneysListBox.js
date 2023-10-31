import { AttorneysContainer } from 'styles/AttorneysListBox.style';
import { Fragment, useState } from 'react';
import AttorneySpecialCard from 'components/molecules/common-practices-specials/AttorneySpecialCard';
import AttorneyPracticeCard from '../molecules/practice/AttorneyPracticeCard';
import useStateScreen from '../../hooks/useStateScreen';
import AttorneyCard from '../shared/AttorneyCard';
import AttorneyCannabisCard from '../molecules/cannabis-law/AttorneyCannabisCard';

const CardVariantsMap = {
  default: AttorneyPracticeCard,
  cannabis: AttorneyCannabisCard,
  special: AttorneySpecialCard,
};
const renderCardsByVariants = (variant, propsCard, cardsMap) => {
  const AttorneysCardVariable = cardsMap[variant];
  return <AttorneysCardVariable {...propsCard} />;
};

const AttorneysListBox = ({ attorneys, variant = 'default' }) => {
  const { chairs, attorneysList } = attorneys;
  const { isMobileScreen } = useStateScreen();
  const [cardIdHovered, setCardIdHovered] = useState();
  return (
    <AttorneysContainer isNotDefault={variant}>
      {chairs?.length > 0 && (
        <div className="chair-box">
          <h3>Chair</h3>
          <div>
            {isMobileScreen
              ? chairs?.map((chair) => (
                <AttorneyCard
                  key={chair.databaseId}
                  link={`${chair.link}`}
                  image={chair.profileImage}
                  name={chair.title}
                  designation={chair.designation}
                  number={chair.phoneNumber}
                  email={chair.email}
                  width={80}
                  height={112}
                  type="/attorneys/[slug]"
                />
              ))
              : chairs?.map(
                ({
                  databaseId,
                  link,
                  profileImage,
                  title,
                  designation,
                  phoneNumber,
                  email,
                }) => (
                  <Fragment key={databaseId}>
                    {renderCardsByVariants(
                      variant,
                      {
                        classNameProp: 'vertical-attorney-card',
                        key: databaseId,
                        link,
                        image: profileImage,
                        name: title,
                        designation,
                        number: phoneNumber,
                        email,
                        width: 180,
                        height: 210,
                        setterId: setCardIdHovered,
                        cardIdHovered,
                        databaseId,
                      },
                      CardVariantsMap,
                    )}
                  </Fragment>
                ),
              )}
          </div>
        </div>
      )}

      {attorneysList?.length > 0 && (
        <div className="attorneys-list-box">
          <h3>Attorneys</h3>
          <div>
            {isMobileScreen
              ? attorneysList.map((attorney) => (
                <AttorneyCard
                  key={attorney.databaseId}
                  link={`${attorney.link}`}
                  image={attorney.profileImage}
                  name={attorney.title}
                  designation={attorney.designation}
                  number={attorney.phoneNumber}
                  email={attorney.email}
                  width={80}
                  height={112}
                  type="/attorneys/[slug]"
                />
              ))
              : attorneysList.map(
                ({
                  databaseId,
                  link,
                  profileImage,
                  title,
                  designation,
                  phoneNumber,
                  email,
                }) => (
                  <Fragment key={databaseId}>
                    {renderCardsByVariants(
                      variant,
                      {
                        classNameProp: 'vertical-attorney-card',
                        key: databaseId,
                        link,
                        image: profileImage,
                        name: title,
                        designation,
                        number: phoneNumber,
                        email,
                        width: 180,
                        height: 210,
                        setterId: setCardIdHovered,
                        cardIdHovered,
                        databaseId,
                      },
                      CardVariantsMap,
                    )}
                  </Fragment>
                ),
              )}
          </div>
        </div>
      )}
    </AttorneysContainer>
  );
};

export default AttorneysListBox;
