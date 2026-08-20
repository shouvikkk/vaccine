import Link from 'next/link';
import { ShieldCheck, Lock, Eye, CheckCircle2, Cpu, ArrowRight, ShieldAlert, FileText, Database, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-14 text-center">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
          <Sparkles size={14} />
          <span>Midnight Preprod Testnet Live</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Private Vaccination Credentials Powered by <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Zero-Knowledge Proofs</span>
        </h1>

        <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Issue, prove, and verify health credentials with absolute mathematical privacy. Prove compliance with health authority regulations without exposing patient names, medical histories, or dosage details on-chain.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/issue"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            Issue Credential Record
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/verify"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            Explore Verification
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock size={22} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Zero On-Chain Data Exposure</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Patient legal names, dosage history, and secret salt keys remain stored 100% in client local memory as private witness data.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={22} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Compact ZK Assertions</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Executes provable assertions (dose count &gt;= minimum required, unexpired certificate) off-chain using the patient's private witness key.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Database size={22} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Single-Use Nullifiers</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Discloses a unique SHA-256 nullifier hash on Midnight Preprod to record proof verification without exposing patient identities or allowing replay.
          </p>
        </div>
      </section>
    </div>
  );
}
