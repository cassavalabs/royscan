import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { Flex, FlexColumn } from "theme/components";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { SearchDropdown } from "./Dropdown";
import { useDebounce } from "hooks/useDebounce";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useRouter } from "next/router";
import axios from "axios";

const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  max-width: 40rem;
  align-items: center;
  position: relative;
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.4s ease-in-out;
`;

const InputContainer = styled(Container)<{ isOpen?: boolean }>`
  align-items: center;
  padding-right: 1rem;
  border-radius: ${({ isOpen }) => (isOpen ? "1.5rem 1.5rem 0 0" : "1.5rem")};
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.bg200 : "transparent"};
  ::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(91.46deg, #4673fa, #9646fa 100.13%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    border: 1px solid transparent;
    border-radius: inherit;
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  outline: 0rem;
  padding: 0rem;
  border: none;
  margin: 0rem;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text200};
  background-color: transparent;
`;

const Icon = styled(Flex)`
  padding: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text200};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const KeyboardShortCut = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.bg300};
  color: ${({ theme }) => theme.text200};
`;

export const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useOnClickOutside(
    searchRef,
    () => {
      isOpen && setIsOpen(false);
    },
    [inputRef]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    !isOpen && setIsOpen(true);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const escapeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", escapeKeyHandler);

    return () => {
      document.removeEventListener("keydown", escapeKeyHandler);
    };
  }, [isOpen]);

  useEffect(() => {
    setSearchValue("");
  }, [router.pathname]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === "/") {
        event.preventDefault();
        !isOpen && setIsOpen(true);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    const clonedInputRef = inputRef.current;

    if (clonedInputRef !== null) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (clonedInputRef !== null) {
        document.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [handleKeyPress, inputRef]);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/search?search=${debouncedSearchValue}`
      );
      setIsLoading(false);
      setSearchResult(data);
    };

    fetchResult();
  }, [debouncedSearchValue]);

  return (
    <Wrapper>
      <Container>
        <InputContainer isOpen={isOpen}>
          <Icon>
            <BsSearch />
          </Icon>
          <StyledInput
            placeholder="Search collection..."
            onChange={(e) => handleChange(e)}
            ref={inputRef}
            onClick={() => !isOpen && setIsOpen(true)}
            value={searchValue}
          />
          {!isOpen && <KeyboardShortCut>/</KeyboardShortCut>}
        </InputContainer>
      </Container>
      {isOpen && (
        <SearchDropdown
          ref={searchRef}
          collections={searchResult}
          isLoading={isLoading}
        />
      )}
    </Wrapper>
  );
};
