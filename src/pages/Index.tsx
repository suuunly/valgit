import { useState, useRef, useEffect } from 'react';
import { elections } from '@/data/elections';
import { PartyGroup } from '@/components/PartyGroup';
import { Leaderboard } from '@/components/Leaderboard';
import { useVotes } from '@/hooks/useVotes';
import { Vote, Lock, Unlock, Copy, MoreVertical, Upload, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

function parseImportText(text: string): Record<string, number> {
  const votes: Record<string, number> = {};
  let currentElection: typeof elections[number] | null = null;

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const elMatch = elections.find(el => line.startsWith(el.name));
    if (elMatch) {
      currentElection = elMatch;
      continue;
    }
    if (!currentElection) continue;

    const colonIdx = line.lastIndexOf(':');
    if (colonIdx === -1) continue;
    const value = parseInt(line.slice(colonIdx + 1).trim(), 10);
    if (isNaN(value)) continue;
    const label = line.slice(0, colonIdx).trim();

    const partyPrefix = label.match(/^([A-Ha-h])\s+/);
    if (!partyPrefix) continue;
    const partyLetter = partyPrefix[1].toLowerCase();
    const rest = label.slice(partyPrefix[0].length);

    const listiMatch = rest.match(/^Listi\s+[A-Ha-h]$/i);
    if (listiMatch) {
      votes[`list-${currentElection.id}-${partyLetter}`] = value;
      continue;
    }

    const candidate = currentElection.candidates.find(
      c => c.party === partyLetter && c.name === rest,
    );
    if (candidate) {
      votes[candidate.id] = value;
    }
  }
  return votes;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { getVote, increment, decrement, setVote, resetAll, locked, lockIn, unlock, importVotes } = useVotes();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const election = elections[activeTab];

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const candidatesByParty = election.parties.map(party => ({
    party,
    candidates: election.candidates.filter(c => c.party === party.letter),
  }));

  const exportToClipboard = () => {
    const lines: string[] = [];
    for (const el of elections) {
      lines.push(`${el.name}:`);
      for (const party of el.parties) {
        const listVote = getVote(`list-${el.id}-${party.letter}`);
        lines.push(`${party.letter.toUpperCase()} Listi ${party.letter.toUpperCase()}: ${listVote}`);
      }
      for (const candidate of el.candidates) {
        const v = getVote(candidate.id);
        lines.push(`${candidate.party.toUpperCase()} ${candidate.name}: ${v}`);
      }
      lines.push('');
    }
    navigator.clipboard.writeText(lines.join('\n').trim()).then(() => {
      toast.success('Avritað til clipboard!');
    });
  };

  const handleImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = parseImportText(text);
      const count = Object.keys(parsed).length;
      if (count === 0) {
        toast.error('Onki data funnið á clipboard');
        return;
      }
      if (window.confirm(`Flyta inn ${count} atkvøður frá clipboard?`)) {
        importVotes(parsed);
        toast.success(`${count} atkvøður flutt inn!`);
      }
    } catch {
      toast.error('Fekk ikki atgongd til clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Vote className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base font-bold leading-tight text-foreground" style={{ lineHeight: '1.15' }}>
                  Valagissan 🇫🇴
                </h1>
                <p className="text-[11px] text-muted-foreground">Hvør fær flestu atkvøður?</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (locked) {
                    if (window.confirm('Lata upp? Tú kanst broyta títt svar.')) unlock();
                  } else {
                    if (window.confirm('Læsa svørini? Tú kanst ikki broyta aftaná.')) lockIn();
                  }
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors active:scale-95 ${
                  locked
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
                aria-label={locked ? 'Unlock' : 'Lock'}
              >
                {locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary active:scale-95"
                  aria-label="Menu"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-card py-1 shadow-lg z-50">
                    <button
                      onClick={() => { exportToClipboard(); setMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                      Avrita til clipboard
                    </button>
                    <button
                      onClick={() => { handleImport(); setMenuOpen(false); }}
                      disabled={locked}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      Flyta inn frá clipboard
                    </button>
                    <div className="my-1 border-t border-border" />
                    <button
                      onClick={() => {
                        if (window.confirm('Nullstilla alt?')) resetAll();
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Nullstilla alt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {locked && (
            <div className="mt-2 rounded-lg bg-primary/10 px-3 py-1.5 text-center text-xs font-medium text-primary">
              🔒 Svørini eru læst
            </div>
          )}

          <div className="mt-3 flex gap-1 rounded-xl bg-secondary p-1">
            {elections.map((el, i) => (
              <button
                key={el.id}
                onClick={() => setActiveTab(i)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all active:scale-[0.97] ${
                  activeTab === i
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {el.shortName}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4">
        <div className="mb-4 text-center">
          <p className="text-xs text-muted-foreground">
            {election.name} · {election.date} · {election.candidates.length} valevni
          </p>
          {(() => {
            const partyListTotal = election.parties.reduce((sum, p) => sum + getVote(`list-${election.id}-${p.letter}`), 0);
            const total = election.candidates.reduce((sum, c) => sum + getVote(c.id), 0) + partyListTotal;
            return total !== 0 ? (
              <p className="mt-1 text-sm font-bold tabular-nums text-foreground">
                Tilsamans: {total} atkvøður
              </p>
            ) : null;
          })()}
        </div>

        <Leaderboard election={election} getVote={getVote} />

        <div className="flex flex-col gap-4 mt-4">
          {candidatesByParty.map(({ party, candidates }) => (
            <PartyGroup
              key={party.letter}
              party={party}
              candidates={candidates}
              electionId={election.id}
              getVote={getVote}
              locked={locked}
              onIncrement={increment}
              onDecrement={decrement}
              onSetVote={setVote}
            />
          ))}
        </div>

        <div className="py-8 text-center text-xs text-muted-foreground">
          Góða ferð til Gran Canaria! ✈️🌴
        </div>
      </main>
    </div>
  );
};

export default Index;
