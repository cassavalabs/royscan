import { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi";
import { Flex, FlexColumn, FlexStart } from "theme/components";

import { Row } from "./Row";

const Wrapper = styled(FlexColumn)<{ isLoading?: boolean }>`
  width: 100%;
  position: relative;
  border-top: 0.1rem solid ${({ theme }) => theme.bg100};
  opacity: ${({ isLoading }) => (isLoading ? 0.4 : 1)};
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
  collections: any[];
}

export const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  (props, ref) => {
    return (
      <Wrapper isLoading={props.isLoading}>
        <Container ref={ref}>
          <SubTitle title="Search results" icon={<HiOutlineClock />} />
          {props.collections?.map((collection, index) => {
            return (
              <Row
                key={index}
                name={collection.name}
                symbol={collection.symbol}
                image={collection.Token[0].image}
                collectionKey={collection.collectionKey}
                isLoading={props.isLoading}
                items={collection._count.Token}
              />
            );
          })}
        </Container>
      </Wrapper>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";
