import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { LogoSeparatorWrapper } from './Separators.style';
import { PracticeAttorneysSection } from './practices/PracticeAttorneys';

export const sectionPadding = `
  padding-block: 40px;

  ${media_breakpoint_down('md')} {
    padding-block: 32px;
  }
`;

export const ArticleContent = styled.section`
  padding: 60px 0;

  ${media_breakpoint_down('xxl')} {
    padding: 40px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 24px 0 40px 0;
  }
`;

export const ArticleContentHolder = styled.div`
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    gap: 32px;
  }
`;

export const ArticleContentSections = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${media_breakpoint_down('md')} {
    gap: 32px;
  }
`;

export const ArticleContentSidebar = styled.div`
  width: 500px;

  ${media_breakpoint_down('xxl')} {
    width: 460px;
  }

  ${media_breakpoint_down('xl')} {
    width: 100%;
  }
`;

export const ArticleSecondaryContent = styled.div`
  display: flex;
  flex-direction: column;

  ${LogoSeparatorWrapper} {
    margin: 0;
  }

  ${PracticeAttorneysSection} {
    ${sectionPadding};
  }

  @media print {
    display: none;
  }
`;
