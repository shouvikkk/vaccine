import { describe, it, expect } from 'vitest';
import { SERVER_CONFIG } from '../server/config';
import { queryIndexerContractState } from '../server/services/indexer';

describe('Node.js Production Application Server API', () => {
  it('should export correct Preprod server configuration', () => {
    expect(SERVER_CONFIG.network).toBe('preprod');
    expect(SERVER_CONFIG.contractAddress).toBe('956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c');
    expect(SERVER_CONFIG.deploymentTxHash).toBe('4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90');
    expect(SERVER_CONFIG.confirmationBlock).toBe(2176273);
  });

  it('should query live contract state from indexer service', async () => {
    const state = await queryIndexerContractState();
    expect(state.address).toBe('956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c');
    expect(state.blockHeight).toBeDefined();
    expect(typeof state.blockHeight).toBe('number');
  });
});
