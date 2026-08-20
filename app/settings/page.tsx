'use client';

import React from 'react';
import { Settings, ShieldCheck, Lock, Cpu, Database, Wallet } from 'lucide-react';
import { useWallet } from '../../components/WalletContext';

export default function SettingsPage() {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 border-l-4 border-l-amber-500">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Settings size={24} className="text-amber-400" />
          Wallet, Network & Privacy Settings
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Inspect CIP-30 Lace Wallet configuration, Preprod RPC parameters, and Zero-Knowledge privacy architecture.
        </p>
      </div>

      <div className="glass-card p-6 space-y-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Wallet size={18} className="text-blue-400" /> Lace Wallet Connection
        </h3>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Status:</span>
            <span className={`font-bold ${wallet.isConnected ? 'text-emerald-400' : 'text-slate-400'}`}>
              {wallet.isConnected ? 'CONNECTED' : 'NOT CONNECTED'}
            </span>
          </div>

          {wallet.isConnected && (
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-slate-400">Address:</span>
              <span className="font-mono text-slate-200 truncate max-w-[250px]">{wallet.address}</span>
            </div>
          )}
        </div>

        <div>
          {wallet.isConnected ? (
            <button
              onClick={disconnect}
              className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-semibold text-xs border border-rose-500/30 transition-colors"
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={connect}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Connect Lace Wallet
            </button>
          )}
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Cpu size={18} className="text-teal-400" /> Midnight Network Environment
        </h3>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Active Network:</span>
            <span className="text-emerald-400 font-bold">Midnight Preprod Testnet (preprod)</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-800">
            <span className="text-slate-400">Deployed Contract:</span>
            <span className="text-slate-200">956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-800">
            <span className="text-slate-400">Proof Server:</span>
            <span className="text-slate-200">http://127.0.0.1:6300</span>
          </div>
        </div>
      </div>
    </div>
  );
}
