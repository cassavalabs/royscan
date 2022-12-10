import Link from "next/link";
import styled from "styled-components";
import { Flex, FlexColumn } from "theme/components";

const Container = styled(Link)`
  width: 100%;
  padding: 0.5rem 1rem 1rem;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  :hover {
    background-color: ${({ theme }) => theme.bg300};
  }
`;

const Column = styled(FlexColumn)<{ width?: string }>`
  width: ${({ width }) => (width ? width : "fit-content")};
  align-items: center;
`;

const StyledRow = styled(Flex)`
  width: 100%;
  align-items: center;
`;

const AvatarContainer = styled(Flex)`
  margin-right: 1rem;
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Title = styled(Flex)`
  font-weight: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text300};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SubTitle = styled(Title)`
  font-weight: 0.725rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text200};
`;

interface RowProps {
  name: string;
  symbol: string;
  image: string;
  items: number;
  verified: boolean;
}

export const Row = () => {
  return (
    <Container href="/">
      <Column width="60%">
        <StyledRow>
          <AvatarContainer>
            <StyledImage
              src="https://famousfoxes.com/hd/2154.png"
              alt="avatar"
            />
          </AvatarContainer>
          <FlexColumn>
            <Title>CryptoPunks</Title>
            <SubTitle>~10,000 items</SubTitle>
          </FlexColumn>
        </StyledRow>
      </Column>
    </Container>
  );
};
