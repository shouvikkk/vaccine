import dotenv from 'dotenv';
dotenv.config();

export const SERVER_CONFIG = {
  port: parseInt(process.env.PORT || '3000', 10),
  network: process.env.VITE_NETWORK || 'preprod',
  contractAddress: process.env.VITE_CONTRACT_ADDRESS || '956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c',
  deploymentTxHash: '4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90',
  confirmationBlock: 2176273,
  proofServerUrl: process.env.VITE_PROOF_SERVER_URL || 'http://127.0.0.1:6300',
  indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
  nodeRpcUrl: 'https://rpc.preprod.midnight.network',
};
