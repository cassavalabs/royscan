import styled from "styled-components";

export const FullWidth = styled.div`
  width: 100%;
`;

export const Flex = styled.div<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : null)};
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = styled(FlexBetween)`
  justify-content: center;
`;

export const FlexStart = styled(FlexBetween)`
  justify-content: flex-start;
`;

export const FlexColumnStart = styled(FlexStart)`
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexColumnCenter = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexEnd = styled(FlexStart)`
  justify-content: flex-end;
`;
