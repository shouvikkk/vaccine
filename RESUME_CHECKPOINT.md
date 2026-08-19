# RESUME CHECKPOINT — MIDNIGHT PREPROD DEPLOYMENT
# PRIVATE VACCINATION CERTIFICATE

**Date**: 2026-08-20  
**Status**: ?? DEPLOYMENT VERIFIED ON MIDNIGHT PREPROD

---

## 1. VERIFIED ON-CHAIN DEPLOYMENT PARAMETERS

| Parameter | Value | Status |
| :--- | :--- | :--- |
| **Project** | `private-vaccination-certificate` | **PASS** |
| **Active Network** | `preprod` (Midnight Preprod Testnet) | **PASS** |
| **Lace Wallet Integration** | Connected on Preprod (Network ID `0`) | **PASS** |
| **Deployer Address** | `mn_addr_preprod1gj5y769sduty0us0j724dlwhjdn3fklmqf754kpta7hm9r2yqelsp5m2at` | **PASS** |
| **Deployer Seed** | `9bc108daefc13b5875550479e540e6cf4d535459b0c3c842ea7d3e90370c434f` | **PASS** |
| **Total Balance** | 7,000 tNIGHT (`7,000,000,000` base units) | **PASS** |
| **DUST Registration Tx** | `0xc55182d803565ecd842a372a272feca5262ea2adb0c05e8fbfb7096e57dd67a9` | **CONFIRMED** |
| **DUST Registration Block**| `0xacde80c17564cbdec8566facf6a99a638a6c622fde02c220ef706ec3538874ea` | **CONFIRMED** |
| **DUST Walletlet Catch-up**| 100% Complete (`1,444,402` events synced) | **PASS** |
| **Contract Address** | `956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c` | **VERIFIED ON-CHAIN** |
| **Deployment Tx Hash** | `4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90` | **CONFIRMED** |
| **Confirmation Block** | `2,176,273` (`0xe56e0ad3d61e23cdcf22f39e448c04972df9650e571ec7e93f9ed0acc47e2638`) | **CONFIRMED** |

---

## 2. SYSTEM & BUILD STATUS

| Component | Status |
| :--- | :--- |
| **Local Proof Server** | `http://127.0.0.1:6300` (PASS) |
| **Preprod Indexer** | `https://indexer.preprod.midnight.network/api/v4/graphql` (PASS) |
| **Preprod RPC Node** | `https://rpc.preprod.midnight.network` (PASS) |
| **Compact Contract** | Compiled and deployed (`contracts/managed/vaccination-certificate/`) |
| **Unit Tests** | **18/18 PASS** |
| **Production Build** | **PASS** (`tsc --noEmit && vite build` in 3.65s) |

---

## 3. APPLICATION CONFIGURATION

Updated Configuration Files:
- `.midnight-state.json` (Points to `956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c`)
- `.env` (`VITE_CONTRACT_ADDRESS=956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c`)
