import * as FileSystem from "expo-file-system";

const DATA_FILE = FileSystem.documentDirectory + "matmatch-data.json"

export async function loadData() {
    try{
        const info = await FileSystem.getInfoAsync(DATA_FILE);
        if (!info.exists) {
            return { members: [], currentPairIndex: 0};
        }
        const raw = await FileSystem.readAsStringAsync(DATA_FILE);
        return JSON.parse(raw);
    } catch(e) {
        console.warn('Error loading data:', e);
        return {members: [], currentPairIndex: 0};
    }
}

export async function saveData({ members, currentPairIndex }) {
    try {
        const toWrite = JSON.stringify({ members, currentPairIndex });
        await FileSystem.writeAsStringAsync(DATA_FILE, toWrite);
    } catch (e) {
        console.warn('Error saving data:', e);
    }
}

export async function clearData() {
    try {
        const info = await FileSystem.getInfoAsync(DATA_FILE);
        if (info.exists) {
            await FileSystem.deleteAsync(DATA_FILE);
        }
    } catch (e) {
        console.warn('Error clearing data:', e);
    }
}