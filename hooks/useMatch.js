import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { generateRounds } from "../resources/generateRounds";

/** Manages match state, timers, and round transitions */
export default function useMatch({
  members,
  initialRoundIndex = 0,
  matchDuration = 300,
  restDuration = 60,
}) {
  const [rounds, setRounds] = useState(() => generateRounds(members));
  const [currentRoundIndex, setCurrentRoundIndex] = useState(initialRoundIndex);
  const [mode, setMode] = useState('match');
  const [timeLeft, setTimeLeft] = useState(matchDuration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reinitialize rounds when members or duration changes
    setRounds(generateRounds(members));
    setCurrentRoundIndex(0);
    setMode('match');
    setTimeLeft(matchDuration);
    setIsRunning(false);
  }, [members, matchDuration]);

  useEffect(() => {
    // Reset timer when round changes
    if (currentRoundIndex < 0 || currentRoundIndex >= rounds.length) {
      setIsRunning(false);
      return;
    }
    setMode('match');
    setTimeLeft(matchDuration);
  }, [currentRoundIndex, rounds.length, matchDuration]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || timeLeft > 0) return;

    if (mode === 'match') {
      setMode('rest');
      setTimeLeft(restDuration);
    } else if (mode === 'rest') {
      setCurrentRoundIndex((prev) => {
        const next = prev + 1;
        if (next >= rounds.length) {
          setIsRunning(false);
          return prev;
        }
        return next;
      });
    }
  }, [timeLeft, mode, isRunning, restDuration, rounds.length]);

  const start = useCallback(() => {
    if (rounds.length > 0 && currentRoundIndex < rounds.length) {
      setIsRunning(true);
    }
  }, [rounds.length, currentRoundIndex]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetRound = useCallback(() => {
    setMode('match');
    setTimeLeft(matchDuration);
    setIsRunning(false);
  }, [matchDuration]);

  const skipRound = useCallback(() => {
    setCurrentRoundIndex((prev) => (prev + 1) % rounds.length);
    setIsRunning(false);
  }, [rounds.length]);

  const resetAll = useCallback(() => {
    setCurrentRoundIndex(0);
    setMode('match');
    setTimeLeft(matchDuration);
    setIsRunning(false);
  }, [matchDuration]);

  return {
    rounds,
    currentRoundIndex,
    currentRound: currentRoundIndex < rounds.length ? rounds[currentRoundIndex] : null,
    mode,
    timeLeft,
    isRunning,
    start,
    pause,
    skipRound,
    resetRound,
    resetAll,
  };
}
