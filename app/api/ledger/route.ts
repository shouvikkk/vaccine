import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      contractAddress: '956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c',
      totalVerifications: 142,
      authorityHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      lastNullifier: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      activeVaccineCategory: 100,
      revocationCounter: 0,
      blockHeight: 2176273,
    },
  });
}
