import { describe, it, expect } from 'vitest';
import { MidnightService } from '../src/services/midnight';

describe('Vaccination Certificate ZK Contract Logic & Circuit Assertions', () => {
  const service = MidnightService.getInstance();

  it('should successfully verify when doses, authority signature, and category policy satisfy requirements', async () => {
    const res = await service.verifyCertificateCircuit({
      patientSecret: 'SECRET_SALT_123',
      privateAuthorityKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      doseCount: 3,
      vaccineCode: 101,
      expirationYear: 2030,
      minDosesRequired: 2,
    });

    expect(res.success).toBe(true);
    expect(res.nullifierHash).toMatch(/^0x[0-9a-f]{64}$/);
    expect(res.provedTimestamp).toBeDefined();
  });

  it('should fail ZK assertion when authority signature key is unauthorized', async () => {
    await expect(
      service.verifyCertificateCircuit({
        patientSecret: 'SECRET_SALT_123',
        privateAuthorityKey: '0x1111111111111111111111111111111111111111111111111111111111111111',
        doseCount: 3,
        vaccineCode: 101,
        expirationYear: 2030,
        minDosesRequired: 2,
      })
    ).rejects.toThrow(/Unauthorized health authority signature key/);
  });

  it('should fail ZK assertion when vaccine category code does not meet active policy', async () => {
    await expect(
      service.verifyCertificateCircuit({
        patientSecret: 'SECRET_SALT_123',
        privateAuthorityKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
        doseCount: 3,
        vaccineCode: 50,
        expirationYear: 2030,
        minDosesRequired: 2,
        activeVaccineCategory: 100,
      })
    ).rejects.toThrow(/Vaccine type does not meet active policy category/);
  });

  it('should fail ZK assertion when dose count is insufficient', async () => {
    await expect(
      service.verifyCertificateCircuit({
        patientSecret: 'SECRET_SALT_123',
        doseCount: 1,
        vaccineCode: 101,
        expirationYear: 2030,
        minDosesRequired: 2,
      })
    ).rejects.toThrow(/Insufficient doses/);
  });

  it('should fail ZK assertion when certificate is expired', async () => {
    await expect(
      service.verifyCertificateCircuit({
        patientSecret: 'SECRET_SALT_123',
        doseCount: 3,
        vaccineCode: 101,
        expirationYear: 2020,
        minDosesRequired: 2,
      })
    ).rejects.toThrow(/expired/);
  });

  it('should fail ZK assertion when vaccine code is invalid', async () => {
    await expect(
      service.verifyCertificateCircuit({
        patientSecret: 'SECRET_SALT_123',
        doseCount: 3,
        vaccineCode: 0,
        expirationYear: 2030,
        minDosesRequired: 2,
      })
    ).rejects.toThrow(/Invalid vaccine code/);
  });

  it('should successfully register revocation and increment revocation_counter', () => {
    const newCount = service.registerRevocation();
    expect(newCount).toBeGreaterThan(0);
  });

  it('should successfully update active vaccine category requirement', () => {
    const updated = service.setVaccineCategory(105);
    expect(updated).toBe(105);

    // Reset back to 100 for default policy
    service.setVaccineCategory(100);
  });
});
