import { useState } from 'react';
import { LogoBox } from '../../../styles/Header.style';
import Logo from '../../organisms/Navbar/Logo';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import LinkButtons from '../../organisms/Navbar/LinkButtons';
import MobileMenu from '../../organisms/Navbar/MobileMenu/MobileMenu';
import Navigation from '../../organisms/Navbar/Navigation';
import useIsScroll from '../../../hooks/useIsScroll';
import {
  LinksBoxSpecial,
  SearchBoxContainer,
  SearchOpenBtn,
  SpecialHeaderContainer,
  VisibleHiddenSearch,
} from '../../../styles/practices-special-style/header/SpecialHeader.style';

const CyberSecurityHeader = () => {
  const { scrollTop } = useIsScroll();
  const [isOpenSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = () => {
    setOpenSearch(!isOpenSearch);
  };

  return (
    <>
      <SpecialHeaderContainer
        isChangeOrder={isOpenSearch}
        scrollDown={scrollTop}
        className="cyber-security"
      >
        <LogoBox>
          <Logo />
        </LogoBox>
        <Navigation isHidden={isOpenSearch} />
        <VisibleHiddenSearch isOpenBlock={isOpenSearch}>
          <GlobalSearch onHandleClickSearch={handleOpenSearch} />
        </VisibleHiddenSearch>
        <SearchBoxContainer isOpenSearch={isOpenSearch ? 'true' : ''}>
          <SearchOpenBtn onClick={handleOpenSearch} />
        </SearchBoxContainer>
        <LinksBoxSpecial>
          <LinkButtons variant="special" />
          <MobileMenu />
        </LinksBoxSpecial>
      </SpecialHeaderContainer>
    </>
  );
};

export default CyberSecurityHeader;
