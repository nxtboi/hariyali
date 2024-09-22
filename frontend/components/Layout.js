// components/Layout.js
import React from "react";
import {
  HeaderContainer,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
} from "@carbon/react";
import Link from "next/link";

function Layout({ children }) {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="HariyaliKart">
            <HeaderName href="/" prefix="">
              HariyaliKart
            </HeaderName>
          </Header>
          <SideNav
            isFixedNav
            expanded={isSideNavExpanded}
            isChildOfHeader={true}
            aria-label="Side navigation"
            onOverlayClick={onClickSideNavExpand}
          >
            <SideNavItems>
              <SideNavLink element={Link} href="/soil-sensor">
                Soil Sensor Data
              </SideNavLink>
              <SideNavLink element={Link} href="/relay-switch">
                Relay Switch
              </SideNavLink>
            </SideNavItems>
          </SideNav>
          <main style={{ padding: "1rem" }}>{children}</main>
        </>
      )}
    />
  );
}

export default Layout;
