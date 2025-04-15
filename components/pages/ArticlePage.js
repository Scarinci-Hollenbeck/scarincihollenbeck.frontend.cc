import dynamic from 'next/dynamic';
import PostSiteHead from 'components/shared/head/PostSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import SubHeaderKeyContacts from 'layouts/SubHeader/SubHeaderKeyContacts';
import PostBody from 'components/organisms/post/PostBody';
import empty from 'is-empty';
import { ArticleSecondaryContent } from 'styles/Article.style';
import usePrintLogic from 'hooks/usePrintLogic';
import PostPrintPage from 'components/organisms/post/PostPrintPage';

const PracticeAttorneys = dynamic(() => import('components/organisms/practices/PracticeAttorneys'));
const LogoSeparator = dynamic(() => import('components/common/LogoSeparator'));
const RelatedPosts = dynamic(() => import('components/organisms/post/RelatedPosts'));
const SubscriptionBanner = dynamic(() => import('components/organisms/common/SubscriptionBanner'));

const ArticlePage = ({
  post,
  seo,
  authors,
  relatedPosts,
  mainCategory,
  keyContacts,
  selectedHeroes,
}) => {
  const printPageProps = {
    title: post?.title,
    content: post?.content,
    authors,
    keyContacts,
    category: mainCategory,
    date: post.date,
    tags: post.tags,
    postTypeConnections: post.postTypeConnections,
    attorneys: selectedHeroes,
  };
  const { isRenderPdf, setIsPrintReady, handlePrint } = usePrintLogic();

  return (
    <>
      <PostSiteHead
        seo={seo}
        canonicalUrl={seo?.canonicalUrl}
        post={post}
        authors={authors}
      />
      <SubHeaderDefault
        title={post.title}
        authors={authors}
        date={post.date}
        category={mainCategory}
        isSocials
        isSocialsPrint
        RightContentComponent={SubHeaderKeyContacts}
        rightContentProps={{
          keyContacts,
          isPrint: true,
          handlePrint,
          printButtonText: 'Print article page',
        }}
      />

      <PostBody
        backLink={
          mainCategory?.slug
            ? `/library/category/${mainCategory?.slug}`
            : '/library'
        }
        content={post.content}
        tags={post.tags}
        postTypeConnections={post.postTypeConnections}
      />

      <ArticleSecondaryContent>
        {!empty(selectedHeroes) && (
          <>
            <LogoSeparator direction="row" isBig isContainer />

            <PracticeAttorneys
              attorneys={selectedHeroes}
              title="Lawyers mentioned in this article"
              isBackground={false}
            />
          </>
        )}

        {!empty(relatedPosts) && (
          <>
            <LogoSeparator direction="row" isBig isContainer />

            <RelatedPosts posts={relatedPosts} />
          </>
        )}

        <SubscriptionBanner />
      </ArticleSecondaryContent>

      {isRenderPdf && (
        <PostPrintPage
          {...printPageProps}
          onReady={() => setIsPrintReady(true)}
        />
      )}
    </>
  );
};

export default ArticlePage;
