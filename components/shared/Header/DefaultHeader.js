import React, { useRef, useState } from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import Logo from 'components/organisms/Navbar/Logo';
import { ButtonRed } from 'styles/Buttons.style';
import useResponsiveHeader from 'hooks/useResponsiveHeader';
import { useResize } from 'hooks/useResize';
import {
  HeaderMain,
  HeaderMainButtons,
  HeaderWrapper,
  LogoBox,
} from 'styles/Header.style';
import { SidebarOpener } from 'styles/Sidebar.style';
import Navigation from 'components/organisms/Navbar/Navigation';
import InitGlobalVariables from 'styles/global_styles/InitGlobalVariables';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import HeaderSearch from './HeaderSearch';
import HeaderTopLine from './HeaderTopLine';

const SidebarMenu = dynamic(() => import('./SidebarMenu'));

const DefaultHeader = ({ practices, locations, industries }) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef();
  const { width: viewportWidth, isScreenLg } = useSelector(
    (state) => state.sizes.viewportSize,
  );
  const { headerSize } = useSelector((state) => state.sizes);
  useResize();
  const scrollDirection = useResponsiveHeader(headerRef);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <InitGlobalVariables>
        {`--header-height: ${headerSize?.height}px;`}
      </InitGlobalVariables>
      <HeaderWrapper
        ref={headerRef}
        key="header-wrapper-default"
        className={`light-scrollbar ${
          scrollDirection === 'down' ? 'hide' : ''
        }`}
      >
        <HeaderTopLine
          isOpenSearch={isOpenSearch}
          setIsOpenSearch={setIsOpenSearch}
          viewportWidth={viewportWidth}
        />

        <ContainerDefault>
          <HeaderMain>
            <LogoBox $isHide={isOpenSearch}>
              <Logo />
            </LogoBox>

            <Navigation
              key="header-navigation"
              practices={practices}
              locations={locations}
              industries={industries}
              isScreenLg={isScreenLg}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <HeaderMainButtons $wide={isOpenSearch}>
              <ButtonRed
                href="/contact-us"
                className="contact-header-btn"
                onClick={() => setIsSidebarOpen(false)}
              >
                Contact us
              </ButtonRed>

              <HeaderSearch
                isOpenSearch={isOpenSearch}
                setIsOpenSearch={setIsOpenSearch}
              />

              <SidebarOpener
                aria-label="Sidebar opener"
                $isHide={isOpenSearch}
                onClick={handleToggleSidebar}
                $isSidebarOpen={isSidebarOpen}
              >
                <span className="burger-line" />
              </SidebarOpener>

              <SidebarMenu
                practices={practices}
                locations={locations}
                industries={industries}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </HeaderMainButtons>
          </HeaderMain>
        </ContainerDefault>
      </HeaderWrapper>
    </>
  );
};

export default DefaultHeader;
