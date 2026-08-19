# ??? Private Vaccination Certificate DApp (MedVault ZK)

[![CI/CD Pipeline](https://github.com/shouvikkk/vaccine/actions/workflows/ci.yml/badge.svg)](https://github.com/shouvikkk/vaccine/actions/workflows/ci.yml)
[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod-purple)](https://midnight.network)
[![Zero Knowledge](https://img.shields.io/badge/Zero--Knowledge-Compact%20v0.31.1-blue)](https://midnight.network)
[![Node.js Engine](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-green.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ?? Project Overview

**MedVault ZK (Private Vaccination Certificate DApp)** is a production-ready, zero-knowledge healthcare application built on the **Midnight Network** (Preprod Testnet). Using **Compact** smart contracts, zk-SNARK proof generation, a **Node.js + Express** production application server, and authentic **Midnight Lace Wallet** integration, MedVault ZK enables individuals to issue, store, prove, and verify vaccination credentials with **zero exposure** of personal health data, medical histories, or patient identities on-chain.

---

## ?? Project Links & Resources

| Resource | Description | Target / URL |
| :--- | :--- | :--- |
| ?? **Live Repository** | Open-source monorepo codebase | [GitHub Repository](https://github.com/shouvikkk/vaccine.git) |
| ?? **Local Application** | Production Node.js Server & DApp UI | [http://localhost:3000](http://localhost:3000) |
| ?? **Health API** | Node.js Server & Services Health Endpoint | [http://localhost:3000/api/health](http://localhost:3000/api/health) |
| ?? **Smart Contract Explorer** | Midnight Preprod Network Indexer GraphQL | [Preprod Indexer API](https://indexer.preprod.midnight.network/api/v4/graphql) |
| ?? **On-Chain Contract** | Real Deployed Compact Contract Address | `956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c` |

---

## ??? Application Preview & Workflows

### Overview Dashboard
![Overview](docs/images/overview.png)
_*The MedVault ZK Overview dashboard presents real-time system health, authentic Midnight Lace Wallet connectivity, and network status on Midnight Preprod. It provides a central command hub showing verified on-chain proof counters, public health authority key hashes, and zero-leak witness privacy guarantees.*_

---

### Certificate Issue Record
![Certificate Issue Record](docs/images/certificate_issue_record.png)
_*The Certificate Issue Record interface enables healthcare providers to generate private witness credentials locally on-device. Patient identity secrets and dose history are stored strictly within client memory as secret keys, creating a local witness store ready for zero-knowledge proof verification without writing sensitive health records on-chain.*_

---

### Certificate Verification
![Certificate Verification](docs/images/certificate_verification.png)
_*The Certificate Verification interface evaluates provable Compact smart contract circuit assertions off-chain using the patient's private witness key. Verifiers specify public assertion rules (such as minimum dose requirements), allowing the Compact circuit to prove compliance and submit disclosed nullifier hashes to the Midnight blockchain while keeping medical details completely confidential.*_

---

## ? Problem Statement

Traditional health credential verification systems and transparent public blockchains suffer from severe privacy vulnerabilities:

- **Unnecessary Data Exposure**: Verifying compliance (e.g., "received at least 2 doses of COVID-19 vaccine") requires showing complete medical records, legal names, and passport details to third parties.
- **On-Chain Surveillance**: Public blockchains expose permanent, searchable logs linking patient wallet addresses with medical conditions, violating healthcare privacy frameworks like HIPAA and GDPR.
- **Replay & Tracking Risks**: Static credentials allow verifiers to correlate verification events across locations and track individual patient movement.

---

## ?? Solution Overview

**MedVault ZK** eliminates health data exposure by implementing Midnight Network's private-by-default architecture:

1. **Off-Chain Witness Storage**: Patients retain signed vaccination credentials and secret salt keys locally in off-chain client memory.
2. **On-Device Zero-Knowledge Assertions**: The client evaluates Compact circuit logic locally and generates a zk-SNARK proof asserting:
   - `private_dose_count >= min_doses_required`
   - `private_expiration_timestamp >= current_timestamp`
   - `private_vaccine_type > 0`
3. **Disclosed Single-Use Nullifiers**: The contract records a unique SHA-256 nullifier hash on the public ledger to record verification without revealing patient identities or allowing replay.

---

## ?? Key Features

- ?? **Authentic Lace Wallet Integration**: Connects with native CIP-30 Midnight Lace browser extension (`window.midnight.lace`) displaying real Bech32 testnet addresses (`mn_addr_preprod...`).
- ??? **Zero-Knowledge Circuit Prover**: Local zk-SNARK proof generation via Midnight Proof Server (`http://127.0.0.1:6300`).
- ??? **Node.js Application Server**: Production Express + TypeScript backend serving REST endpoints (`/api/health`, `/api/network`, `/api/contract`, `/api/ledger`).
- ?? **Public Ledger Vault**: Directly queries live on-chain contract state and confirmation heights from the Midnight Preprod Indexer.
- ?? **Zero Data Leakage**: Patient name, dose history, and vaccine salt keys stay 100% off-chain.

---

## ?? Privacy Model

| Data Category | Visibility | Storage Location | Notes |
| :--- | :--- | :--- | :--- |
| **Patient Legal Name** | Private | Client Local Memory | Never written on-chain |
| **Secret Witness Key** | Private | Off-Chain Local Store | Salt key for ZK nullifiers |
| **Dose Count & History** | Private | Off-Chain Local Store | Evaluated in ZK circuit |
| **Vaccine Expiration** | Private | Off-Chain Local Store | Validated off-chain |
| **Total Verifications** | **Public** | Midnight Blockchain | Public on-chain ledger counter |
| **Disclosed Nullifiers** | **Public** | Midnight Blockchain | Disclosed single-use SHA-256 hash |
| **Authority Key Hash** | **Public** | Midnight Blockchain | Public health authority commitment |

---

## ?? User Journey

```
   +--------------+     +----------------+     +---------------+     +----------------+     +--------------+
   �  1. Connect  � --? �  2. Issue      � --? �  3. Prove     � --? �  4. Verify     � --? �  5. Ledger   �
   �  Lace Wallet �     �  Credential    �     �  ZK Circuit   �     �  On-Chain Tx   �     �  Vault State �
   +--------------+     +----------------+     +---------------+     +----------------+     +--------------+
```

1. **Connect Lace Wallet**: Authenticate through the official Midnight Lace browser extension on Preprod Testnet.
2. **Issue Credential**: Healthcare providers register private vaccination credentials with secret patient salts locally.
3. **Prove ZK Circuit**: Execute the Compact ZK circuit locally to prove dose compliance and freshness.
4. **Verify On-Chain**: Submit the ZK proof transaction to Midnight Preprod RPC.
5. **Ledger Vault**: Inspect the updated total verifications counter and disclosed nullifier hashes on the public ledger.

---

## ??? Architecture & Technical Data Flow

```
                    USER BROWSER
                         �
                         � HTTPS / REST
                         ?
                 NODE.JS APPLICATION SERVER
                 +-------------------------+
                 � Express / TypeScript    �
                 � Server & REST APIs      �
                 +-------------------------+
                             �
             +---------------+---------------+
             ?               ?               ?
        Midnight          GraphQL         ZK Proof
       Preprod RPC        Indexer          Server
             �
             ?
      Compact Contract (Address: 956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c)

                     ?
                     � CIP-30 (Browser Only)
             Authentic Lace Wallet
```

---

## ??? Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Smart Contract** | **Compact (v0.31.1)** | Domain-specific ZK language for Midnight Network |
| **Runtime Server** | **Node.js (v22) + Express** | Production server hosting REST APIs & application bundle |
| **Frontend UI** | **React + TypeScript + Vite** | High-performance user interface with modular CSS |
| **Wallet Connector** | **Midnight Lace Extension** | CIP-30 standard browser wallet authorization |
| **ZK Prover** | **Midnight Proof Server** | Local Docker container running ZK prover service |
| **Blockchain** | **Midnight Preprod Testnet** | Substrate-based privacy ledger with DUST fee token |
| **Testing** | **Vitest (v3.2)** | Unit & integration test runner (**20/20 PASS**) |

---

## ?? Midnight Preprod Deployment Details

- **Active Network**: Midnight Preprod Testnet (`preprod`)
- **Deployed Contract Address**: `956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c`
- **Deployment Transaction Hash**: `4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90`
- **Confirmation Block Height**: `2,176,273` (`0xe56e0ad3d61e23cdcf22f39e448c04972df9650e571ec7e93f9ed0acc47e2638`)
- **Deployer Wallet Address**: `mn_addr_preprod1gj5y769sduty0us0j724dlwhjdn3fklmqf754kpta7hm9r2yqelsp5m2at`
- **DUST Registration Tx**: `0xc55182d803565ecd842a372a272feca5262ea2adb0c05e8fbfb7096e57dd67a9`

---

## ?? Compact Smart Contract Information

The Compact contract (`contracts/vaccination-certificate.compact`) defines the confidential ledger circuit:

```compact
pragma language_version >= 0.14.0;
import CompactLanguage;

export ledger authority: Bytes<32>;
export ledger total_verifications: Uint<64>;
export ledger last_nullifier: Bytes<32>;

constructor(initial_authority: Bytes<32>) {
  authority = initial_authority;
  total_verifications = 0;
  last_nullifier = pad(32, "");
}

export circuit verifyCertificate(
  private_patient_secret: Bytes<32>,
  private_dose_count: Uint<64>,
  private_vaccine_type: Uint<64>,
  private_expiration_timestamp: Uint<64>,
  min_doses_required: Uint<64>,
  current_timestamp: Uint<64>
): Disclosed<Bytes<32>> {
  assert(private_dose_count >= min_doses_required, "Insufficient doses");
  assert(private_expiration_timestamp >= current_timestamp, "Certificate expired");
  assert(private_vaccine_type > 0, "Invalid vaccine code");

  const nullifier = persistentHash([private_patient_secret, pad(32, "VAC_CERT_V1")]);
  total_verifications += 1;
  last_nullifier = nullifier;

  return disclose(nullifier);
}
```

---

## ?? Repository Structure

```
private-vaccination-certificate/
+-- contracts/
�   +-- vaccination-certificate.compact # Compact ZK smart contract
�   +-- managed/                        # Compiled ZK circuits & proving assets
+-- docs/
�   +-- images/                         # Workflow & dashboard screenshots
�       +-- overview.png
�       +-- certificate_issue_record.png
�       +-- certificate_verification.png
+-- server/                             # Node.js production application server
�   +-- config.ts                       # Server environment & network parameters
�   +-- index.ts                        # Express server entry point
�   +-- routes/
�   �   +-- api.ts                      # REST API endpoints (/api/health, /api/ledger)
�   +-- services/
�       +-- indexer.ts                  # Preprod Indexer GraphQL query service
+-- src/                                # Frontend React application
�   +-- components/                     # Modular React UI components
�   �   +-- DashboardOverview.tsx
�   �   +-- Header.tsx
�   �   +-- IssueCertificateForm.tsx
�   �   +-- LedgerStateCard.tsx
�   �   +-- PrivacyExplainer.tsx
�   �   +-- Toast.tsx
�   �   +-- VerificationForm.tsx
�   +-- services/
�   �   +-- midnight.ts                 # Midnight integration service & Lace connector
�   +-- App.tsx
�   +-- index.css
+-- tests/                              # Vitest test suite
�   +-- contract.test.ts
�   +-- privacy.test.ts
�   +-- server.test.ts
�   +-- wallet.test.ts
+-- .env.example                        # Environment configuration template
+-- package.json                        # Project dependencies & scripts
+-- README.md                           # Documentation
+-- RESUME_CHECKPOINT.md                # Deployment parameters record
+-- vite.config.ts                      # Bundler configuration
```

---

## ?? Local Setup & Installation

### Prerequisites
- **Node.js**: v22.0.0 or higher
- **Docker & Docker Compose**: For local ZK Proof Server

### Installation
```bash
git clone https://github.com/shouvikkk/vaccine.git
cd vaccine
npm install
cp .env.example .env
```

### Start Local Services & Application Server
```bash
# 1. Start local proof server container (port 6300)
docker compose up -d

# 2. Run Node.js production application server (port 3000)
npm start
```
Open `http://localhost:3000` in your browser.

---

## ?? Testing & Verification

Execute the Vitest test suite covering contract logic, privacy models, wallet state, and Node.js server APIs:

```bash
npm test
```
**Result**: **20 / 20 PASS**

Build the production web distribution:
```bash
npm run build
```

---

## ?? Security & Privacy Considerations

- **No Private Keys Exposed**: User private keys, seed phrases, and CIP-30 authorizations stay strictly browser-side in the Lace Wallet extension.
- **Environment Security**: No private seeds or secret credentials exist in `.env.example` or frontend distributions.
- **Zero On-Chain Health Leakage**: Personal medical details are evaluated off-chain inside ZK circuits.

---

## ?? License

This project is licensed under the **MIT License**.
