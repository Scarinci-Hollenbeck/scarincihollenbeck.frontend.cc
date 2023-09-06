import styled from 'styled-components';
import { cannabisLawColors } from '../../global_styles/Global.styles';
import { media_breakpoint_down, media_breakpoint_exactly_down, media_breakpoint_range_exacly } from '../../mediaBreakpoints.style';

export const PhotoBlockContainer = styled.section`
  display: flex;
  padding: 120px 84px 140px;
  background-color: ${cannabisLawColors.cannabisColorGray};
  align-items: center;
  justify-content: center;

  .photo-article-box {
    display: flex;
    justify-content: center;
    gap: 8%;
  }

  ${media_breakpoint_exactly_down(1478)} {
    .photo-article-box {
      justify-content: center;
      gap: 4%;
      padding-left: 42px;
      padding-right: 42px;
    }
  }

  ${media_breakpoint_down('xl')} {
    .photo-article-box {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  ${media_breakpoint_down('lg')} {
    padding: 0;
    align-items: center;
    .photo-article-box {
      align-items: center;
      flex-direction: column;
      padding-top: 80px;
      padding-bottom: 60px;
    }
  }
`;

export const PhotoCannabisBox = styled.div`
  display: flex;
  gap: 20px;
  height: 680px;
  position: relative;
  margin-bottom: 40px;

  .words-picture {
    position: absolute;
    bottom: -93px;
    right: 19%;
  }

  & > :first-child {
    margin-top: auto;
    margin-bottom: 0;
  }

  & > :last-child {
    align-items: flex-end;
  }

  ${media_breakpoint_range_exacly(992, 1478)} {
    height: 550px;

    figure {
      width: 316px;
      height: 456px;
      padding: 18px;
      gap: 32px;

      > :first-child {
        width: 278px;
      }
    }
  }

  ${media_breakpoint_down('lg')} {
    height: 550px;

    figure {
      width: 316px;
      height: 456px;
      padding: 18px;
      gap: 32px;

      > :first-child {
        width: 278px;
      }
    }
  }

  ${media_breakpoint_exactly_down(816)} {
    .words-picture {
      bottom: -128px;
    }
  }

  ${media_breakpoint_exactly_down(685)} {
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: auto;

    figure {
      width: 96%;
      height: 115vw;

      > :first-child {
        width: 100%;
        height: 100%;
      }
      > :last-child {
        margin-bottom: 20px;
      }
    }

    & > :first-child {
      margin-top: 0;
    }

    & > :nth-child(2) {
      display: none;
    }

    .words-picture {
      position: initial;
      margin-top: -45px;
    }
  }

  ${media_breakpoint_down('sm')} {
    .words-picture {
      margin-top: -34px;
      width: 300px;
      height: 120px;
    }
  }
`;

export const ArticlePhotoContainer = styled.div`
  width: 35%;

  article {
    > :first-child {
      margin-bottom: 22px;
      line-height: 20px;
    }

    .article-common-title {
      margin-bottom: 32px;
    }
  }

  ${media_breakpoint_range_exacly(992, 1478)} {
    .article-common-title {
      font-size: 2rem;
    }
  }

  ${media_breakpoint_down('lg')} {
    margin-top: 100px;
    width: 80%;

    article {
      align-items: center;
      text-align: center;
    }
  }

  ${media_breakpoint_exactly_down(685)} {
    margin-top: auto;
  }

  ${media_breakpoint_down('sm')} {
    justify-content: flex-start;
    width: 100%;

    article {
      align-items: flex-start;
    }

    .article-common-title {
      text-align: start;
      font-size: 1.8rem;
      margin-bottom: 15px;
    }

    p {
      text-align: start;
    }
  }
`;