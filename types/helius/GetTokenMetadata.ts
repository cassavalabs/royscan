export interface GetTokenMetadata {
  mint: string;
  onChainData: OnChainData;
  offChainData: OffChainData;
}

export interface Creator {
  address: string;
  share: string;
  verified?: boolean;
}

interface Data {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[];
}

interface Collection {
  key: string;
  verified: boolean;
}

type CollectionDetail = { size: number } | null;

interface OnChainData {
  key: string;
  mint: string;
  updateAuthority: string;
  data: Data;
  tokenStandard: string;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  collection: Collection;
  collectionDetails: CollectionDetail;
  uses?: any;
}

interface Attribute {
  traitType: string;
  value: string;
}

interface File {
  uri: string;
  type: string;
}

interface Property {
  category: string;
  files: File[];
  creators: Creator[];
}

interface OffChainData {
  name: string;
  symbol: string;
  attributes: Attribute[];
  sellerFeeBasisPoints: number;
  image: string;
  properties: Property;
}
