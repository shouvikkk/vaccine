'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, ShieldCheck, Lock, Eye, EyeOff, FileText, Award, Check } from 'lucide-react';
import { savePrivateCertRecord } from '../../src/services/midnight';

export default function IssuePage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState('Alice Smith');
  const [patientSecret, setPatientSecret] = useState('0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
  const [vaccineCode, setVaccineCode] = useState(101);
  const [doseCount, setDoseCount] = useState(2);
  const [expirationYear, setExpirationYear] = useState(2027);
  const [issuingAuthority, setIssuingAuthority] = useState('World Health Organization (WHO)');
  const [showSecret, setShowSecret] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vaccineNames: Record<number, string> = {
      101: 'COVID-19 mRNA Vaccine',
      102: 'COVID-19 Booster Dose',
      201: 'Yellow Fever Vaccine',
      301: 'Influenza Universal Vaccine',
    };

    savePrivateCertRecord({
      patientName,
      patientSecret,
      doseCount,
      vaccineCode,
      expirationYear,
      issuingAuthority,
      vaccineName: vaccineNames[vaccineCode] || 'Vaccine Credential',
    });

    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 border-l-4 border-l-emerald-500">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <PlusCircle size={24} className="text-emerald-400" />
          Issue Vaccination Credential Record
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Healthcare providers issue vaccination credentials locally. Identity secrets and dosage counts remain stored strictly in client private witness memory.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check size={16} />
          Credential record saved successfully to local private witness store!
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText size={14} className="text-blue-400" /> Patient Legal Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
          <div className="text-[11px] text-slate-500">Stored strictly inside private client memory — never written to chain.</div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Lock size={14} className="text-amber-400" /> Private Patient Secret Salt (Witness Key)
          </label>
          <div className="relative">
            <input
              type={showSecret ? 'text' : 'password'}
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-blue-500"
              value={patientSecret}
              onChange={(e) => setPatientSecret(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="text-[11px] text-slate-500">Used as secret input for Compact ZK nullifier calculation.</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Vaccine Type</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={vaccineCode}
              onChange={(e) => setVaccineCode(Number(e.target.value))}
            >
              <option value={101}>101 - COVID-19 mRNA</option>
              <option value={102}>102 - COVID-19 Booster</option>
              <option value={201}>201 - Yellow Fever</option>
              <option value={301}>301 - Influenza Universal</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Total Doses Received</label>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Issuing Health Authority</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              value={issuingAuthority}
              onChange={(e) => setIssuingAuthority(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            Issue Private Certificate Record
          </button>
          <button
            type="button"
            onClick={() => router.push('/credentials')}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition-colors"
          >
            View Vault
          </button>
        </div>
      </form>
    </div>
  );
}
