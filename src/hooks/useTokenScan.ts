import { useCallback, useState } from 'react';
import { scanToken, type TokenScanResult } from '@/services/tokenScanService';

interface UseTokenScanOptions {
  initialAddress?: string;
}

/**
 * Drives the token-risk scan UI. Mock analysis is synchronous but the hook
 * exposes an `isScanning` flag so a real async API call can be dropped in
 * later without changing component code.
 */
export function useTokenScan({ initialAddress = '' }: UseTokenScanOptions = {}) {
  const [address, setAddress] = useState(initialAddress);
  const [result, setResult] = useState<TokenScanResult | null>(
    initialAddress ? scanToken(initialAddress) : null
  );
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runScan = useCallback((value?: string) => {
    const target = (value ?? address).trim();
    if (!target) {
      setError('Enter a contract address to scan.');
      setResult(null);
      return;
    }
    if (!/^0x[a-fA-F0-9]{6,}$/.test(target) && !target.includes('...') && target.length < 8) {
      setError('Enter a valid contract address.');
      return;
    }

    setError(null);
    setIsScanning(true);

    // Simulated latency; replace with an awaited real service call.
    window.setTimeout(() => {
      try {
        setResult(scanToken(target));
      } catch {
        setError('Scan failed. Please try again.');
      } finally {
        setIsScanning(false);
      }
    }, 600);
  }, [address]);

  return { address, setAddress, result, isScanning, error, runScan };
}
