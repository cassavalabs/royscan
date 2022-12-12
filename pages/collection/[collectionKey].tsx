import styled from "styled-components";
import { FlexColumn } from "theme/components";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Key } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "lib/prisma";
import Link from "next/link";

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
  name: string;
  mint: string;
  image: string;
  //   lastSoldPrice: string;
  //   royaltyReceived: number;
  //   numberOfSales: number;
  //   expectedRoyalty: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (src: string) => <img src={src} alt="img" width={24} height={24} />,
  },
  {
    title: "Mint",
    dataIndex: "mint",
    render: (mint: string) => <Link href={`/token/${mint}`}>{mint}</Link>,
  },
];

export default function Collection({
  data,
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dataSource: DataType[] = [];

  for (let i = 0; i < data.length; i++) {
    dataSource.push({
      key: i,
      ...data[i],
    });
  }

  return (
    <Container>
      <Title>
        {collection?.name} ({collection?.symbol})
      </Title>
      <Description>description...</Description>
      <Table columns={columns} dataSource={dataSource} />
    </Container>
  );
}

interface IProps {
  data: Omit<DataType, "key">[];
  collection: {
    symbol: string | null;
    name: string;
  } | null;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const collectionKey = context.query.collectionKey as string;

  const data = await prisma.token.findMany({
    where: {
      collectionKey: collectionKey,
    },
    select: {
      name: true,
      image: true,
      mint: true,
    },
  });

  const collection = await prisma.collection.findFirst({
    where: {
      collectionKey: collectionKey,
    },
    select: {
      name: true,
      symbol: true,
    },
  });

  return { props: { collection, data } };
};
