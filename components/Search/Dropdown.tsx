import { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi";
import { Flex, FlexColumn, FlexStart } from "theme/components";

import { Row } from "./Row";

const Wrapper = styled(FlexColumn)`
  width: 100%;
  position: relative;
  border-top: 0.1rem solid ${({ theme }) => theme.bg100};
`;

const Container = styled(FlexColumn)<{ isOpen?: boolean }>`
  width: 100%;
  min-height: 10rem;
  background-color: ${({ theme }) => theme.bg200};
  border-radius: 0 0 1rem 1rem;
  padding-bottom: 1rem;
`;

const HeadingWrapper = styled(FlexStart)`
  width: 100%;
  padding: 1rem;
`;

const HeadingText = styled(Flex)<{ size?: string }>`
  font-size: ${({ size }) => (size ? size : "0.875rem")};
`;

const HeadingIcon = styled(Flex)`
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  margin-right: 0.5rem;
  align-items: center;
`;

const SubTitle = ({ title, icon }: { title: string; icon?: ReactNode }) => {
  return (
    <HeadingWrapper>
      {icon && <HeadingIcon>{icon}</HeadingIcon>}
      <HeadingText>{title}</HeadingText>
    </HeadingWrapper>
  );
};

interface SearchDropdownProps {
  isLoading?: boolean;
}

const RecentSearch = () => {
  return (
    <>
      <SubTitle title="Recent searches" icon={<HiOutlineClock />} />
      <Row />
      <Row />
    </>
  );
};

export const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  (props, ref) => {
    return (
      <Wrapper>
        <Container ref={ref}>
          <RecentSearch />
        </Container>
      </Wrapper>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";
