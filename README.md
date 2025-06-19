# 🥋 MatMatch - React Native App

MatMatch is a lightweight mobile application designed for organizing and timing Brazilian Jiu-Jitsu or other grappling rounds in a match/rest format. Built with React Native and Expo, it helps instructors, gym owners, or athletes run their training sessions efficiently with clean match pair displays and intuitive timers. Data is stored locally to eliminate need for outside services.

---

## 📱 Purpose

The app is built to address a simple but common need on the mat: **clearly displaying match pairings with an automatic timer** to manage match and rest intervals. It’s especially useful in open mats or class settings with rotating partners. When odd numbers are present a participant sits and is not displayed on the UI for a round. All participants match up once regardless of the number of participants.

---

## ✨ Features

- ✅ Add and manage a list of participants
- 🔁 Automatically generate match pairings each round
- ⏱ Match timer with adjustable durations
- 💡 Clear visual display of match pairs and current timer status
- 🔊 Bell sound to signal match start and end
- 🔄 Skip, Pause, Reset individual rounds
- 🔁 Reset all rounds back to setup screen

---

## ⚙️ Installation

Make sure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

1. Clone the repository:

```bash
git clone https://github.com/your-username/MatMatchApp.git
cd MatMatchApp
```

2. Install dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Scan the QR code in the Expo Go app on your mobile device to launch the app.

---

## ⚠️ Difficulties and Workarounds

### 🔇 Bell Sound Issues
Initially, the app's bell sound wasn't audible on some devices. This was due to how audio is handled in React Native. The issue was resolved by using the `expo-av` package and properly managing the `Audio.Sound` object lifecycle to ensure the bell played consistently at the start and end of each round.

### 📵 Push Notification Limitation
An attempt was made to add push notifications when the timer ends (for background usage), but due to JavaScript not executing when the app is backgrounded, **reliable push notifications were not feasible** without a backend service. As a result, the app does not currently support background notifications.

---

## 📂 Folder Structure

```
MatMatchApp/
├── assets/
│   ├── MatMatchLogo.png
│   ├── bell.mp3
│   └── (Expo pngs)
├── components/
│   └── MatchScreen.js
│   └── SetupScreen.js
├── hooks/
│   ├── useAudioBell.js
│   └── useMatch.js
├── resources/
│   ├── generateRounds.js
│   └── storage.js
├── App.js
├── index.js
├──.gitignore
├── app.json
├── package.json
├── package-lock.json
├── README.md
```

---

## 🛠 Tech Stack

- React Native (with Expo)
- JavaScript
- `expo-av` for audio
- `react-navigation` (if navigation is used)
- StyleSheet for UI design

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

This app was inspired by the need for smoother and more organized sparring rounds during training sessions. OSS contributions and React Native communities were instrumental in helping resolve sound and timer challenges.
