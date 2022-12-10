export interface Transaction {
  description: string;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  nativeTransfers: NativeTransfer[];
  tokenTransfers: TokenTransfer[];
  accountData: AccountData[];
  events: TransactionEvents;
}

interface NativeTransfer {
  fromUserAccount: string;
  toUserAccount: string;
  amount: number;
}

interface TokenTransfer {
  fromUserAccount: string;
  toUserAccount: string;
  fromTokenAccount: string;
  toTokenAccount: string;
  tokenAmount: number;
  mint: string;
}

interface RawTokenAmount {
  tokenAmount: string;
  decimals: number;
}

interface TokenBalanceChange {
  userAccount: string;
  tokenAccount: string;
  mint: string;
  rawTokenAmount: RawTokenAmount;
}

interface AccountData {
  account: string;
  nativeBalanceChange: number;
  tokenBalanceChanges: TokenBalanceChange[];
}

interface NftEvents {
  description: string;
  type: string;
  source: string;
  amount: number;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  saleType: string;
  buyer: string;
  seller: string;
  staker: string;
  nfts: NftEvent[];
}

type NftEvent = {
  mint: string;
  tokenStandard: string;
};

interface NativeInput {
  account: string;
  amount: string;
}

interface TokenInput {
  userAccount: string;
  tokenAccount: string;
  mint: string;
  rawTokenAmount: RawTokenAmount;
}

interface TokenSwap {
  fromUserAccount: string;
  toUserAccount: string;
  fromTokenAccount: string;
  toTokenAccount: string;
  tokenAmount: number;
  mint: string;
}

interface NativeFee {
  fromUserAccount: string;
  toUserAccount: string;
  amount: number;
}

interface ProgramInfo {
  source: string;
  account: string;
  programName: string;
  instructionName: string;
}

interface InnerSwap {
  tokenInputs: TokenSwap[];
  tokenOutputs: TokenSwap[];
  tokenFees: TokenSwap[];
  nativeFees: NativeFee[];
  programInfo: ProgramInfo;
}

interface SwapEvents {
  nativeInput: NativeInput;
  nativeOutput: NativeInput;
  tokenInputs: TokenInput[];
  tokenOutputs: TokenInput[];
  tokenFees: TokenInput[];
  nativeFees: NativeFee[];
  innerSwaps: InnerSwap[];
}

interface TransactionEvents {
  nft: NftEvents;
  swap: SwapEvents;
}
