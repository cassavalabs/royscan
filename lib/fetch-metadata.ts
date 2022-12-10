import axios from "axios";
import { GetTokenMetadata } from "types/helius/GetTokenMetadata";
import { HELIUS_API_KEY, HELIUS_BASE_API } from "./constant";
import { prisma } from "./prisma";

const URL = HELIUS_BASE_API + "/tokens/metadata?api-key=" + HELIUS_API_KEY;

export const fetchMetadata = async (mintAccounts: string[]) => {
  /**
   * First check our local database for NFT creators
   * Dedupe found records from @param mintAccounts
   * Request the rest from Helius API
   */
  const fromDb = await prisma.token.findMany({
    where: {
      mint: { in: mintAccounts },
    },
    select: {
      creators: true,
      mint: true,
    },
  });

  //exclude data fetched from local database and fetch the rest from external service
  const mintsNotInDb = mintAccounts.filter((account) =>
    fromDb.some((x) => x.mint != account)
  );

  const { data: metadata } = await axios.post<GetTokenMetadata[]>(URL, {
    mintAccounts: mintsNotInDb,
  });

  return { fromDb, metadata };
};
