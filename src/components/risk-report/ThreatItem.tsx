import type { ThreatItemData } from '../../types';

const SEVERITY_STYLES: Record<ThreatItemData['severity'], { border: string; dot: string; shadow: string }> = {
  critical: {
    border: 'border-error',
    dot: 'bg-error',
    shadow: 'shadow-[0_0_8px_#ffb4ab]',
  },
  warning: {
    border: 'border-tertiary-fixed-dim',
    dot: 'bg-tertiary-fixed-dim',
    shadow: 'shadow-[0_0_8px_#ffb1c3]',
  },
};

export default function ThreatItem({ severity, title, description, code }: ThreatItemData) {
  const styles = SEVERITY_STYLES[severity];

  return (
    <div className={`border-l-2 ${styles.border} pl-6 relative`}>
      <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${styles.dot} ${styles.shadow}`} />
      <h4 className="font-data-lg text-data-lg text-on-surface text-lg mb-2">{title}</h4>
      <p className={`font-body-md text-body-md text-outline ${code ? 'mb-4' : ''}`}>{description}</p>
      {code && (
        <div className="bg-surface-dim/80 border border-outline-variant/30 p-4 rounded font-mono text-sm text-error/80 overflow-x-auto">
          <code>
            {code.map((line, i) => (
              <span key={i}>
                {line}
                {i < code.length - 1 && <br />}
              </span>
            ))}
          </code>
        </div>
      )}
    </div>
  );
}
