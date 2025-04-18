import dynamic from 'next/dynamic';
import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderCardsSlider from 'layouts/SubHeader/SubHeaderCardsSlider';
import LibraryFilters from 'components/organisms/library/LibraryFilters';
import LibraryResults from 'components/organisms/library/LibraryResults';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setSelectedValues } from '../../redux/slices/library.slice';

const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));
const LibraryQuestionBanner = dynamic(() => import('components/organisms/library/LibraryQuestionBanner'));

const LibraryCategoryPage = ({
  title,
  description,
  seo,
  filters,
  categoryId,
  subHeaderSlides,
  postsData,
  tags,
}) => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    const isCategoryExists = filters?.categories?.find(
      (item) => item?.databaseId === categoryId,
    );
    if (!isCategoryExists) return;
    const newSelectedValues = {
      categories: { value: title, id: categoryId, slug: isCategoryExists?.uri },
    };
    dispatch(setSelectedValues(newSelectedValues));
  }, [query]);

  return (
    <>
      <BasicSiteHead
        title={seo?.title}
        metaDescription={seo?.metaDesc}
        canonicalUrl={seo?.canonicalUrl}
      />
      <SubHeaderDefault
        title={title}
        subtitle={description}
        isSocials
        RightContentComponent={SubHeaderCardsSlider}
        rightContentProps={{
          slides: subHeaderSlides,
          slidesLabel: 'Library',
          isContact: false,
        }}
      />

      <LibraryFilters
        practices={filters?.practices}
        offices={filters?.locations}
        authors={filters?.authors}
        industries={filters?.industries}
        years={filters?.years}
        categories={filters?.categories}
      />

      <LibraryResults postsData={postsData} tags={tags} />

      {categoryId === 30518 ? (
        <LibraryQuestionBanner isLinkCategory={false} />
      ) : (
        <SubscriptionBanner />
      )}
    </>
  );
};
export default LibraryCategoryPage;
