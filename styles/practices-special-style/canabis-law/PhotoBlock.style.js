import styled from 'styled-components';
import {
  cannabisLawColors,
  globalColor,
  rem,
} from '../../global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
  media_breakpoint_range_exacly,
} from '../../mediaBreakpoints.style';
import { PhotoCardFigure } from 'styles/PhotoCardPolaroid.style';
import { motion } from 'framer-motion';

export const PhotoBlockContainer = styled.section`
  display: flex;
  padding: 120px 84px 140px;
  background-color: ${cannabisLawColors.cannabisColorGray};
  align-items: center;
  justify-content: center;

  .photo-article-box {
    display: flex;
    justify-content: space-between;
    gap: 3%;
  }

  ${media_breakpoint_exactly_down(1478)} {
    .photo-article-box {
      justify-content: center;
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

    .photo-article-box {
      align-items: center;
      flex-direction: column;
      padding-top: 80px;
      padding-bottom: 60px;
    }
  }
`;

export const PhotoCannabisBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 100px);
  gap: ${rem(20)};
  position: relative;

  .prev-arrow,
  .next-arrow {
    display: none;
    position: absolute;
    top: 280px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .prev-arrow {
    left: -44px;
  }

  .next-arrow {
    right: -50px;
  }

  ${PhotoCardFigure} {
    margin: 0;
    height: 100%;
    width: 100%;

    img {
      border: 1px solid rgba(0, 0, 0, 0.38);
      width: 100%;
      height: 100%;
    }

    figcaption {
      font-family: var(--font-licorice), sans-serif;
      font-size: ${rem(52)};
      font-weight: 400;
      color: ${cannabisLawColors.cannabisColorDarkGray};
      line-height: ${rem(52)};
      letter-spacing: ${rem(2.6)};
    }
  }

  .big-image {
    margin: 0 ${rem(30)} ${rem(30)} 0;
    grid-area: 1 / 1 / 6 / 5;
  }

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 100px);

    .big-image {
      margin: 0;
    }
  }

  @media (max-width: 992px) {
    .prev-arrow,
    .next-arrow {
      font-size: 44px;
      color: ${globalColor.white};
      display: block;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
    grid-template-columns: repeat(3, 100px);
    gap: ${rem(8)};
    justify-items: center;

    .prev-arrow,
    .next-arrow {
      top: 193px;
      font-size: 30px;
    }

    .prev-arrow {
      left: -15px;
    }

    .next-arrow {
      right: -20px;
    }

    ${PhotoCardFigure} {
      gap: 36px;
    }

    .big-image {
      margin-bottom: ${rem(16)};
      grid-area: 1 / 1 / 6 / 4;
      width: 300px;
      height: 385px;
    }
  }
`;

export const PhotoCardLink = styled(motion.a)`
  cursor: pointer;

  &:hover {
    ${PhotoCardFigure} {
      figcaption {
        color: #314af5;
      }
    }
  }
`;

export const PhotoClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(100)};
  height: ${rem(100)};
  cursor: pointer;
  filter: grayscale(100%);

  &.active {
    filter: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
