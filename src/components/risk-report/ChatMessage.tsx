import type { ChatMessageData } from '../../types';

export default function ChatMessage({ sender, senderLabel, paragraphs }: ChatMessageData) {
  const isUser = sender === 'user';

  return (
    <div className={`flex flex-col gap-2 max-w-[90%] ${isUser ? 'self-end items-end' : ''}`}>
      <span className={`font-label-sm text-label-sm text-outline ${isUser ? 'mr-4' : 'ml-4'}`}>
        {senderLabel}
      </span>
      <div
        className={
          isUser
            ? 'bg-primary/10 border border-primary/30 p-4 rounded-2xl rounded-tr-sm text-body-md text-primary shadow-[0_0_15px_rgba(0,240,255,0.05)]'
            : 'bg-surface-container-high/80 border border-outline-variant/50 p-4 rounded-2xl rounded-tl-sm text-body-md text-on-surface'
        }
      >
        {paragraphs.map((runs, pIndex) => (
          <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
            {runs.map((run, rIndex) =>
              run.bold ? <strong key={rIndex}>{run.text}</strong> : <span key={rIndex}>{run.text}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
