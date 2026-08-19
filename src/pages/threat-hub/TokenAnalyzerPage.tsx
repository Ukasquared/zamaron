import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { TokenRiskChecks } from '@/components/security/TokenRiskChecks';
import { DemoDataNotice } from '@/components/security/DemoDataNotice';
import { useTokenScan } from '@/hooks/useTokenScan';

const DEFAULT_ADDRESS = '0x7a58b924c891e4a10042f9b87a6d88c92b5a1d3e';

export const TokenAnalyzerPage: React.FC = () => {
  const { address, setAddress, result, isScanning, error, runScan } = useTokenScan({
    initialAddress: DEFAULT_ADDRESS,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runScan();
  };

  // Overall posture: derived from pass/warn/fail counts of the checks.
  const posture = result
    ? result.flaggedCount === 0
      ? { label: 'LOW RISK', variant: 'success' as const }
      : result.flaggedCount <= 2
      ? { label: 'MODERATE RISK', variant: 'warning' as const }
      : result.flaggedCount <= 4
      ? { label: 'HIGH RISK', variant: 'high' as const }
      : { label: 'CRITICAL RISK', variant: 'critical' as const }
    : null;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">AUTOMATED TOKEN RISK EVALUATOR</Badge>
            <span className="text-xs font-mono text-slate-400">Honeypot & Blacklist Detector</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Token Risk & Liquidity Analyzer
          </h1>
        </div>
      </div>

      <DemoDataNotice>
        Token checks are simulated from the address by the mock tokenScanService — no bytecode is
        actually analyzed. Do not treat results as a real security verdict.
      </DemoDataNotice>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
        <div className="flex-1">
          <Input
            placeholder="Paste Token Contract Address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            icon="search"
            error={error ?? undefined}
          />
        </div>
        <Button type="submit" size="md" loading={isScanning} icon="radar">
          Scan Token
        </Button>
      </form>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="fresnel" className="p-6 text-center space-y-4">
            <Badge variant={posture?.variant} size="md">
              {posture?.label}
            </Badge>
            <div>
              <div className="text-4xl font-display font-black text-primary">
                {100 - result.flaggedCount * 12}
                <span className="text-lg text-slate-500">/100</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">RIS Posture Index</div>
            </div>
            <div className="p-3 bg-[#060e20] rounded border border-outline/60 text-xs font-mono space-y-1">
              <div className="text-white font-bold">
                {result.tokenName} ({result.ticker})
              </div>
              <div className="text-slate-400">{result.chain}</div>
            </div>
          </Card>

          <div className="md:col-span-2 space-y-4">
            <Card variant="glass" className="p-6 space-y-4">
              <CardHeader className="mb-2">
                <CardTitle>Automated Security Checks</CardTitle>
                <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                  <Icon name="science" size={12} /> DEMO ENGINE
                </span>
              </CardHeader>
              <TokenRiskChecks result={result} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
