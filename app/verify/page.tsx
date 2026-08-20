'use client';

import React, { useState } from 'react';
import { useWallet } from '../../components/WalletContext';
import { CheckCircle2, ShieldCheck, Lock, Cpu, Loader2, AlertCircle, FileCheck2, Hash, Clock, Copy, Check, ShieldAlert } from 'lucide-react';
import { executeProofVerification } from '../../src/services/midnight';

export default function VerifyPage() {
  const { wallet } = useWallet();
  const [patientSecret, setPatientSecret] = useState('0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        setSelectedCertId(id);
        const { getSavedPrivateCertRecords } = require('../../src/services/midnight');
        const savedCerts = getSavedPrivateCertRecords();
        const cert = savedCerts.find((c: any) => c.id === id);
        if (cert) {
          setPatientSecret(cert.patientSecret);
          setDoseCount(cert.doseCount);
          setVaccineCode(cert.vaccineCode);
          setExpirationYear(cert.expirationYear);
        }
      }
    }
  }, []);
  const [privateAuthorityKey, setPrivateAuthorityKey] = useState('0x0000000000000000000000000000000000000000000000000000000000000000');
  const [doseCount, setDoseCount] = useState(2);
  const [vaccineCode, setVaccineCode] = useState(101);
  const [expirationYear, setExpirationYear] = useState(2027);
  const [minDosesRequired, setMinDosesRequired] = useState(2);

  const [isLoading, setIsLoading] = useState(false);
  const [proofStep, setProofStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [copiedNullifier, setCopiedNullifier] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    setProofStep(1);

    try {
      setTimeout(() => setProofStep(2), 600);
      setTimeout(() => setProofStep(3), 1200);

      const res = await executeProofVerification({
        patientSecret,
        privateAuthorityKey,
        doseCount,
        vaccineCode,
        expirationYear,
        minDosesRequired,
      });

      setProofStep(4);
      setResult(res);
      if (selectedCertId) {
        try {
          const verifiedRaw = localStorage.getItem("medvault_verified_cert_ids");
          const verifiedList = verifiedRaw ? JSON.parse(verifiedRaw) : [];
          if (!verifiedList.includes(selectedCertId)) {
            verifiedList.push(selectedCertId);
            localStorage.setItem("medvault_verified_cert_ids", JSON.stringify(verifiedList));
          }
        } catch (e) {
          console.warn("Could not save verified certificate ID:", e);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Compact ZK Circuit assertion failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNullifier(true);
    setTimeout(() => setCopiedNullifier(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 border-l-4 border-l-blue-500">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 size={24} className="text-blue-400" />
          Zero-Knowledge Verification Workflow
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Execute Compact circuit assertions locally using patient witness keys. Verifiers test policy rules while health details stay 100% private off-chain.
        </p>
      </div>

      <form onSubmit={handleVerify} className="glass-card p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Lock size={14} className="text-amber-400" /> Private Patient Witness Key (Secret Salt)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-blue-500"
            value={patientSecret}
            onChange={(e) => setPatientSecret(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Doses Received</label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={doseCount}
              onChange={(e) => setDoseCount(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Vaccine Code</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={vaccineCode}
              onChange={(e) => setVaccineCode(Number(e.target.value))}
            >
              <option value={101}>101 - COVID-19 mRNA</option>
              <option value={102}>102 - COVID Booster</option>
              <option value={201}>201 - Yellow Fever</option>
              <option value={301}>301 - Influenza</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Expiration Year</label>
            <input
              type="number"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={expirationYear}
              onChange={(e) => setExpirationYear(Number(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Verifier Public Rule */}
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-2">
          <div className="text-xs font-bold text-blue-400">Verifier Public Policy Rule</div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Required Minimum Doses (Public Rule)</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={minDosesRequired}
              onChange={(e) => setMinDosesRequired(Number(e.target.value))}
              required
            />
            <div className="text-[11px] text-slate-500">
              Circuit evaluates <code>assert(private_dose_count &gt;= min_doses_required)</code> without revealing dosage count!
            </div>
          </div>
        </div>

        {/* Stepper Progress */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">ZK Proof Stepper</span>
              <span className="text-blue-400">Step {proofStep}/4</span>
            </div>
            <div className="flex gap-1.5 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`flex-1 transition-all ${proofStep >= 1 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
              <div className={`flex-1 transition-all ${proofStep >= 2 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
              <div className={`flex-1 transition-all ${proofStep >= 3 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
              <div className={`flex-1 transition-all ${proofStep >= 4 ? 'bg-emerald-400' : 'bg-transparent'}`}></div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !wallet.isConnected}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Executing Compact ZK Circuit...
            </>
          ) : (
            <>
              <FileCheck2 size={18} />
              Generate ZK Proof & Verify
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs space-y-1">
          <div className="font-bold flex items-center gap-2">
            <AlertCircle size={16} /> Circuit Assertion Failed
          </div>
          <div>{error}</div>
        </div>
      )}

      {result && (
        <div className="p-5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
            <CheckCircle2 size={20} />
            Zero-Knowledge Verification Successful!
          </div>
          <p className="text-xs text-emerald-200">
            The Compact circuit asserted dose compliance (dose count &gt;= {minDosesRequired}, unexpired) with <strong>zero medical data exposed</strong>!
          </p>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-emerald-500/30 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5"><Hash size={14} /> Disclosed Nullifier Hash</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">{result.nullifierHash}</span>
                <button onClick={() => handleCopy(result.nullifierHash)} className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300">
                  {copiedNullifier ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
            </div>
            {result.txId && (
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5"><FileCheck2 size={14} /> Tx ID</span>
                <span className="text-slate-200">{result.txId}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5"><Clock size={14} /> Proved At</span>
              <span className="text-slate-300">{result.provedTimestamp}</span>
            </div>
          </div>
        </div>
      )}

      {!wallet.isConnected && (
        <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <ShieldAlert size={20} className="text-amber-400 shrink-0" />
          <div>Connect your Lace Wallet to sign ZK proof transactions to Midnight Preprod Testnet.</div>
        </div>
      )}
    </div>
  );
}
