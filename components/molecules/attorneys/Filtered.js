import LawyerCard from 'components/shared/LawyerCard';
import { useAttorneysSearch } from 'hooks/useAttornySearch';
import { useDispatch } from 'react-redux';
import { AttorneyCardsWrapper } from 'styles/Attornyes.style';
import dynamic from 'next/dynamic';
import { clearAll } from '../../../redux/slices/attorneys.slice';

const FiltersNoResults = dynamic(() => import('../common/FiltersNoResults'));

const Filtered = ({ attorneys, userInput, select }) => {
  const dispatch = useDispatch();
  const { attorneysFiltered } = useAttorneysSearch(
    select,
    userInput,
    attorneys,
  );

  return (
    <>
      {attorneysFiltered?.length === 0 ? (
        <FiltersNoResults
          message="Sorry, no attorneys found according to this query."
          handleClickButton={() => dispatch(clearAll())}
        />
      ) : (
        <AttorneyCardsWrapper>
          {attorneysFiltered.map((info) => (
            <LawyerCard
              key={info.id}
              link={info.link}
              image={info.better_featured_image}
              name={info.title}
              designation={info.designation}
              locations={info.location_array}
              number={info.phone}
              email={info.email}
              isHorizontal
            />
          ))}
        </AttorneyCardsWrapper>
      )}
    </>
  );
};

export default Filtered;
