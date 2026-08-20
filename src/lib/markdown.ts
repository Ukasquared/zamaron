function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Lightweight markdown renderer for lesson previews. Input is escaped first. */
export function renderMarkdown(source: string): string {
  const escaped = escapeHtml(source || '');
  const blocks = escaped.split(/\n{2,}/);

  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('```')) {
        const inner = trimmed.replace(/^```[a-zA-Z0-9]*\n?/, '').replace(/```$/, '');
        return `<pre class="bg-[#060e20] border border-outline/60 rounded p-3 overflow-x-auto text-[11px] font-mono text-slate-200"><code>${inner}</code></pre>`;
      }

      if (/^#{1,3}\s/.test(trimmed)) {
        const level = trimmed.match(/^#+/)?.[0].length ?? 1;
        const text = inline(trimmed.replace(/^#{1,3}\s+/, ''));
        const cls =
          level === 1
            ? 'text-2xl font-display font-black text-white'
            : level === 2
              ? 'text-xl font-display font-bold text-white'
              : 'text-lg font-display font-semibold text-white';
        return `<h${level} class="${cls} mt-2 mb-1">${text}</h${level}>`;
      }

      if (trimmed.startsWith('&gt; ')) {
        return `<blockquote class="border-l-2 border-amber-400/60 bg-amber-400/5 px-3 py-2 text-xs italic text-amber-200">${inline(
          trimmed.replace(/^(&gt; )+/gm, '')
        )}</blockquote>`;
      }

      if (/^[-*]\s/m.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((line) => /^[-*]\s/.test(line))
          .map((line) => `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">${items}</ul>`;
      }

      if (/^\d+\.\s/m.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((line) => /^\d+\.\s/.test(line))
          .map((line) => `<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`)
          .join('');
        return `<ol class="list-decimal pl-5 space-y-1 text-sm text-slate-300">${items}</ol>`;
      }

      return `<p class="text-sm text-slate-300 leading-relaxed">${inline(trimmed).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

function inline(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="rounded border border-outline/50 my-2 max-h-56 object-cover" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="text-primary font-mono bg-[#060e20] px-1 py-0.5 rounded text-[11px]">$1</code>');
}
