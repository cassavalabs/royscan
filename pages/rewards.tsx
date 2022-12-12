import { Container, FlexColumn } from "theme/components";
import { Avatar, Button, Empty, Input, message } from "antd";
import { useState } from "react";
import { RewardResponse } from "types/api";
import axios from "axios";
import styled from "styled-components";

const Text = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ShowResult = ({
  name,
  mint,
  symbol,
  buyer,
  seller,
  royaltyPaid,
  signature,
  image,
  price,
  uri,
}: RewardResponse) => {
  return (
    <FlexColumn style={{ marginBottom: "2rem" }}>
      <Avatar src={image} />
      <Text>Name: {name}</Text>
      <Text>Mint Address: {mint}</Text>
      <Text>Symbol: {symbol}</Text>
      <Text>Buyer: {buyer}</Text>
      <Text>Seller: {seller}</Text>
      <Text>Royalty Paid {royaltyPaid} (SOL)</Text>
      <Text>Sold for {price} (SOL)</Text>
      <a target="_blank" rel="noreferrer" href={uri}>
        Metadata
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://solscan.io/tx/${signature}`}
      >
        View Tx
      </a>
      <Text>Sold on Magic Eden</Text>
    </FlexColumn>
  );
};

export default function Rewards() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tried, setTried] = useState<boolean>(false);
  const [mint, setMint] = useState<string>("");
  const [wallet, setWallet] = useState<string>("");
  const [data, setData] = useState<RewardResponse | null>(null);
  const [messageApi, messageContext] = message.useMessage();

  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const handleSearch = async () => {
    if (mint.length < 32 || mint.length > 44) {
      error("You have provided an invalid mint account");
      return;
    }

    if (wallet.length < 32 || wallet.length > 44) {
      error("You have provided an invalid wallet account");
      return;
    }

    setIsLoading(true);

    const res = await axios.get<RewardResponse | null>(
      `/api/token/${mint}/royalty?address=${wallet}`
    );

    setData(res.data);
    setIsLoading(false);
    setTried(true);
  };

  return (
    <Container>
      {messageContext}
      <h1>Rewards</h1>
      <p style={{ marginBottom: "2rem" }}>
        This page demonstrats how external services or dApps can leverage on the
        royscan Api to distribute rewards to holders of a Non-fungible token who
        respected royalty payment.{" "}
      </p>
      <p style={{ marginBottom: "2rem" }}>
        Using this endpoint you can confirm if a particular user paid royalty on
        purchase of a particular token.
      </p>
      {!data && !isLoading && (
        <div style={{ marginBottom: "2rem" }}>
          <Empty />
        </div>
      )}

      {data && !isLoading && <ShowResult {...data} />}

      <label htmlFor="mint_address">Mint Address</label>
      <Input
        placeholder="Mint address"
        style={{ height: "3rem", marginBottom: "1rem" }}
        id="mint_address"
        value={mint}
        onChange={(e) => setMint(e.target.value)}
      />
      <label htmlFor="wallet_address">Wallet address</label>
      <Input
        placeholder="Wallet address"
        style={{ height: "3rem", marginBottom: "1rem" }}
        id="wallet_address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </Button>
    </Container>
  );
}
