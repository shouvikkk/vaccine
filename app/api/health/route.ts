import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'MedVault ZK Application Server',
    network: 'PREPROD',
    contractAddress: '956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c',
  });
}
