import { AccountDetail } from "components/AccountDetail";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Flex, FlexBetween, FlexEnd, FlexStart } from "theme/components";

const Wrapper = styled(Flex)`
  width: 100%;
  height: 4.5rem;
  padding-top: 1.5rem;
  align-items: center;
`;

const Container = styled(FlexBetween)`
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
`;

const BrandLogo = styled.a`
  position: relative;
  padding-right: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text300};
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  :hover {
    text-decoration: underline;
  }
`;

export const Navbar = ({ isHome }: { isHome?: boolean }) => {
  return (
    <Wrapper>
      <Container>
        <FlexStart>
          {!isHome && (
            <>
              <BrandLogo href="/">
                <Image
                  src="/logo-small.png"
                  width="92"
                  height="30"
                  alt="logo"
                />
              </BrandLogo>
            </>
          )}
        </FlexStart>
        <FlexEnd>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/rewards">Rewards</NavLink>
          <NavLink href="/analytics">Analytics</NavLink>
          <NavLink href="https://github.com/cassavalabs/royscan">
            Api
          </NavLink>
          <NavLink href="https://github.com/cassavalabs/royscan">
            Github
          </NavLink>
          <AccountDetail />
        </FlexEnd>
      </Container>
    </Wrapper>
  );
};
