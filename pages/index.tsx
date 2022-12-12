import { Search } from "components/Search";
import Image from "next/image";
import styled from "styled-components";
import { Flex, FlexColumn } from "theme/components";

const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg100};
`;

const Container = styled(Wrapper)`
  padding-top: 5%;
  align-items: center;
`;

const BrandLogo = styled.a`
  position: relative;
`;

const SearchContainer = styled(Flex)`
  width: 100%;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
`;

export default function HomeView() {
  return (
    <Wrapper>
      {/* <Navbar isHome={true} /> */}
      <Container>
        <BrandLogo href="/">
          <Image src="/logo-large.png" width="272" height="92" alt="logo" />
        </BrandLogo>
        <SearchContainer>
          <Search />
        </SearchContainer>
      </Container>
    </Wrapper>
  );
}
