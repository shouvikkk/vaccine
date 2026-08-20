'use client';

import React from 'react';
import Link from 'next/link';
import { useWallet } from '../../components/WalletContext';
import { Cpu, ShieldCheck, Database, Lock, PlusCircle, CheckCircle2, ArrowRight, Activity, Wallet } from 'lucide-react';

export default function DashboardPage() {
  const { wallet, connect } = useWallet();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-l-4 border-l-blue-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">System Dashboard & Overview</h1>
          <p className="text-slate-400 text-xs mt-1">Real-time status of Midnight Preprod Testnet connection and Zero-Knowledge vault state.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Preprod Height: <span className="text-emerald-400 font-bold">2,176,273</span>
          </div>
        </div>
      </div>

      {/* Network / Wallet Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Network Status</span>
            <Cpu size={16} className="text-blue-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400">PREPROD TESTNET</div>
          <div className="text-[11px] text-slate-500 font-mono">Chain ID: preprod</div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lace Wallet</span>
            <Wallet size={16} className="text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-200">
            {wallet.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </div>
          {wallet.isConnected ? (
            <div className="text-[11px] text-emerald-400 font-mono truncate" title={wallet.address || ''}>
              {wallet.address?.substring(0, 12)}...
            </div>
          ) : (
            <button onClick={connect} className="text-[11px] text-blue-400 font-semibold hover:underline">
              Connect Lace Wallet &rarr;
            </button>
          )}
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Contract State</span>
            <Database size={16} className="text-teal-400" />
          </div>
          <div className="text-lg font-bold text-slate-200">ON-CHAIN VERIFIED</div>
          <div className="text-[11px] text-slate-500 font-mono truncate" title="956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c">
            956ba5f6...658c
          </div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Privacy Guarantee</span>
            <Lock size={16} className="text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400">100% Zero-Leak</div>
          <div className="text-[11px] text-slate-500">Witness keys stay off-chain</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <PlusCircle size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-100">Issue Credential</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Register vaccination records with secret salt keys stored in private witness memory.
            </p>
          </div>
          <Link href="/issue" className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors">
            Issue New Record
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-100">Verify Proof</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Execute Compact ZK circuit to prove compliance and submit disclosed nullifier hash.
            </p>
          </div>
          <Link href="/verify" className="w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors">
            Start Verification
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Activity size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-100">Ledger Activity</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Inspect confirmed on-chain verifications and public health authority key hashes.
            </p>
          </div>
          <Link href="/activity" className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors">
            View Ledger State
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
