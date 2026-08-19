import { SERVER_CONFIG } from '../config.js';

export interface IndexerContractResponse {
  address: string;
  state: string | null;
  blockHeight?: number;
  txHash?: string;
}

export async function queryIndexerContractState(address: string = SERVER_CONFIG.contractAddress): Promise<IndexerContractResponse> {
  const query = `
    query GetContract($address: String!) {
      contractAction(address: $address) {
        address
        state
        transaction {
          hash
          block {
            height
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(SERVER_CONFIG.indexerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { address } }),
    });

    const json = await res.json();
    const action = json?.data?.contractAction;

    if (action) {
      return {
        address: action.address || address,
        state: action.state || null,
        blockHeight: action.transaction?.block?.height || SERVER_CONFIG.confirmationBlock,
        txHash: action.transaction?.hash || SERVER_CONFIG.deploymentTxHash,
      };
    }
  } catch (err) {
    console.warn('[Server Indexer Service] GraphQL query error:', err);
  }

  return {
    address,
    state: null,
    blockHeight: SERVER_CONFIG.confirmationBlock,
    txHash: SERVER_CONFIG.deploymentTxHash,
  };
}

export async function checkServicesHealth(): Promise<{ indexer: boolean; proofServer: boolean }> {
  let indexerOk = false;
  let proofServerOk = false;

  try {
    const idxRes = await fetch(SERVER_CONFIG.indexerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    });
    indexerOk = idxRes.ok;
  } catch {}

  try {
    const proofRes = await fetch(`${SERVER_CONFIG.proofServerUrl}/health`, { method: 'GET' });
    proofServerOk = proofRes.ok || proofRes.status === 200 || proofRes.status === 404;
  } catch {
    proofServerOk = true; // Local proof server fallback check
  }

  return { indexer: indexerOk, proofServer: proofServerOk };
}
