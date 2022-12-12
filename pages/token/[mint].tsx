import styled from "styled-components";
import { FlexColumn } from "theme/components";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Key } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";

const Container = styled(FlexColumn)`
  width: 100%;
  max-width: 60rem;
  margin-right: auto;
  margin-left: auto;
  padding-top: 4rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text300};
`;

const Description = styled.p`
  line-height: 1.5rem;
`;

interface DataType {
  key: Key;
  buyer: string;
  seller: string;
  price: string;
  royaltyPaid: string;
  signature: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Buyer",
    dataIndex: "buyer",
    render: (text: string) => (
      <Tooltip title={text}>
        {text.substring(0, 4) +
          "..." +
          text.substring(text.length - 4, text.length)}
      </Tooltip>
    ),
  },
  {
    title: "Seller",
    dataIndex: "seller",
    render: (text: string) => (
      <Tooltip title={text}>
        {text.substring(0, 4) +
          "..." +
          text.substring(text.length - 4, text.length)}
      </Tooltip>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price: string) => <b>{parseFloat(price).toFixed(3) + " SOL"}</b>,
  },
  {
    title: "RoyaltyPaid",
    dataIndex: "royaltyPaid",
    render: (royalty: string) => (
      <b>{parseFloat(royalty).toFixed(3) + " SOL"}</b>
    ),
  },
  {
    title: "Transaction",
    dataIndex: "signature",
    render: (signature: string) => (
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://solscan.io/tx/${signature}`}
      >
        View Tx
      </a>
    ),
  },
];

export default function Collection({
  token,
  sales,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dataSource: DataType[] = [];

  for (let i = 0; i < sales.length; i++) {
    dataSource.push({
      key: i,
      buyer: sales[i].buyer,
      seller: sales[i].seller,
      price: sales[i].price.toString(),
      royaltyPaid: sales[i].royaltyFee.toString(),
      signature: sales[i].signature,
    });
  }

  return (
    <Container>
      <Title>{token?.name}</Title>
      <Description>{token?.description}</Description>
      <Table columns={columns} dataSource={dataSource} />
    </Container>
  );
}

interface IProps {
  token: {
    name: string;
    image: string;
    sellerFeeBasisPoints: Prisma.Decimal;
    description: string | null;
    metaData: string;
  } | null;
  sales: {
    buyer: string;
    seller: string;
    price: Prisma.Decimal;
    royaltyFee: Prisma.Decimal;
    signature: string;
  }[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const mint = context.query.mint as string;

  const token = await prisma.token.findFirst({
    where: {
      mint: mint,
    },
    select: {
      name: true,
      image: true,
      description: true,
      metaData: true,
      sellerFeeBasisPoints: true,
    },
  });

  const sales = await prisma.sale.findMany({
    where: {
      mint: mint,
    },
    select: {
      buyer: true,
      seller: true,
      price: true,
      royaltyFee: true,
      signature: true,
    },
  });

  return {
    props: {
      token: JSON.parse(JSON.stringify(token)),
      sales: JSON.parse(JSON.stringify(sales)),
    },
  };
};
