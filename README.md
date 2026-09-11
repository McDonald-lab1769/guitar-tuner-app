# Guitar Tuner App

A modern, cross-platform guitar tuning application for iOS and Android built with React Native and Expo.

## Features

### Free Features
- Standard tuning (E-A-D-G-B-E)
- Drop D tuning
- Real-time frequency detection
- Visual tuning gauge
- Current note display

### Premium Features (Subscription)
- Half-step down tuning
- Open tunings
- Custom tuning creation
- Auto-tuning assistant
- Tuning history and analytics
- Ad-free experience
- Export tunings
- Priority support

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Audio**: Expo AV
- **Storage**: AsyncStorage
- **UI Components**: React Native SVG
- **Backend**: Node.js/Express (for purchase verification)

## Getting Started

### Prerequisites
- Node.js (v16+)
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/McDonald-lab1769/guitar-tuner-app.git
cd guitar-tuner-app

# Install dependencies
npm install

# Start the app
npm start
```

### Running on Devices

```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
src/
├── screens/
│   ├── TunerScreen.js       # Main tuning interface
│   └── PremiumScreen.js     # Premium subscription management
├── services/
│   ├── AudioService.js      # Audio capture and frequency detection
│   └── PremiumService.js    # Subscription and premium features management
App.js                        # Navigation setup
README.md                     # This file
```

## Features Breakdown

### Audio Processing
- Real-time microphone input capture
- Frequency detection using FFT
- Pitch-to-note conversion
- Cent deviation calculation

### Subscription Model
- Monthly and yearly plans
- In-app purchase integration
- Purchase restoration
- Feature gating based on subscription status

## Future Enhancements

- [ ] Advanced frequency detection algorithms
- [ ] Chord recognition
- [ ] Metronome feature
- [ ] Tuning presets library
- [ ] Social sharing of tunings
- [ ] Backend API integration
- [ ] Analytics dashboard
- [ ] Dark mode support

## In-App Purchase Integration

Currently, the app has placeholder IAP logic. To fully implement:

1. Set up Apple App Store and Google Play Store accounts
2. Configure in-app products
3. Integrate `react-native-iap` library
4. Implement server-side purchase verification

## License

MIT

## Support

For issues or feature requests, please create an issue on GitHub.
