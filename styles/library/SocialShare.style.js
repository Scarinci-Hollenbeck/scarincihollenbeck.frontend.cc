import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from '../global_styles/Global.styles';

export const ShareSocialBox = styled.nav`
  --main-socials-color: ${globalColor.blue.darkBlue};
  --socials-svg-size: 24px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: var(--main-socials-color);

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  svg {
    color: currentColor;
    width: var(--socials-svg-size);
    height: var(--socials-svg-size);
    transition: ${globalTransition.default};

    @media (hover: hover) {
      &:hover {
        color: ${globalColor.blue.skyBlue};
      }
    }

    &:active {
      color: ${globalColor.blue.skyBlue};
    }
  }

  .faceBookBtn {
    @media (hover: hover) {
      &:hover {
        color: ${globalColor.socialNetworks.faceBook};
      }
    }

    &:active {
      color: ${globalColor.socialNetworks.faceBook};
    }
  }

  .twitterBtn {
    @media (hover: hover) {
      &:hover {
        color: ${globalColor.socialNetworks.twitter};
      }
    }
    &:active {
      color: ${globalColor.socialNetworks.twitter};
    }
  }

  .linkedIn {
    @media (hover: hover) {
      &:hover {
        color: ${globalColor.socialNetworks.linkedIn};
      }
    }

    &:active {
      color: ${globalColor.socialNetworks.linkedIn};
    }
  }
`;

export const SocialHr = styled.hr`
  color: currentColor;
  margin: 0;
  flex: 1;
  opacity: 1;
`;

export const SocialLabel = styled.span`
  margin: 0;
  color: currentColor;
  font-size: ${rem(16)};
`;
