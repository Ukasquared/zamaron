import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { SeverityBadge } from '@/components/ui/Badge';
import { SeverityLevel } from '@/types';

export interface CodeAnnotation {
  lineNumber: number;
  severity: SeverityLevel;
  message: string;
  tag?: string;
}

export interface CodeViewerProps {
  filename?: string;
  code: string;
  annotations?: CodeAnnotation[];
  highlightedLines?: number[];
  selectedLine?: number;
  onSelectLine?: (line: number) => void;
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  filename = 'VaultManager.sol',
  code,
  annotations = [],
  highlightedLines = [],
  selectedLine,
  onSelectLine,
  className,
}) => {
  const lines = code.split('\n');

  return (
    <div
      className={cn(
        'bg-[#060e20] border border-primary/20 rounded-md overflow-hidden font-mono text-xs flex flex-col',
        className
      )}
    >
      {/* File Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0b1326] border-b border-outline/60 text-slate-300">
        <div className="flex items-center gap-2">
          <Icon name="code" size={16} className="text-primary" />
          <span className="font-semibold text-slate-200">{filename}</span>
          <span className="text-[10px] text-slate-500">Solidity ^0.8.20</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">{lines.length} lines</span>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="overflow-x-auto overflow-y-auto cyber-scrollbar p-2 max-h-[500px]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((lineText, index) => {
              const lineNum = index + 1;
              const isHighlighted = highlightedLines.includes(lineNum);
              const isSelected = selectedLine === lineNum;
              const lineAnno = annotations.find((a) => a.lineNumber === lineNum);

              return (
                <React.Fragment key={lineNum}>
                  <tr
                    onClick={() => onSelectLine && onSelectLine(lineNum)}
                    className={cn(
                      'transition-colors hover:bg-white/5 cursor-pointer group',
                      isHighlighted && 'bg-error/15 hover:bg-error/20',
                      isSelected && 'bg-primary/20 border-l-2 border-primary'
                    )}
                  >
                    {/* Line number gutter */}
                    <td className="w-12 text-right pr-4 pl-2 py-0.5 select-none text-slate-500 font-mono text-[11px] border-r border-outline/30 group-hover:text-slate-300">
                      {lineNum}
                    </td>

                    {/* Code text */}
                    <td className="pl-4 pr-2 py-0.5 whitespace-pre font-mono text-slate-200 text-[12px]">
                      {lineText || ' '}
                    </td>
                  </tr>

                  {/* Inline Annotation Callout */}
                  {lineAnno && (
                    <tr>
                      <td colSpan={2} className="py-1 px-4">
                        <div className="bg-[#111a30] border-l-4 border-error p-2.5 rounded text-xs flex items-start gap-2.5 shadow-md">
                          <SeverityBadge severity={lineAnno.severity} size="sm" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {lineAnno.tag && (
                                <span className="text-[10px] font-mono text-primary font-bold">
                                  [{lineAnno.tag}]
                                </span>
                              )}
                              <span className="text-white font-medium">{lineAnno.message}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
