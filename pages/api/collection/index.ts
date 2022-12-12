import { prisma } from "lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { collection_key } = req.query;
  const data = await prisma.sale.groupBy({
    by: ["mint"],
    _sum: {
      royaltyFee: true,
      price: true,
    },
    _count: {
      mint: true,
    },
    where: {
      collectionKey: collection_key as string,
    },
  });

  res.status(200).send(data);
};

export default handler;
