import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const AssessmentQuizPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/academy/certificate/CERT-9981');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/academy/learn/crypto-security-101" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Exit Assessment
        </Link>
        <Badge variant="primary" size="md">FINAL ASSESSMENT • QUESTION 1 OF 10</Badge>
      </div>

      <Card variant="fresnel" className="p-8 space-y-6">
        <div className="space-y-3">
          <h2 className="font-display font-bold text-xl text-white">
            Analyze the following smart contract snippet for reentrancy vulnerabilities:
          </h2>

          <div className="p-4 bg-[#060e20] border border-outline rounded font-mono text-xs text-slate-200 overflow-x-auto cyber-scrollbar">
            <pre>
{`function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient");
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Failed");
    balances[msg.sender] -= amount;
}`}
            </pre>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {[
            { id: 0, text: 'The contract is safe because it verifies the balance before making the transfer with require.' },
            { id: 1, text: 'The contract is vulnerable to reentrancy because the state is deducted after the external call.' },
            { id: 2, text: 'The contract will fail to compile due to a missing visibility specifier.' },
            { id: 3, text: 'The contract is immune because call() forwards a 2300 gas stipend cap.' },
          ].map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`p-4 rounded border transition-all cursor-pointer flex items-center gap-3 font-sans text-xs sm:text-sm ${
                selectedOption === opt.id
                  ? 'bg-primary/15 border-primary text-white shadow-[0_0_15px_rgba(0,218,243,0.25)]'
                  : 'bg-[#060e20] border-outline/70 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px] shrink-0 ${
                  selectedOption === opt.id
                    ? 'border-primary bg-primary text-[#00363d] font-bold'
                    : 'border-slate-500 text-slate-400'
                }`}
              >
                {String.fromCharCode(65 + opt.id)}
              </div>
              <span className="leading-relaxed">{opt.text}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-outline/50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Score Requirement: 80% to graduate</span>
          <Button size="lg" onClick={handleNext} disabled={selectedOption === null} iconRight="arrow_forward">
            Submit & View Certificate
          </Button>
        </div>
      </Card>
    </div>
  );
};
