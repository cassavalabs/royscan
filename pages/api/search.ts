import { HELIUS_API_KEY } from "lib/constant";
import { prisma } from "lib/prisma";
import { NextApiHandler } from "next";

const MAX_RESULTS = 10;

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;

  const search = query.search as string;

  if (!search) {
    return;
  }

  const data = await prisma.collection.findMany({
    take: MAX_RESULTS,
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      symbol: true,
      collectionKey: true,
      _count: { select: { Token: true } },
      Token: {
        select: {
          name: true,
          image: true,
          mint: true,
          sellerFeeBasisPoints: true,
          sales: {
            select: {
              price: true,
              royaltyFee: true,
              buyer: true,
              seller: true,
              marketplace: true,
              signature: true,
            },
          },
        },
      },
    },
  });

  res.status(200).send(data);
};

export default handler;
