# Reading Tracker (React Native — Expo)

**Features (aapke web app jaise, RN ke hisaab se):**
- Login (Email + Password + 👁️ toggle). Submit par `demo_token` AsyncStorage me save hota hai.
- Auth Guard: App open hote hi token check hota hai. Token hua to Home, warna Login.
- Logout: token clear, wapas Login.
- Add Reading: Treated & Wasted water units ke numeric fields (– / + buttons). Validation: required, numeric, no negatives.
- Readings List: Sab records local storage (AsyncStorage) me store & list view me Date-Time ke saath.
- Offline-first (local storage).

## 1) Prerequisites
- **Node.js LTS** (18 ya 20)
- **Android Studio** (SDK + emulator) *ya* physical Android device (USB debugging ON)
- **Expo CLI** (npx ke through chalega, install alag se zaroori nahi)

## 2) Project Setup
Option A: Is zip ko extract karke seedha run karein
```bash
cd reading-tracker-rn
npm install
npx expo start --android
```
- Agar emulator khula hai to directly launch ho jayega. Physical device ke liye USB debugging enable rakhein.

Option B: Naya Expo app banakar code copy karein
```bash
npx create-expo-app reading-tracker-rn --template blank
cd reading-tracker-rn
npm install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```
- `App.js`, `src/` aur config files ko is repo se copy-paste kar dein.
- Fir run:
```bash
npx expo start --android
```

## 3) APK/Build (Simple ways)
- **Quick dev build:** `npx expo run:android` (ye native android project generate karke Android Studio/Gradle se debug build banata hai)
- **Release APK (recommended via EAS):**
  1. Expo login/create account.
  2. `npm i -g eas-cli`
  3. `eas build:configure`
  4. `eas build -p android --profile preview` (ya `production`)
  5. Build complete hone par APK/AAB ka link milega.

> Note: Humne **Reanimated / Gesture-heavy** libs use nahi kiye, taaki aapko Babel/plugin waale errors na aayein.

## 4) Project Structure
```
reading-tracker-rn/
  App.js
  index.js
  app.json
  babel.config.js
  package.json
  assets/
  src/
    contexts/AuthContext.js
    storage/storage.js
    screens/LoginScreen.js
    screens/MainScreen.js
    screens/tabs/AddReadingScreen.js
    screens/tabs/ReadingsScreen.js
```

## 5) Mapping from React+Vite (Web) → React Native
- **LocalStorage → AsyncStorage** (API async/await based).
- **Routing (react-router) → @react-navigation/native + native-stack**.
- **CSS/Tailwind → RN StyleSheet** (inline styles).
- **Components:** `<input>`, `<button>` ko RN ke `TextInput`, `TouchableOpacity`, `View`, `Text` se replace kiya gaya.

## 6) Common Issues
- **SDK mismatch:** Agar `expo`/`react-native` versions mismatch error aaye, to `npm i` ke baad `npx expo doctor` chala ke suggestions follow karein.
- **Emulator detect nahi ho raha:** Android Studio me AVD Manager se emulator launch karein, phir `--android` run karein.
- **USB device not found:** Developer Options → USB debugging enable, `adb devices` me dikhna chahiye.

Happy building! 🎉
