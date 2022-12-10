import styled, { keyframes } from "styled-components";
import { Flex } from "theme/components";

const Animation = keyframes`
  100% {
    box-shadow: 2em 0em 0 0em, 1.41421356em 1.41421356em 0 -0.4375em, 0em 2em 0 -0.375em, -1.41421356em 1.41421356em 0 -0.3125em, -2em 0em 0 -0.25em, -1.41421356em -1.41421356em 0 -0.1875em, 0em -2em 0 -0.125em, 1.41421356em -1.41421356em 0 -0.0625em;
  }
  87.5% {
    box-shadow: 2em 0em 0 -0.4375em, 1.41421356em 1.41421356em 0 -0.375em, 0em 2em 0 -0.3125em, -1.41421356em 1.41421356em 0 -0.25em, -2em 0em 0 -0.1875em, -1.41421356em -1.41421356em 0 -0.125em, 0em -2em 0 -0.0625em, 1.41421356em -1.41421356em 0 0em;
  }
  75% {
    box-shadow: 2em 0em 0 -0.375em, 1.41421356em 1.41421356em 0 -0.3125em, 0em 2em 0 -0.25em, -1.41421356em 1.41421356em 0 -0.1875em, -2em 0em 0 -0.125em, -1.41421356em -1.41421356em 0 -0.0625em, 0em -2em 0 0em, 1.41421356em -1.41421356em 0 -0.4375em;
  }
  62.5% {
    box-shadow: 2em 0em 0 -0.3125em, 1.41421356em 1.41421356em 0 -0.25em, 0em 2em 0 -0.1875em, -1.41421356em 1.41421356em 0 -0.125em, -2em 0em 0 -0.0625em, -1.41421356em -1.41421356em 0 0em, 0em -2em 0 -0.4375em, 1.41421356em -1.41421356em 0 -0.375em;
  }
  50% {
    box-shadow: 2em 0em 0 -0.25em, 1.41421356em 1.41421356em 0 -0.1875em, 0em 2em 0 -0.125em, -1.41421356em 1.41421356em 0 -0.0625em, -2em 0em 0 0em, -1.41421356em -1.41421356em 0 -0.4375em, 0em -2em 0 -0.375em, 1.41421356em -1.41421356em 0 -0.3125em;
  }
  37.5% {
    box-shadow: 2em 0em 0 -0.1875em, 1.41421356em 1.41421356em 0 -0.125em, 0em 2em 0 -0.0625em, -1.41421356em 1.41421356em 0 0em, -2em 0em 0 -0.4375em, -1.41421356em -1.41421356em 0 -0.375em, 0em -2em 0 -0.3125em, 1.41421356em -1.41421356em 0 -0.25em;
  }
  25% {
    box-shadow: 2em 0em 0 -0.125em, 1.41421356em 1.41421356em 0 -0.0625em, 0em 2em 0 0em, -1.41421356em 1.41421356em 0 -0.4375em, -2em 0em 0 -0.375em, -1.41421356em -1.41421356em 0 -0.3125em, 0em -2em 0 -0.25em, 1.41421356em -1.41421356em 0 -0.1875em;
  }
  12.5% {
    box-shadow: 2em 0em 0 -0.0625em, 1.41421356em 1.41421356em 0 0em, 0em 2em 0 -0.4375em, -1.41421356em 1.41421356em 0 -0.375em, -2em 0em 0 -0.3125em, -1.41421356em -1.41421356em 0 -0.25em, 0em -2em 0 -0.1875em, 1.41421356em -1.41421356em 0 -0.125em;
  }
  0% {
    box-shadow: 2em 0em 0 0em, 1.41421356em 1.41421356em 0 -0.4375em, 0em 2em 0 -0.375em, -1.41421356em 1.41421356em 0 -0.3125em, -2em 0em 0 -0.25em, -1.41421356em -1.41421356em 0 -0.1875em, 0em -2em 0 -0.125em, 1.41421356em -1.41421356em 0 -0.0625em;
  }
`;

const Container = styled(Flex)<{ size?: number }>`
  font-size: ${({ size }) => (size ? size + "em" : "1em")};
  align-items: center;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  transform: scale(0.25);
  box-shadow: 2em 0em 0 0em, 1.41421356em 1.41421356em 0 -0.4375em,
    0em 2em 0 -0.375em, -1.41421356em 1.41421356em 0 -0.3125em,
    -2em 0em 0 -0.25em, -1.41421356em -1.41421356em 0 -0.1875em,
    0em -2em 0 -0.125em, 1.41421356em -1.41421356em 0 -0.0625em;
  opacity: 1;
  transition: all 0.5s linear 0s;
  animation: 1.5s linear 0.5s normal infinite forwards ${Animation};
`;

export const SpinLoader = ({ size }: { size?: number }) => {
  return <Container size={size} />;
};
