import {
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Audio } from 'expo-av';

// Custom hook to manage bell sound playback
export default function useAudioBell() {
  const bellRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('../assets/bell.mp3')
        );
        bellRef.current = sound;
      } catch (e) {
          console.warn('Bell load error', e);
        }
    })();

    return () => {
      bellRef.current?.unloadAsync();
    };
  }, []);

  const playBell = useCallback(async () => {
    if (!bellRef.current) return;
    try {
      await bellRef.current.replayAsync();
    } catch (e) {
        console.warn('Bell play error', e);
      }
  }, []);

  return playBell;
}