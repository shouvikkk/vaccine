'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { KeyRound, Lock, Copy, Check, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';
import { getSavedPrivateCertRecords, PrivateCertRecord } from '../../src/services/midnight';

export default function CredentialsPage() {
  const [certs, setCerts] = useState<PrivateCertRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [verifiedIds, setVerifiedIds] = useState<string[]>([]);

  useEffect(() => {
    setCerts(getSavedPrivateCertRecords());
    try {
      const verifiedRaw = localStorage.getItem("medvault_verified_cert_ids");
      if (verifiedRaw) {
        setVerifiedIds(JSON.parse(verifiedRaw));
      }
    } catch (e) {
      console.warn("Could not read verified certificate IDs:", e);
    }
  }, []);

  const handleCopy = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6 border-l-4 border-l-teal-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <KeyRound size={24} className="text-teal-400" />
            Private Credential Vault
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Off-chain patient witness records stored securely in client memory. Copy witness secret keys for ZK verification.
          </p>
        </div>
        <Link
          href="/issue"
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <PlusCircle size={16} />
          Issue New Credential
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((cert) => (
          <div key={cert.id} className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-slate-100">{cert.patientName}</span>
              <div className="flex items-center gap-2">
                {verifiedIds.includes(cert.id) && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-emerald-400" /> Verified
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  {cert.id}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div><strong>Vaccine:</strong> {cert.vaccineName}</div>
              <div><strong>Doses:</strong> {cert.doseCount} Doses Received</div>
              <div><strong>Expiration:</strong> Valid until {cert.expirationYear}</div>
              <div><strong>Authority:</strong> {cert.issuingAuthority}</div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <Lock size={12} className="text-amber-400" />
                <span className="truncate max-w-[150px]">{cert.patientSecret.substring(0, 14)}...</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(cert.patientSecret, cert.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copiedId === cert.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  Copy Salt
                </button>
                <Link
                  href={`/verify?id=${cert.id}`}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                    verifiedIds.includes(cert.id)
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  {verifiedIds.includes(cert.id) ? 'Verify Again' : 'Verify'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
