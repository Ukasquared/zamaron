import React from 'react';
import { Icon } from '@/components/ui/Icon';

export const AuthLoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Verifying cryptographic session…',
}) => {
  return (
    <div
      className="min-h-screen bg-[#060e20] text-slate-100 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-testid="auth-loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <Icon name="shield_lock" size={16} />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
