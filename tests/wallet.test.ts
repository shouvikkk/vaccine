import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MidnightService } from '../src/services/midnight';

describe('Authentic Midnight Lace Wallet Integration', () => {
  let service: MidnightService;

  beforeEach(() => {
    service = MidnightService.getInstance();
    service.disconnectWallet();
    delete (globalThis as any).window;
    (globalThis as any).window = {};
  });

  afterEach(() => {
    service.disconnectWallet();
    vi.restoreAllMocks();
  });

  it('1. should detect Lace unavailable when provider is not on window', () => {
    (globalThis as any).window = {};
    expect(service.isLaceAvailable()).toBe(false);
    expect(service.getLaceProvider()).toBeNull();
  });

  it('2. should detect Lace available when window.midnight.mnLace exists', () => {
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn(),
      isEnabled: vi.fn(),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    expect(service.isLaceAvailable()).toBe(true);
    expect(service.getLaceProvider()).toBe(mockProvider);
  });

  it('3. should detect Lace available when window.cardano.lace exists', () => {
    const mockProvider = {
      name: 'Lace',
      enable: vi.fn(),
      isEnabled: vi.fn(),
    };
    (globalThis as any).window = {
      cardano: {
        lace: mockProvider,
      },
    };

    expect(service.isLaceAvailable()).toBe(true);
    expect(service.getLaceProvider()).toBe(mockProvider);
  });

  it('4. should successfully connect when Lace enable resolves with genuine address and network', async () => {
    const genuineAddress = 'mn_addr_preprod1genuine_test_user_wallet_address_verified';
    const mockConnector = {
      state: vi.fn().mockResolvedValue({
        unshieldedAddresses: [genuineAddress],
        networkId: 'preprod',
        balance: '500 tNIGHT',
      }),
    };
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockResolvedValue(mockConnector),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    const state = await service.connectLaceWallet();
    expect(state.isConnected).toBe(true);
    expect(state.address).toBe(genuineAddress);
    expect(state.network).toBe('PREPROD');
    expect(state.providerAvailable).toBe(true);
    expect(state.error).toBeNull();
  });

  it('5. should handle connection rejection and remain disconnected', async () => {
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockRejectedValue(new Error('User declined connection request')),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    await expect(service.connectLaceWallet()).rejects.toThrow(/Wallet Connection Rejected/);
    const walletState = service.getWalletState();
    expect(walletState.isConnected).toBe(false);
    expect(walletState.address).toBeNull();
  });

  it('6. should succeed when address is returned via getAddress() or getUsedAddresses() method', async () => {
    const genuineAddress = 'addr_test1genuine_cip30_lace_address';
    const mockConnector = {
      getUsedAddresses: vi.fn().mockResolvedValue([genuineAddress]),
      getNetworkId: vi.fn().mockResolvedValue(0),
    };
    const mockProvider = {
      name: 'Lace',
      enable: vi.fn().mockResolvedValue(mockConnector),
    };
    (globalThis as any).window = {
      cardano: {
        lace: mockProvider,
      },
    };

    const state = await service.connectLaceWallet();
    expect(state.isConnected).toBe(true);
    expect(state.address).toBe(genuineAddress);
    expect(state.network).toBe('PREPROD');
  });

  it('7. should fail and remain disconnected if address retrieval returns empty/missing address', async () => {
    const mockConnector = {
      state: vi.fn().mockResolvedValue({
        unshieldedAddresses: [],
        shieldedAddresses: [],
      }),
    };
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockResolvedValue(mockConnector),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    await expect(service.connectLaceWallet()).rejects.toThrow(/Unable to retrieve genuine wallet address/);
    const walletState = service.getWalletState();
    expect(walletState.isConnected).toBe(false);
    expect(walletState.address).toBeNull();
  });

  it('8. should extract network from connector state and format to uppercase', async () => {
    const mockConnector = {
      state: vi.fn().mockResolvedValue({
        address: 'mn_addr_preprod1address',
        networkId: 'preprod',
      }),
    };
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockResolvedValue(mockConnector),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    const state = await service.connectLaceWallet();
    expect(state.network).toBe('PREPROD');
  });

  it('9. should properly clear state on disconnect', async () => {
    const mockConnector = {
      state: vi.fn().mockResolvedValue({
        address: 'mn_addr_preprod1address_to_disconnect',
        networkId: 'preprod',
      }),
    };
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockResolvedValue(mockConnector),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    await service.connectLaceWallet();
    expect(service.getWalletState().isConnected).toBe(true);

    const disconnectedState = service.disconnectWallet();
    expect(disconnectedState.isConnected).toBe(false);
    expect(disconnectedState.address).toBeNull();
    expect(disconnectedState.network).toBeNull();
    expect(disconnectedState.balance).toBeNull();
    expect(service.getWalletState().isConnected).toBe(false);
  });

  it('10. should retrieve fresh genuine address on reconnect', async () => {
    let callCount = 0;
    const mockConnector1 = {
      state: vi.fn().mockResolvedValue({
        address: 'mn_addr_preprod1first_connection_address',
        networkId: 'preprod',
      }),
    };
    const mockConnector2 = {
      state: vi.fn().mockResolvedValue({
        address: 'mn_addr_preprod1second_reconnected_address',
        networkId: 'preprod',
      }),
    };
    const mockProvider = {
      name: 'Midnight Lace',
      enable: vi.fn().mockImplementation(() => {
        callCount++;
        return Promise.resolve(callCount === 1 ? mockConnector1 : mockConnector2);
      }),
    };
    (globalThis as any).window = {
      midnight: {
        mnLace: mockProvider,
      },
    };

    const state1 = await service.connectLaceWallet();
    expect(state1.address).toBe('mn_addr_preprod1first_connection_address');

    service.disconnectWallet();

    const state2 = await service.connectLaceWallet();
    expect(state2.address).toBe('mn_addr_preprod1second_reconnected_address');
  });

  it('11. should NEVER return hardcoded or fallback addresses when Lace is missing', async () => {
    (globalThis as any).window = {};

    await expect(service.connectLaceWallet()).rejects.toThrow(/Lace Wallet Not Detected/);
    const state = service.getWalletState();
    expect(state.isConnected).toBe(false);
    expect(state.address).toBeNull();
    expect(state.address).not.toBe('mn_addr_preprod1lace_connected_user_wallet_address');
  });

  it('12. should NEVER set isConnected=true if provider enable fails or is absent', async () => {
    (globalThis as any).window = {
      midnight: {
        mnLace: {
          enable: vi.fn().mockRejectedValue(new Error('Connection error')),
        },
      },
    };

    await expect(service.connectLaceWallet()).rejects.toThrow();
    expect(service.getWalletState().isConnected).toBe(false);
  });
});