import React from 'react';
import { ShieldCheck, ExternalLink, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">MedVault ZK • Private Vaccination Certificate</div>
            <div className="text-xs text-slate-500">Midnight Network Preprod Testnet Deployment • Compact v0.31.1</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <a
            href="https://indexer.preprod.midnight.network/api/v4/graphql"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
          >
            <Database size={14} />
            Preprod Indexer API
            <ExternalLink size={12} />
          </a>
          <span className="text-slate-700">•</span>
          <span className="font-mono text-slate-500 text-[11px]" title="Deployed Compact Contract Address">
            Contract: 956ba5f6...658c
          </span>
        </div>
      </div>
    </footer>
  );
};
