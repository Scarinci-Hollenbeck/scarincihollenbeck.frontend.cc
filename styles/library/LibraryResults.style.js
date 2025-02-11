import styled from 'styled-components';
import { sectionPadding } from 'styles/Article.style';
import { SelectInput, SelectWrapper } from 'styles/CustomSelect.style';
import { globalColor, rem } from 'styles/global_styles/Global.styles';

export const LibraryResultsSection = styled.section`
  ${sectionPadding};

  .separator-big {
    margin-bottom: 0;
  }

  .pagination {
    margin: 0;
  }
`;

export const LibraryResultsHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const LibraryResultsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LibraryResultsLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  ${SelectWrapper} {
    max-width: 100px;
  }

  ${SelectInput} {
    padding: 9px 11px;
  }
`;

export const LibraryResultsPostsCount = styled.span`
  color: ${globalColor.gray.gray700};
  font-size: ${rem(16)};
  line-height: 1.5;
`;
