import { useState } from 'react';
import type { Election, PartyLetter } from '@/data/elections';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';

const partyBadgeClass: Record<PartyLetter, string> = {
  a: 'bg-[#4cb05a]', b: 'bg-[#0c6889]', c: 'bg-[#a73033]',
  d: 'bg-[#ce579b]', e: 'bg-[#1d5062]', f: 'bg-[#f59c00]', h: 'bg-[#007cc2]',
};

interface LeaderboardProps {
  election: Election;
  getVote: (id: string) => number;
}

export function Leaderboard({ election, getVote }: LeaderboardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showCount, setShowCount] = useState(10);

  const allCandidates = election.candidates.map(c => ({
    ...c,
    votes: getVote(c.id),
    electionShort: election.shortName,
    partyObj: election.parties.find(p => p.letter === c.party)!,
  }));

  const ranked = allCandidates
    .filter(c => c.votes > 0)
    .sort((a, b) => b.votes - a.votes);

  if (ranked.length === 0) return null;

  const visible = ranked.slice(0, showCount);
  const hasMore = ranked.length > showCount;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-secondary/50 active:scale-[0.99]"
      >
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold text-foreground">Stigatavla</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {ranked.length}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border">
          {visible.map((c, i) => (
            <div
              key={c.id}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-border/50 last:border-0"
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                i === 0 ? 'bg-amber-100 text-amber-700' :
                i === 1 ? 'bg-gray-100 text-gray-600' :
                i === 2 ? 'bg-orange-100 text-orange-700' :
                'bg-secondary text-muted-foreground'
              }`}>
                {i + 1}
              </span>

              <div className={`h-2 w-2 shrink-0 rounded-full ${partyBadgeClass[c.party]}`} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {c.partyObj.name} · {c.electionShort}
                </p>
              </div>

              <span className="text-sm font-bold tabular-nums text-foreground">
                {c.votes}
              </span>
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => setShowCount(s => s + 10)}
              className="w-full py-2 text-xs font-medium text-primary hover:bg-secondary/50 transition-colors active:scale-[0.98]"
            >
              Vís fleiri ({ranked.length - showCount} eftir)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
