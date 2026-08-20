import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '../components/WalletContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'MedVault ZK — Private Vaccination Certificate DApp',
  description: 'Confidential zero-knowledge healthcare credentials built on Midnight Network Preprod Testnet.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <WalletProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
