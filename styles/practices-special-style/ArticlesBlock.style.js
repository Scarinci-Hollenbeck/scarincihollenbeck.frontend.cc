import styled from 'styled-components';
import Link from 'next/link';
import {
  cannabisLawColors,
  globalColor,
  rem,
} from '../global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from '../mediaBreakpoints.style';

export const ArticlesContainer = styled.section`
  padding: 0 5%;
  background-color: ${cannabisLawColors.cannabisColorDarkGray};
`;

export const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;

  > div {
    margin-left: 20px;
    width: 100%;

    ${media_breakpoint_down('md')} {
      margin: 10px;
    }
  }

  .cannabis-law-news {
    width: 32%;
    background-color: ${cannabisLawColors.cannabisColorGray};

    ${media_breakpoint_down('lg')} {
      h2 {
        font-size: 1rem;
      }

      section {
        flex-direction: column;
        gap: 3px;
      }
    }

    ${media_breakpoint_down('md')} {
      width: 100%;
    }

    ${media_breakpoint_exactly_down(633)} {
      .link-wrapper {
        flex-direction: column;
      }

      .news-card-footer {
        display: flex;
      }
    }

    :hover {
      box-shadow: -2px 0 10px rgb(white / 13%);
    }
  }

  ${media_breakpoint_down('md')} {
    flex-direction: column;
  }
`;

export const TitleButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;

  h3 {
    color: ${globalColor.white};
    font-size: ${rem(44)};
    text-transform: uppercase;

    ${media_breakpoint_down('sm')} {
      font-size: 2rem;
    }
  }
`;

export const LinkToCategory = styled(Link)`
  padding: 16px 24px;
  border-radius: 41px;
  background-color: ${cannabisLawColors.cannabisColorDarkGrayLight};
  color: ${globalColor.white};
  transition: background-color 0.8s;

  :hover {
    color: ${globalColor.black};
    background-color: ${cannabisLawColors.cannabisColorGray};
  }

  ${media_breakpoint_down('sm')} {
    padding: 10px 24px;
  }
`;
