import React from 'react';
import { ShieldCheck, PlusCircle, CheckCircle2, Database, Lock, ArrowRight, Cpu, Activity, Wallet, Loader2 } from 'lucide-react';
import { NavTab } from './Header';
import { ContractLedgerState, WalletState } from '../services/midnight';

interface DashboardOverviewProps {
  wallet: WalletState;
  ledger: ContractLedgerState | null;
  onNavigate: (tab: NavTab) => void;
  onConnectWallet: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  wallet,
  ledger,
  onNavigate,
  onConnectWallet,
}) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', gap: '1.5rem' }} id="dashboard-overview-container">
      {/* Hero Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.9) 100%)',
        borderColor: '#bfdbfe',
        padding: '2rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> Confidential Healthcare Credentials
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
              Zero-Knowledge Private Vaccination Passports
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Prove valid vaccination status, minimum dose compliance, and unexpired certification to verifiers without revealing patient identity, personal medical records, or historical doses on the Midnight blockchain.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => onNavigate('verify')} id="hero-verify-btn">
                <CheckCircle2 size={18} />
                Verify Certificate Proof
              </button>
              <button className="btn btn-emerald" onClick={() => onNavigate('issue')} id="hero-issue-btn">
                <PlusCircle size={18} />
                Issue Private Certificate
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('privacy')} id="hero-privacy-btn">
                <Lock size={18} />
                Privacy Architecture
              </button>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            minWidth: '280px',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              System Health & Status
            </div>
            <div style={{ display: 'flex', flexFlow: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={14} /> Network
                </span>
                <span className={`badge ${wallet.isConnected ? 'badge-blue' : 'badge-subtle'}`}>
                  {wallet.isConnected && wallet.network ? wallet.network.toUpperCase() : 'NOT CONNECTED'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={14} /> Proof Server
                </span>
                <span className="badge badge-emerald">
                  <span className="status-dot"></span> Healthy
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wallet size={14} /> Lace Wallet
                </span>
                {wallet.isConnected ? (
                  <span className="badge badge-emerald"><span className="status-dot"></span> Connected</span>
                ) : wallet.isConnecting ? (
                  <span className="badge badge-blue"><Loader2 size={12} className="spin" /> Connecting</span>
                ) : (
                  <button onClick={onConnectWallet} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }} id="dash-connect-wallet-btn">
                    Connect Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--emerald-light)', color: 'var(--emerald)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-value">{ledger?.totalVerifications ?? 0}</div>
            <div className="stat-label">Verified On-Chain Proofs</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>
              {ledger?.authorityHash ? `${ledger.authorityHash.substring(0, 10)}...` : '--'}
            </div>
            <div className="stat-label">Health Authority Hash</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>
            <Wallet size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ fontSize: '1rem' }}>
              {wallet.isConnected ? (wallet.balance ? `${wallet.balance} tNIGHT` : 'Connected (Lace)') : '--'}
            </div>
            <div className="stat-label">Wallet Status</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>
            <Lock size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ fontSize: '0.95rem' }}>100% Zero-Leak</div>
            <div className="stat-label">Witness Data Privacy</div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid-3">
        <div className="card" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-title-icon" style={{ background: 'var(--emerald-light)', color: 'var(--emerald)' }}>
                  <PlusCircle size={20} />
                </div>
                <div>
                  <div className="card-title">Issue Certificate</div>
                  <div className="card-subtitle">Generate private witness record</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Medical providers register private vaccination credentials with secret identity salts for patient wallets.
            </p>
          </div>
          <button className="btn btn-emerald" onClick={() => onNavigate('issue')} style={{ width: '100%' }}>
            Go to Issuance <ArrowRight size={16} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-title-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="card-title">Verify Certificate</div>
                  <div className="card-subtitle">Run Compact ZK Circuits</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Execute zero-knowledge circuit assertions to prove dose compliance and unexpired validity without revealing personal data.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate('verify')} style={{ width: '100%' }}>
            Go to Verification <ArrowRight size={16} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-title-icon" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>
                  <Database size={20} />
                </div>
                <div>
                  <div className="card-title">Public Ledger Vault</div>
                  <div className="card-subtitle">Inspect on-chain state</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              View public contract address, total verified proof counts, and disclosed ZK nullifiers directly from Midnight indexer.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigate('ledger')} style={{ width: '100%' }}>
            Open Ledger Vault <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};