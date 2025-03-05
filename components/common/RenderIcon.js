import React from 'react';
import empty from 'is-empty';
import { BASE_API_URL } from 'utils/constants';
import {
  RenderSelectedIcon,
  RenderUploadedImage,
} from 'styles/RenderIcon.style';
import { getIcon } from 'utils/getIcon';

const RenderIcon = ({
  image = null,
  icon = 'Attorneys',
  sizes = 28,
  mobileSizes = 24,
}) => {
  const proxyImage = image && image.replace(BASE_API_URL, '/proxy-image');
  return !empty(proxyImage) ? (
    <RenderUploadedImage
      $sizes={sizes}
      $mobileSizes={mobileSizes}
      image={proxyImage}
      className="hovered-icon"
    />
  ) : (
    <RenderSelectedIcon
      $sizes={sizes}
      $mobileSizes={mobileSizes}
      className="hovered-icon"
    >
      {getIcon(icon)}
    </RenderSelectedIcon>
  );
};

export default RenderIcon;
