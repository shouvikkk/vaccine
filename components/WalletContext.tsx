'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectLaceWallet, disconnectLaceWallet, checkLaceWalletConnection, WalletState } from '../src/services/midnight';

interface WalletContextType {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
  refresh: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  wallet: { providerAvailable: false, isConnected: false, address: null, network: null, balance: null, isConnecting: false, error: null },
  connect: async () => {},
  disconnect: () => {},
  refresh: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    providerAvailable: false,
    isConnected: false,
    address: null,
    network: null,
    balance: null,
    isConnecting: false,
    error: null,
  });

  useEffect(() => {
    checkLaceWalletConnection().then((state) => {
      setWallet(state);
    });
  }, []);

  const connect = async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const state = await connectLaceWallet();
      setWallet(state);
    } catch (err: any) {
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err?.message || 'Failed to connect Lace Wallet',
      }));
    }
  };

  const disconnect = () => {
    const state = disconnectLaceWallet();
    setWallet(state);
  };

  const refresh = async () => {
    const state = await checkLaceWalletConnection();
    setWallet(state);
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, refresh }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
