import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    contractAddress: '956ba5f69dbff0301d8ee9798893e6720741b40afe1a096ec4c5241506ce658c',
    deploymentTxHash: '4fd0d4229efe63a68f581cedbae15d99a50e6fc1bfb20c5b0db9dbf0b9b54e90',
    blockHeight: 2176273,
    deployerAddress: 'mn_addr_preprod1gj5y769sduty0us0j724dlwhjdn3fklmqf754kpta7hm9r2yqelsp5m2at',
  });
}
