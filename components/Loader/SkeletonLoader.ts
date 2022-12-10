import styled, { keyframes } from "styled-components";

export const skeletonAnimation = keyframes`
 0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const SkeletonBubble = styled.div<{
  width?: string;
  height?: string;
  rounded?: boolean;
}>`
  width: ${({ width }) => (width ? width : "50%")};
  height: ${({ height }) => (height ? height : "1.5rem")};
  border-radius: ${({ rounded }) => (rounded ? "50%" : "0.75rem")};
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.bg300} 25%,
    ${({ theme }) => theme.bg400} 50%,
    ${({ theme }) => theme.bg300} 75%
  );
  background-size: 400%;
  animation: ${skeletonAnimation} 1.5s infinite;
  animation-fill-mode: both;
  will-change: background-position;
`;
