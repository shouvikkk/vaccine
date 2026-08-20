'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Cpu, Wallet, LayoutDashboard, PlusCircle, CheckCircle2, Database, Lock, LogOut, Loader2, KeyRound, Activity, Settings } from 'lucide-react';
import { useWallet } from './WalletContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { wallet, connect, disconnect } = useWallet();

  const navItems = [
    { label: 'Overview', href: '/', icon: LayoutDashboard },
    { label: 'Dashboard', href: '/dashboard', icon: Cpu },
    { label: 'Issue Record', href: '/issue', icon: PlusCircle },
    { label: 'Verify Proof', href: '/verify', icon: CheckCircle2 },
    { label: 'Private Vault', href: '/credentials', icon: KeyRound },
    { label: 'Ledger Activity', href: '/activity', icon: Activity },
    { label: 'Privacy & Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="glass-header sticky top-0 z-50 px-4 lg:px-8 py-3.5 flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-100 text-base tracking-tight leading-none group-hover:text-blue-400 transition-colors">
              MedVault ZK
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide mt-1">
              Private Vaccination Certificate • Midnight Network
            </div>
          </div>
        </Link>
      </div>

      <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
          <Cpu size={14} className="text-blue-400" />
          <span className="uppercase text-[11px] font-mono tracking-wider">
            {wallet.isConnected && wallet.network ? wallet.network : 'PREPROD TESTNET'}
          </span>
        </div>

        {wallet.isConnected ? (
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2" title={wallet.address || ''}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{wallet.address ? `${wallet.address.substring(0, 8)}...${wallet.address.substring(wallet.address.length - 4)}` : 'Connected'}</span>
            </div>
            <button
              onClick={disconnect}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
              title="Disconnect Lace Wallet"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : wallet.isConnecting ? (
          <button disabled className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/50 text-blue-200 text-xs font-bold opacity-80 cursor-wait">
            <Loader2 size={16} className="animate-spin" />
            Connecting Lace...
          </button>
        ) : (
          <button
            onClick={connect}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Wallet size={16} />
            Connect Lace Wallet
          </button>
        )}
      </div>
    </header>
  );
};
