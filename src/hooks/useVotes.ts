import { useState, useCallback } from 'react';

const STORAGE_KEY = 'faroese-election-guesses';
const LOCK_KEY = 'faroese-election-locked';

type VoteMap = Record<string, number>;

function loadVotes(): VoteMap {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveVotes(votes: VoteMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

function loadLocked(): boolean {
  try {
    return localStorage.getItem(LOCK_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useVotes() {
  const [votes, setVotes] = useState<VoteMap>(loadVotes);
  const [locked, setLocked] = useState<boolean>(loadLocked);

  const getVote = useCallback((candidateId: string) => votes[candidateId] ?? 0, [votes]);

  const increment = useCallback((candidateId: string) => {
    if (locked) return;
    setVotes(prev => {
      const next = { ...prev, [candidateId]: (prev[candidateId] ?? 0) + 1 };
      saveVotes(next);
      return next;
    });
  }, [locked]);

  const decrement = useCallback((candidateId: string) => {
    if (locked) return;
    setVotes(prev => {
      const current = prev[candidateId] ?? 0;
      const next = { ...prev, [candidateId]: current - 1 };
      saveVotes(next);
      return next;
    });
  }, [locked]);

  const setVote = useCallback((candidateId: string, value: number) => {
    if (locked) return;
    setVotes(prev => {
      const next = { ...prev, [candidateId]: value };
      saveVotes(next);
      return next;
    });
  }, [locked]);

  const lockIn = useCallback(() => {
    setLocked(true);
    localStorage.setItem(LOCK_KEY, 'true');
  }, []);

  const unlock = useCallback(() => {
    setLocked(false);
    localStorage.removeItem(LOCK_KEY);
  }, []);

  const resetAll = useCallback(() => {
    setVotes({});
    setLocked(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LOCK_KEY);
  }, []);

  const importVotes = useCallback((newVotes: VoteMap) => {
    setVotes(prev => {
      const merged = { ...prev, ...newVotes };
      saveVotes(merged);
      return merged;
    });
  }, []);

  return { getVote, increment, decrement, setVote, resetAll, locked, lockIn, unlock, importVotes };
}
