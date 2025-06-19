import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  loadData,
  saveData,
  clearData,
} from './resources/storage';
import { StatusBar } from 'expo-status-bar';
import SetupScreen from './components/SetupScreen';
import MatchScreen from './components/MatchScreen';
import useMatch from './hooks/useMatch';
import useAudioBell from './hooks/useAudioBell';
import MatMatchLogo from './assets/MatMatchLogo.png';

export default function App() {
  // Persistent state setup
  const [members, setMembers] = useState([]);
  const [initialRoundIndex, setInitialRoundIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Inputs state setup
  const [newName, setNewName] = useState('');
  const [matchMinutes, setMatchMinutes] = useState('5');
  const [restMinutes, setRestMinutes] = useState('1');
  const [hasStarted, setHasStarted] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    (async () => {
      const { members: savedMembers = [], currentPairIndex = 0 } = await loadData();
      setMembers(savedMembers);
      setInitialRoundIndex(currentPairIndex);
      setLoading(false);
    })();
  }, []);

  // Persist data when members or index changes
  useEffect(() => {
    if (!loading) {
      saveData({ members, currentPairIndex: initialRoundIndex });
    }
  }, [members, initialRoundIndex, loading]);

  const matchSec = Math.max(1, parseInt(matchMinutes, 10) || 0) * 60;
  const restSec  = Math.max(0, parseInt(restMinutes, 10) || 0) * 60;

  const {
    rounds,
    currentRoundIndex,
    currentRound,
    mode,
    timeLeft,
    isRunning,
    start,
    pause,
    skipRound,
    resetRound,
  } = useMatch({
    members,
    initialRoundIndex,
    matchDuration: matchSec,
    restDuration: restSec,
  });

  const playBell = useAudioBell();

  useEffect(() => {
    if (!isRunning && mode === 'match') return;
    playBell();
  }, [mode, currentRoundIndex, isRunning, playBell]);

  const handleStart = useCallback(() => start(), [start]);
  const handlePause = useCallback(() => pause(), [pause]);
  const handleSkip = useCallback(() => skipRound(), [skipRound]);
  const handleReset = useCallback(() => resetRound(), [resetRound]);

  const addMember = useCallback(() => {
    const name = newName.trim();
    if (!name) return;
    if (members.includes(name)) {
      Alert.alert('Duplicate', 'That member already exists.');
      return;
    }
    setMembers((m) => [...m, name]);
    setNewName('');
    setInitialRoundIndex(0);
  }, [newName, members]);

  const removeMember = useCallback((name) => {
    setMembers((m) => m.filter((x) => x !== name));
    setInitialRoundIndex(0);
  }, []);

  const confirmResetAll = () => {
    Alert.alert(
      'Reset All?',
      'Erase members and progress? There is no going back.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Reset',
          style: 'destructive',
          onPress: async () => {
            await clearData();
            setMembers([]);
            setInitialRoundIndex(0);
            setHasStarted(false);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <StatusBar style="auto" />
      <Image source={MatMatchLogo} style={styles.logo} resizeMode="contain" />

      {!hasStarted ? (
        <SetupScreen
          members={members}
          newName={newName} setNewName={setNewName}
          addMember={addMember} removeMember={removeMember}
          matchMinutes={matchMinutes} setMatchMinutes={setMatchMinutes}
          restMinutes={restMinutes} setRestMinutes={setRestMinutes}
          onStart={() => setHasStarted(true)}
        />
      ) : rounds.length === 0 ? (
        <View style={styles.centered}>
          <Text>Not enough members for matches.</Text>
          <Button title="Back to Setup" onPress={() => setHasStarted(false)} />
        </View>
      ) : (
        <MatchScreen
          rounds={rounds}
          currentRoundIndex={currentRoundIndex}
          currentRound={currentRound}
          mode={mode}
          timeLeft={timeLeft}
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onSkip={handleSkip}
          onResetRound={handleReset}
          onBackToSetup={() => setHasStarted(false)}
          onResetAll={confirmResetAll}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
});