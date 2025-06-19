import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function MatchScreen({
  rounds,
  currentRoundIndex,
  currentRound,
  mode,
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onSkip,
  onResetRound,
  onBackToSetup,
  onResetAll,
}) {
  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>

      <Text style={styles.subheader}>
        Round {currentRoundIndex + 1} of {rounds.length}
      </Text>

      <ScrollView style={styles.pairsContainer}>
        {mode === 'rest' && currentRoundIndex + 1 < rounds.length && (
          <Text style={styles.nextUpLabel}>Next Up:</Text>
        )}

        {(mode === 'rest' && currentRoundIndex + 1 < rounds.length
          ? rounds[currentRoundIndex + 1]
          : currentRound
        ).map(([a, b], i) => (
          <Text key={i} style={styles.pair}>
            {a} vs {b}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.clockContainer}>
        <Text style={styles.mode}>{mode === 'match' ? 'Match Time' : 'Rest Time'}</Text>

        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

        <View style={styles.controls}>
          {isRunning ? (
            <TouchableOpacity style={styles.button} onPress={onPause}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={onSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onResetRound}>
            <Text style={styles.buttonText}>Reset Round</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.backButton} onPress={onBackToSetup}>
            <Text style={styles.buttonText}>Back to Setup</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={[styles.dangerButton]} onPress={onResetAll}>
            <Text style={styles.buttonText}>Reset All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  pairsContainer: {
    marginBottom: 20,
  },
  pair: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 4,
  },
  mode: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  timer: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  clockContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent:'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#888',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  dangerButton: {
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  nextUpLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
});