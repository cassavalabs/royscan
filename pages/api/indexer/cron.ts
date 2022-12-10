import { prisma } from "lib/prisma";
import { NextApiHandler } from "next";
/**
 * This handler fetches and index old transactions
 * @param req
 * @param res
 */
const handler: NextApiHandler = async (req, res) => {
  //get oldest transaction signature from db
  const oldestTx = await prisma.sale.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      signature: true,
    },
  });

  if (oldestTx) {
  }
};
