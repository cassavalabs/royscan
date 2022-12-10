import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

const ConnectButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 0rem solid transparent;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.text300};
  font-size: 2rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

export const AccountDetail = () => {
  return (
    <ConnectButton>
      <BiUserCircle />
    </ConnectButton>
  );
};
