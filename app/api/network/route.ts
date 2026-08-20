import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    network: 'preprod',
    name: 'Midnight Preprod Testnet',
    indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    proofServerUrl: 'http://127.0.0.1:6300',
  });
}
