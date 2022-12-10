export interface GetAccountNft {
  numberOfPages: 0;
  nfts: Nft[];
}

interface Nft {
  name: string;
  tokenAddress: string;
  collectionAddress: string;
  collectionName: string;
  imageURL: string;
  traits: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
}
