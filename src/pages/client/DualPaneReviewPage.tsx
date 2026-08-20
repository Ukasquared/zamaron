import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, SeverityBadge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { CodeViewer } from '@/components/shared/CodeViewer';
import { useAuth } from '@/context/AuthContext';
import { getAuditFindings, updateFinding } from '@/services/auditService';

export const DualPaneReviewPage: React.FC = () => {
  const { id = 'ZM-8492-NX' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [selectedLine, setSelectedLine] = useState<number>(146);
  const [remediationNote, setRemediationNote] = useState<string | null>(null);

  const sampleSolidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VaultManager {
    mapping(address => uint256) public balances;
    address public owner;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Zero deposit");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /// @notice Vulnerable withdraw function prone to reentrancy
    function withdrawFunds(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // VULNERABLE: External call executed BEFORE internal balance reduction
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        // State update happens after call - allows recursion
        balances[msg.sender] -= amount;
        emit Withdraw(msg.sender, amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`;

  const annotations = [
    {
      lineNumber: 28,
      severity: 'CRITICAL' as const,
      message: 'SWC-107: State variable `balances` updated after external ether transfer.',
      tag: 'REENTRANCY VULNERABILITY',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-4 rounded-md">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <Link to="/client/dashboard" className="text-slate-400 hover:text-white">Console</Link>
          <span>/</span>
          <Link to={`/client/audits/${id}/status`} className="text-slate-400 hover:text-white">{id}</Link>
          <span>/</span>
          <span className="text-primary font-bold">Dual-Pane Code Review</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/client/audits/${id}/triage`}>
            <Button variant="outline" size="sm" icon="bug_report">
              Open Full Triage
            </Button>
          </Link>
          <Link to={`/client/audits/${id}/report`}>
            <Button variant="primary" size="sm" icon="description">
              Final Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Dual Pane Layout (Left: Solidity Code Viewer, Right: Vulnerability Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Code Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Icon name="folder_open" size={16} className="text-primary" />
              contracts/VaultManager.sol
            </span>
            <span className="text-emerald-400 font-bold">Bytecode Verified</span>
          </div>

          <CodeViewer
            filename="VaultManager.sol"
            code={sampleSolidityCode}
            annotations={annotations}
            highlightedLines={[27, 28, 31]}
            selectedLine={selectedLine}
            onSelectLine={(l) => setSelectedLine(l)}
          />
        </div>

        {/* Right Pane: Vulnerability Inspector & Remediation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="fresnel" className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-outline/50 pb-3">
              <div className="flex items-center gap-2">
                <SeverityBadge severity="CRITICAL" size="md" />
                <span className="font-mono text-xs text-slate-400">SWC-107</span>
              </div>
              <Badge variant="critical">CONFIRMED EXPLOIT</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-white">
                Reentrancy in withdrawFunds()
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The state variable <code className="text-primary font-mono font-bold bg-[#060e20] px-1 py-0.5 rounded">balances</code> is deducted <em>after</em> the external low-level <code className="text-primary font-mono font-bold bg-[#060e20] px-1 py-0.5 rounded">call</code> is executed. A malicious contract fallback function can recursively call <code className="text-primary font-mono font-bold bg-[#060e20] px-1 py-0.5 rounded">withdrawFunds()</code> and drain the total ether reserves.
              </p>
            </div>

            {/* Impact Details */}
            <div className="p-3 bg-[#060e20] border border-error/40 rounded space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>CVSS 3.1 Severity Score:</span>
                <span className="text-error font-bold">9.8 (CRITICAL)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Exploit Likelihood:</span>
                <span className="text-orange-400 font-semibold">HIGH (Deterministic)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Max Financial Impact:</span>
                <span className="text-error font-bold">100% of Vault Balance</span>
              </div>
            </div>

            {/* Recommended Fix */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="build" size={16} /> Recommended Remediation
              </span>
              <div className="p-3 bg-[#060e20] border border-emerald-500/40 rounded font-mono text-[11px] text-slate-300 space-y-2 overflow-x-auto cyber-scrollbar">
                <p className="text-emerald-400 font-semibold">// 1. Apply Checks-Effects-Interactions pattern:</p>
                <pre className="text-slate-200">
{`function withdrawFunds(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount, "Insufficient");
    balances[msg.sender] -= amount; // Effect before interaction
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Failed");
}`}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Status:{' '}
                <strong className={remediationNote ? 'text-emerald-400' : 'text-error'}>
                  {remediationNote || 'Awaiting Fix'}
                </strong>
              </span>
              <Button
                size="sm"
                icon="check_circle"
                onClick={() => {
                  try {
                    const rows = getAuditFindings(user, id);
                    const first = rows[0];
                    if (first) {
                      updateFinding(id, first.id, { status: 'RESOLVED', notes: 'Marked remediated from dual-pane review.' }, user);
                    }
                    setRemediationNote('Finding marked remediated and saved to the triage ledger.');
                  } catch (err) {
                    setRemediationNote(err instanceof Error ? err.message : 'Unable to update finding.');
                  }
                }}
              >
                Mark as Remediated
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
