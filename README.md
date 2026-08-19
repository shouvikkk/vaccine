# Private Vaccination Certificate DApp — Midnight Preprod

A zero-knowledge, privacy-preserving vaccination credential platform built on **Midnight Network** (Midnight Preprod Testnet).

MedVault ZK allows individuals to prove vaccination status, dose requirements, and certificate validity to third-party verifiers with **zero exposure** of personal health data, patient identity, or medical history.

---

## ?? Live Midnight Preprod Deployment

- **Network**: Midnight Preprod Testnet
- **Deployed Contract Address**: `956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c`
- **Deployment Tx Hash**: `4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90`
- **Confirmation Block**: `2,176,273` (`0xe56e0ad3d61e23cdcf22f39e448c04972df9650e571ec7e93f9ed0acc47e2638`)
- **Deployer Address**: `mn_addr_preprod1gj5y769sduty0us0j724dlwhjdn3fklmqf754kpta7hm9r2yqelsp5m2at`

---

## ??? Node.js Production Architecture

The DApp features a production-ready **Node.js + Express + TypeScript** server layer that proxies on-chain queries and serves the application bundle, while maintaining browser-side Lace Wallet CIP-30 authorization.

```
                    USER BROWSER
                         ¦
                         ¦ HTTPS / REST
                         ?
                 NODE.JS APPLICATION SERVER
                 +-------------------------+
                 ¦ Express / TypeScript    ¦
                 ¦ Server & REST APIs      ¦
                 +-------------------------+
                             ¦
             +---------------+---------------+
             ?               ?               ?
        Midnight          GraphQL         ZK Proof
       Preprod RPC        Indexer          Server
             ¦
             ?
      Compact Contract (Address: 956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c)

                     ?
                     ¦ CIP-30 (Browser Only)
             Authentic Lace Wallet
```

### Express REST API Endpoints
- `GET /api/health` — Application server, indexer, and proof server health check.
- `GET /api/network` — Current active Midnight network configuration (`preprod`).
- `GET /api/contract` — Deployed Compact contract address and on-chain confirmation details.
- `GET /api/ledger` — Live contract ledger state query via Preprod Indexer GraphQL API.

---

## ?? Lace Wallet Integration

- **Authentic CIP-30 Connector**: Detects installed Midnight Lace browser extension (`window.midnight.lace`).
- **Preprod Testnet Address**: Displays connected testnet Bech32 wallet address (`mn_addr_preprod...`) and Network ID `0`.
- **Browser-Side Security**: All user transaction signing and CIP-30 authorizations stay strictly browser-side in the Lace Wallet extension.

---

## ?? Application Interface & Workflows

### Overview
![Overview](docs/images/overview.png)
_*The MedVault ZK Overview dashboard presents real-time system health, authentic Midnight Lace Wallet connectivity, and network status on Midnight Preprod. It provides a central command hub showing verified on-chain proof counters, public health authority key hashes, and zero-leak witness privacy guarantees.*_

### Certificate Issue Record
![Certificate Issue Record](docs/images/certificate_issue_record.png)
_*The Certificate Issue Record interface enables healthcare providers to generate private witness credentials locally on-device. Patient identity secrets and dose history are stored strictly within client memory as secret keys, creating a local witness store ready for zero-knowledge proof verification without writing sensitive health records on-chain.*_

### Certificate Verification
![Certificate Verification](docs/images/certificate_verification.png)
_*The Certificate Verification interface evaluates provable Compact smart contract circuit assertions off-chain using the patient's private witness key. Verifiers specify public assertion rules (such as minimum dose requirements), allowing the Compact circuit to prove compliance and submit disclosed nullifier hashes to the Midnight blockchain while keeping medical details completely confidential.*_

---

## ?? Zero-Knowledge Circuit Assertions

The Compact smart contract evaluates three zero-knowledge assertions locally on-device:
1. `private_dose_count >= min_doses_required`: Asserts dose compliance without disclosing actual count.
2. `private_expiration_timestamp >= current_timestamp`: Asserts certificate validity.
3. `private_vaccine_type > 0`: Asserts valid vaccine code.

---

## ?? Quick Start

### Prerequisites
- **Node.js**: v22.0.0 or higher
- **Docker**: For running local proof server (`http://127.0.0.1:6300`)

### Installation & Environment Setup
```bash
git clone https://github.com/shouvikkk/vaccine.git
cd vaccine
npm install
cp .env.example .env
```

### Run Node.js Application Server
```bash
# Start production Node.js application server
npm start

# Or start development mode
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## ?? Testing & Verification

Run the automated Vitest test suite (includes contract, privacy, wallet, and Node.js server API tests):

```bash
npm test
```
**Result**: **20 / 20 PASS**

Build production web bundle:
```bash
npm run build
```

---

## ?? License

This project is licensed under the **MIT License**.
