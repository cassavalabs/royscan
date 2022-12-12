import { prisma } from "lib/prisma";
import { NextApiHandler } from "next";
import { RewardResponse } from "types/api";

const handler: NextApiHandler = async (req, res) => {
  const { mint, address } = req.query;

  const mintAddress = mint as string;
  const buyerWallet = address as string;

  let data: RewardResponse | null = null;

  const result = await prisma.sale.findFirst({
    where: {
      mint: mintAddress,
      buyer: buyerWallet,
      royaltyFee: {
        gt: 0,
      },
    },
    select: {
      price: true,
      royaltyFee: true,
      mint: true,
      buyer: true,
      seller: true,
      signature: true,
      token: {
        select: {
          name: true,
          metaData: true,
          image: true,
        },
      },
      collection: {
        select: {
          symbol: true,
        },
      },
    },
  });

  if (result) {
    data = {
      name: result.token.name,
      mint: result.mint,
      buyer: result.buyer,
      seller: result.seller,
      image: result.token.image,
      uri: result.token.metaData,
      symbol: result.collection.symbol,
      price: result.price as unknown as number,
      royaltyPaid: result.royaltyFee as unknown as number,
      signature: result.signature,
    };
  }

  res.status(200).send(data);
};

export default handler;
