export interface RewardResponse {
  name: string;
  mint: string;
  symbol: string | null;
  uri: string;
  image: string;
  buyer: string;
  seller: string;
  royaltyPaid: number;
  price: number;
  signature: string;
}
