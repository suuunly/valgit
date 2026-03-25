import type { Candidate, PartyLetter } from '@/data/elections';
import { Minus, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CandidateCardProps {
  candidate: Candidate;
  vote: number;
  locked: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetVote: (value: number) => void;
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0];
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const partyBadgeClass: Record<PartyLetter, string> = {
  a: 'party-badge-a',
  b: 'party-badge-b',
  c: 'party-badge-c',
  d: 'party-badge-d',
  e: 'party-badge-e',
  f: 'party-badge-f',
  h: 'party-badge-h',
};

export function CandidateCard({ candidate, vote, locked, onIncrement, onDecrement, onSetVote }: CandidateCardProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleStartEdit = () => {
    if (locked) return;
    setEditValue(String(vote));
    setEditing(true);
  };

  const handleCommit = () => {
    const parsed = parseInt(editValue, 10);
    if (!isNaN(parsed)) {
      onSetVote(parsed);
    }
    setEditing(false);
  };

  return (
    <div className={`flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-sm transition-shadow hover:shadow-md ${locked ? 'opacity-75' : ''}`}>
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white overflow-hidden ${partyBadgeClass[candidate.party]}`}
      >
        {getInitials(candidate.name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight text-foreground">
          {candidate.name}
        </p>
        <p className="text-xs text-muted-foreground">#{candidate.listNumber}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onDecrement}
          disabled={locked}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all active:scale-95 hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Minus"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        {editing ? (
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={e => {
              if (e.key === 'Enter') handleCommit();
              if (e.key === 'Escape') setEditing(false);
            }}
            className="w-[2.25rem] rounded-md border border-border bg-background text-center text-base font-bold tabular-nums text-foreground outline-none focus:ring-2 focus:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        ) : (
          <button
            onClick={handleStartEdit}
            disabled={locked}
            className={`min-w-[2.25rem] text-center text-base font-bold tabular-nums transition-colors ${
              vote > 0 ? 'text-foreground' : vote < 0 ? 'text-destructive' : 'text-muted-foreground'
            } ${!locked ? 'hover:text-primary cursor-text' : ''}`}
          >
            {vote}
          </button>
        )}

        <button
          onClick={onIncrement}
          disabled={locked}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all active:scale-95 hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Plus"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
