import {
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { generateRounds } from "../resources/generateRounds";

export default function useMatch({
    members,
    initialRoundIndex = 0,
    matchDuration = 300,
    restDuration = 60,
}) {
    const [rounds, setRounds] = useState (() => generateRounds (members));
    const [currentRoundIndex, setCurrentRoundIndex] = useState (initialRoundIndex);
    const [mode, setMode] = useState ('match');
    const [timeLeft, setTimeLeft] = useState (matchDuration);
    const [isRunning, setIsRunning] = useState (false);
    const intervalRef = useRef (null);
    
    useEffect(() => {
        const allRounds = generateRounds (members);
        setRounds(allRounds);
        setCurrentRoundIndex(0);
        setMode('match');
        setTimeLeft(matchDuration);
        setIsRunning(false);
    }, [members, matchDuration]);

    useEffect(() => {
        if ( currentRoundIndex < 0 || currentRoundIndex >= rounds.length ){
            setIsRunning(false);
            return;
        }
        setMode('match');
        setTimeLeft(matchDuration);
    }, [currentRoundIndex, rounds.length, matchDuration]);

    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return;
        }
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    useEffect(() => {
        if (!isRunning) return;
        if (timeLeft <= 0) {
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
        }
    }, [timeLeft, mode, isRunning, restDuration, rounds.length]);

    const start = useCallback(() => {
        if ( rounds.length > 0 && currentRoundIndex < rounds.length){
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