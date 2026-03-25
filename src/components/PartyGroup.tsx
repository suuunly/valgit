import type { Party, Candidate, PartyLetter } from '@/data/elections';
import { CandidateCard } from './CandidateCard';
import { PartyListRow } from './PartyListRow';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PartyGroupProps {
  party: Party;
  candidates: Candidate[];
  electionId: string;
  getVote: (id: string) => number;
  locked: boolean;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onSetVote: (id: string, value: number) => void;
}

const partyBorderClass: Record<PartyLetter, string> = {
  a: 'party-border-a', b: 'party-border-b', c: 'party-border-c',
  d: 'party-border-d', e: 'party-border-e', f: 'party-border-f', h: 'party-border-h',
};

const partyBgClass: Record<PartyLetter, string> = {
  a: 'party-bg-a', b: 'party-bg-b', c: 'party-bg-c',
  d: 'party-bg-d', e: 'party-bg-e', f: 'party-bg-f', h: 'party-bg-h',
};

const partyTextClass: Record<PartyLetter, string> = {
  a: 'party-text-a', b: 'party-text-b', c: 'party-text-c',
  d: 'party-text-d', e: 'party-text-e', f: 'party-text-f', h: 'party-text-h',
};

const partyBadgeClass: Record<PartyLetter, string> = {
  a: 'party-badge-a', b: 'party-badge-b', c: 'party-badge-c',
  d: 'party-badge-d', e: 'party-badge-e', f: 'party-badge-f', h: 'party-badge-h',
};

export function PartyGroup({ party, candidates, electionId, getVote, locked, onIncrement, onDecrement, onSetVote }: PartyGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const partyListId = `list-${electionId}-${party.letter}`;
  const totalVotes = candidates.reduce((sum, c) => sum + getVote(c.id), 0) + getVote(partyListId);

  return (
    <div className={`rounded-2xl border-2 ${partyBorderClass[party.letter]} overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between px-4 py-3 ${partyBgClass[party.letter]} transition-colors active:scale-[0.99]`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white ${partyBadgeClass[party.letter]}`}
          >
            {party.letter.toUpperCase()}
          </span>
          <div className="text-left">
            <p className={`text-sm font-semibold ${partyTextClass[party.letter]}`}>
              {party.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {candidates.length} valevni
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalVotes !== 0 && (
            <span className={`text-sm font-bold tabular-nums ${partyTextClass[party.letter]}`}>
              Σ {totalVotes}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-1 p-2">
          <PartyListRow
            partyLetter={party.letter}
            vote={getVote(partyListId)}
            locked={locked}
            onIncrement={() => onIncrement(partyListId)}
            onDecrement={() => onDecrement(partyListId)}
            onSetVote={(value) => onSetVote(partyListId, value)}
          />
          {candidates.map(candidate => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              vote={getVote(candidate.id)}
              locked={locked}
              onIncrement={() => onIncrement(candidate.id)}
              onDecrement={() => onDecrement(candidate.id)}
              onSetVote={(value) => onSetVote(candidate.id, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
