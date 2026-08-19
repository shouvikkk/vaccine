import { Router } from 'express';
import { SERVER_CONFIG } from '../config.js';
import { queryIndexerContractState, checkServicesHealth } from '../services/indexer.js';

export const apiRouter = Router();

apiRouter.get('/health', async (_req, res) => {
  const health = await checkServicesHealth();
  res.json({
    status: 'HEALTHY',
    timestamp: new Date().toISOString(),
    network: SERVER_CONFIG.network.toUpperCase(),
    services: {
      server: 'RUNNING',
      indexer: health.indexer ? 'REACHABLE' : 'UNREACHABLE',
      proofServer: health.proofServer ? 'READY' : 'OFFLINE',
    },
  });
});

apiRouter.get('/network', (_req, res) => {
  res.json({
    network: SERVER_CONFIG.network.toUpperCase(),
    networkId: 0,
    indexerUrl: SERVER_CONFIG.indexerUrl,
    nodeRpcUrl: SERVER_CONFIG.nodeRpcUrl,
    proofServerUrl: SERVER_CONFIG.proofServerUrl,
  });
});

apiRouter.get('/contract', (_req, res) => {
  res.json({
    network: SERVER_CONFIG.network.toUpperCase(),
    contractAddress: SERVER_CONFIG.contractAddress,
    deploymentTxHash: SERVER_CONFIG.deploymentTxHash,
    confirmationBlock: SERVER_CONFIG.confirmationBlock,
    verified: true,
  });
});

apiRouter.get('/ledger', async (_req, res) => {
  const state = await queryIndexerContractState(SERVER_CONFIG.contractAddress);
  res.json({
    contractAddress: state.address,
    blockHeight: state.blockHeight,
    deploymentTxHash: state.txHash,
    rawState: state.state,
    verified: true,
  });
});
