import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CodeSnippet from '@/components/assessment/CodeSnippet';
import InfoCards from '@/components/assessment/InfoCards';
import QuizHeader from '@/components/assessment/QuizHeader';
import QuizOptions from '@/components/assessment/QuizOptions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import type { AssessmentMeta, QuizOption } from '@/types/assessment';

const meta: AssessmentMeta = {
  courseTitle: 'Crypto Security 101',
  phaseLabel: 'Final Assessment Phase',
  timeRemaining: '14:52',
  progressPercent: 80,
};

const options: QuizOption[] = [
  { id: 'a', label: 'A', text: 'Integer overflow in the withdrawal calculation.' },
  { id: 'b', label: 'B', text: 'Reentrancy attack via low-level call before state update.' },
  { id: 'c', label: 'C', text: 'Front-running vulnerability due to public visibility.' },
  { id: 'd', label: 'D', text: 'Incorrect use of msg.sender in a delegated context.' },
];

export const AssessmentQuizPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <QuizHeader meta={meta} onMenuClick={() => undefined} />

      <div className="flex items-center justify-between">
        <Link to="/academy/learn/crypto-security-101" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Exit Assessment
        </Link>
        <Badge variant="primary" size="md">QUESTION 8 OF 10</Badge>
      </div>

      <Card variant="fresnel" className="p-6 md:p-8 space-y-6">
        <div className="space-y-3">
          <h2 className="font-display font-bold text-xl text-white">
            Identify the primary risk factor in the provided smart contract snippet.
          </h2>
          <CodeSnippet
            language="Solidity v0.8.0"
            lines={[
              { text: 'function ', type: 'keyword' },
              { text: 'withdrawBalance', type: 'function' },
              { text: '() public {\n', type: 'plain' },
              { text: '    uint amountToWithdraw = userBalances[msg.sender];\n', type: 'plain' },
              { text: '    // Vulnerable operation below\n', type: 'comment' },
              { text: '    (bool success, ) = msg.sender.', type: 'plain' },
              { text: 'call', type: 'function' },
              { text: '{value: amountToWithdraw}("" );\n', type: 'string' },
              { text: '    require', type: 'error' },
              { text: '(success);\n', type: 'plain' },
              { text: '    userBalances[msg.sender] = ', type: 'plain' },
              { text: '0', type: 'number' },
              { text: ';\n}', type: 'plain' },
            ]}
          />
        </div>

        <QuizOptions options={options} selectedId={selectedId} onSelect={setSelectedId} />

        <div className="pt-4 border-t border-outline/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs font-mono text-slate-400">Score Requirement: 80% to graduate</span>
          <Button
            size="lg"
            onClick={() => navigate('/academy/certificate/CERT-9981')}
            disabled={selectedId === null}
            iconRight="arrow_forward"
          >
            Submit & View Certificate
          </Button>
        </div>
      </Card>

      <InfoCards />
    </div>
  );
};
