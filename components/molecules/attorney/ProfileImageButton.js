import { ProfileImageButtonStyled } from '../../../styles/attorney-page/ProfileImage.style';

const ProfileImageButton = ({
  isShowVideo = false,
  onButtonClick,
  title,
  icon,
  ...props
}) => (
  <ProfileImageButtonStyled
    $isShowVideo={isShowVideo}
    onClick={onButtonClick}
    {...props}
  >
    <span className="button-label">{title}</span>
    <span className="button-icon">{icon}</span>
  </ProfileImageButtonStyled>
);

export default ProfileImageButton;
