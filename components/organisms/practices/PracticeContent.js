import FAQ from 'components/atoms/FAQ';
import CollapseContent from 'components/molecules/practice/CollapseContent';
import React from 'react';
import {
  PracticeContentSection,
  SplitContentDescription,
  SplitContentSidebar,
  SplitContentHolder,
} from 'styles/practices/PracticeContent.style';
import { ContainerDefault } from 'styles/Containers.style';
import GetInTouchSidebar from '../common/GetInTouchSidebar';
import SocialShare from '../library/SocialShare';

const PracticeContent = ({
  data,
  title,
  anchorId,
  anchorIdFaq,
  faqData,
  handlePrint,
}) => (
  <PracticeContentSection
    id={anchorId}
    className="margin-scroll"
    data-testid="practice-content"
  >
    <ContainerDefault>
      <SocialShare
        isPrintBtn
        customClass="social-share"
        handlePrint={handlePrint}
      />
      <SplitContentHolder>
        <SplitContentDescription>
          {data?.map((item) => (
            <CollapseContent
              key={item.id}
              title={item.title}
              content={item.content}
              id={item.id}
            />
          ))}
          <FAQ title={title} anchorId={anchorIdFaq} faqArrContent={faqData} />
        </SplitContentDescription>
        <SplitContentSidebar>
          <GetInTouchSidebar handlePrint={handlePrint} isPrintBtn />
        </SplitContentSidebar>
      </SplitContentHolder>
    </ContainerDefault>
  </PracticeContentSection>
);

export default PracticeContent;
