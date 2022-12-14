import { NextApiHandler } from "next";
import { Transaction } from "types/helius/Transaction";
import { prisma } from "lib/prisma";
import { GetTokenMetadata } from "types/helius/GetTokenMetadata";
import axios from "axios";
import { HELIUS_API_KEY, HELIUS_BASE_API } from "lib/constant";

const handler: NextApiHandler = async (req, res) => {
  const payloads: Transaction[] = req.body;
  const mintAccounts: string[] = [];

  /* Get mint accounts in the payload
   * Using for loops appears to be faster than map
   */
  for (let i = 0; i < payloads.length; i++) {
    const payload = payloads[i];
    const mints = payload.events.nft.nfts.map((x) => x.mint);
    mintAccounts.push(...mints);
  }

  //Fetch mint metadata(s)
  const URL = HELIUS_BASE_API + "/tokens/metadata?api-key=" + HELIUS_API_KEY;
  const { data: metadata } = await axios.post<GetTokenMetadata[]>(URL, {
    mintAccounts,
  });

  /**
   * Build data to store in database
   */
  for (let i = 0; i < payloads.length; i++) {
    const payload = payloads[i];
    const events = payload.events;

    const tokenMetadata = metadata.find((meta) =>
      events.nft.nfts.some((x) => x.mint === meta.mint)
    );

    if (tokenMetadata) {
      let paidRoyalty = 0;

      const creators = tokenMetadata.onChainData.data.creators.map(
        (x) => x.address
      );

      //calculate royalties paid
      payload.nativeTransfers
        .filter((tx) =>
          creators.some((creator) => creator === tx.toUserAccount)
        )
        .map((royalty) => {
          paidRoyalty = paidRoyalty + royalty.amount;
        });

      const sellerFeePercent =
        tokenMetadata.onChainData.data.sellerFeeBasisPoints / 100;
      const price = events.nft.amount / 1e9;
      const collectionName =
        tokenMetadata.offChainData?.name.split("#")[0].trimEnd() ?? "";
      const collectionSymbol = tokenMetadata.offChainData?.symbol ?? "";

      const collectionKey =
        tokenMetadata.onChainData.collection?.key ??
        tokenMetadata.onChainData.updateAuthority + "_" + collectionSymbol;

      const store = await prisma.sale.create({
        data: {
          price: price,
          protocolFee: 0,
          buyer: events.nft?.buyer ?? "",
          seller: events.nft?.seller ?? "",
          royaltyFee: paidRoyalty / 1e9,
          marketplace: events.nft?.source ?? "",
          date: new Date(events.nft.timestamp),
          signature: events.nft?.signature ?? "",
          token: {
            connectOrCreate: {
              create: {
                mint: tokenMetadata.mint,
                name: tokenMetadata.offChainData?.name ?? "",
                image: tokenMetadata.offChainData?.image ?? "",
                metaData: tokenMetadata.onChainData.data?.uri ?? "",
                sellerFeeBasisPoints: sellerFeePercent,
                creators: JSON.stringify(
                  tokenMetadata.onChainData.data?.creators
                ),
                collection: {
                  connectOrCreate: {
                    create: {
                      collectionKey: collectionKey,
                      name: collectionName,
                      symbol: collectionSymbol,
                    },
                    where: {
                      collectionKey: collectionKey,
                    },
                  },
                },
              },
              where: {
                mint: tokenMetadata.mint,
              },
            },
          },
          collection: {
            connectOrCreate: {
              create: {
                collectionKey: collectionKey,
                name: collectionName,
                symbol: collectionSymbol,
              },
              where: {
                collectionKey: collectionKey,
              },
            },
          },
        },
      });

      console.log("Store succeded");

      if (!store) {
        //log why it failed and retry later
      }
    }
  }

  res.status(200).send("ok");
};

export default handler;
