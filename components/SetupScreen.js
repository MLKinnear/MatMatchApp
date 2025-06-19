import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SetupScreen({
  members,
  newName,
  setNewName,
  addMember,
  removeMember,
  matchMinutes,
  setMatchMinutes,
  restMinutes,
  setRestMinutes,
  onStart,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>List of Participants</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Member name"
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          onSubmitEditing={addMember}
        />
        <Button title="Add" onPress={addMember} />
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeMember(item)}>
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No members yet...</Text>}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      />

      <TouchableOpacity
        onPress={onStart}
        disabled={members.length < 2}
        style={[
          styles.startButton,
          members.length < 2 && styles.startButtonDisabled,
        ]}
      >
        <Text style={styles.startButtonText}>
          {members.length >= 2 ? 'Start Matches' : 'It takes at least 2 to roll'}
        </Text>
      </TouchableOpacity>

      <View style={styles.durationRow}>

        <View style={styles.durationInput}>
          <Text>Match (min)</Text>
          <Picker
            selectedValue={matchMinutes}
            onValueChange={(value) => setMatchMinutes(value)}
            style={styles.picker}
          >
            {[...Array(61).keys()].slice(1).map((min) => (
              <Picker.Item key={min} label={`${min}`} value={`${min}`} />
            ))}
          </Picker>
        </View>

        <View style={styles.durationInput}>
          <Text>Rest (min)</Text>
          <Picker
            selectedValue={restMinutes}
            onValueChange={(value) => setRestMinutes(value)}
            style={styles.picker}
          >
            {[...Array(61).keys()].slice(1).map((min) => (
              <Picker.Item key={min} label={`${min}`} value={`${min}`} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  removeText: {
    color: '#c00',
  },
  durationRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  durationInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 175,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonDisabled: {
    backgroundColor: '#aaa',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});