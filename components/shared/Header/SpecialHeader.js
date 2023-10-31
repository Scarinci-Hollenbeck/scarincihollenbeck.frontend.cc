import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSlugFromUrl } from 'utils/helpers';
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

const headerType = (pageSlug) => {
  const pagesMap = {
    'entertainment-and-media': 'entAndMedia',
  };

  return pagesMap[pageSlug] || '';
};

const SpecialHeader = () => {
  const { scrollTop } = useIsScroll();
  const [isOpenSearch, setOpenSearch] = useState(false);
  const { pathname } = useRouter();
  const slug = getSlugFromUrl(pathname);

  const handleOpenSearch = () => {
    setOpenSearch(!isOpenSearch);
  };

  return (
    <>
      <SpecialHeaderContainer
        isChangeOrder={isOpenSearch}
        scrollDown={scrollTop}
        headerType={headerType(slug)}
      >
        <LogoBox>
          <Logo whiteVariant />
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

export default SpecialHeader;
