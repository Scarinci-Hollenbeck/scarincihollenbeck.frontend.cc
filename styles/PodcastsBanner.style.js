import styled from 'styled-components';
import { sectionPadding } from './Article.style';
import { StandardBlueButton } from './Buttons.style';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const PodcastsBannerSection = styled.section`
  ${sectionPadding};
`;

export const PodcastsBannerHolder = styled.div`
  margin: 0 auto;
  max-width: 1020px;
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    gap: 20px;
  }
`;

export const PodcastsBannerImage = styled.picture`
  width: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media_breakpoint_down('lg')} {
    align-self: center;
    flex-direction: column;
  }

  ${media_breakpoint_down('sm')} {
    width: 200px;
  }
`;

export const PodcastsBannerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: center;

  ${StandardBlueButton} {
    max-width: 240px;

    ${media_breakpoint_down('lg')} {
      align-self: center;
    }
  }
`;

export const PodcastsBannerDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
  }
`;
