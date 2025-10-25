# First App - React Native Mobile Application

A feature-rich React Native mobile application built with Expo, featuring a calculator, product listing with API integration, and theme switching capabilities.

## 🚀 Tech Stack

### Core Technologies

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (~54.0.13) - Development platform and tooling
- **TypeScript** (~5.9.2) - Type-safe JavaScript
- **React** (19.1.0) - UI library

### Navigation

- **React Navigation** (7.x) - Navigation library
  - Native Stack Navigator
  - Drawer Navigator
  - Bottom Tab Navigator

### State Management & Storage

- **React Context API** - Theme management
- **AsyncStorage** (2.2.0) - Persistent local storage

### UI & Styling

- **Expo Vector Icons** (15.0.2) - Icon library
- **React Native Gesture Handler** (2.28.0) - Touch gestures
- **React Native Reanimated** (4.1.1) - Smooth animations
- **React Native Safe Area Context** (5.6.1) - Safe area handling

### Additional Features

- **React Native Flash Message** (0.4.2) - Toast notifications
- **React Native Error Boundary** (3.0.0) - Error handling

## 📱 Features

### 1. Calculator

- Basic arithmetic operations (+, -, ×, ÷)
- Responsive design for portrait and landscape modes
- Clean, modern UI with themed styling

### 2. Product Listing

- Fetches products from external API (fakestoreapi.com)
- FlatList with pull-to-refresh
- Product cards with images, titles, prices, and ratings
- Navigation to detailed product view
- Loading states and error handling

### 3. Theme System

- Light and dark mode support
- Persistent theme preference (saved with AsyncStorage)
- Context-based theme management
- Consistent styling across all screens

### 4. Custom Components

- Reusable Button component with variants (primary, secondary, danger)
- Themed components that adapt to light/dark mode
- Type-safe component props

## 🏗️ Project Structure

```text
first-app/
├── assets/              # Images and static assets
├── components/          # Reusable UI components
│   ├── Button/         # Custom button component
│   ├── CalcButton.tsx  # Calculator button
│   ├── CalcRow.tsx     # Calculator row layout
│   └── CustomButton.tsx # Themed button variants
├── context/            # React Context providers
│   └── ThemeContext.tsx # Theme management
├── navigation/         # Navigation configuration
│   └── DrawerStack.tsx # Drawer navigator setup
├── screens/            # Application screens
│   ├── CalculatorScreen.tsx
│   ├── FlatListScreen.tsx
│   ├── FlatListDetailsScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── TabOneScreen.tsx
│   └── TabTwoScreen.tsx
├── types/              # TypeScript type definitions
│   ├── navigation.ts   # Navigation types
│   ├── product.ts      # Product data types
│   └── theme.ts        # Theme types
├── utils/              # Utility functions
│   └── Calculator.tsx  # Calculator logic
├── App.tsx             # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for Mac) or Android Emulator

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd first-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

## 📲 Running the App

### Using Expo Go (Easiest)

1. Install Expo Go app on your iOS or Android device
2. Run `npm start`
3. Scan the QR code with your device

### iOS Simulator

```bash
npm run ios
```

### Android Emulator

```bash
npm run android
```

### Web Browser

```bash
npm run web
```

## 🎯 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## 🔑 Key Features Implementation

### Theme Switching

The app uses React Context to manage theme state:

```typescript
// Access theme in any component
const { theme, toggleTheme } = useTheme();
```

Theme preference is persisted using AsyncStorage and automatically loads on app start.

### API Integration

Products are fetched from the Fake Store API:

```typescript
const response = await fetch('https://fakestoreapi.com/products');
const data = await response.json();
```

Includes proper error handling, loading states, and pull-to-refresh functionality.

### Type Safety

All components, screens, and navigation are fully typed with TypeScript:

- Navigation params are type-checked
- Component props are validated
- API responses have defined interfaces

## 🎨 Customization

### Adding New Screens

1. Create screen component in `screens/`
2. Add navigation types in `types/navigation.ts`
3. Register screen in `App.tsx` or `DrawerStack.tsx`

### Modifying Theme

Edit theme colors in `context/ThemeContext.tsx`:

```typescript
const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  // ... other colors
};
```

### Adding New Button Variants

Extend the Button component in `components/CustomButton.tsx` with new variant types.

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache and restart
npx expo start -c
```

### Dependency Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### iOS Build Issues

```bash
# Clean iOS build
cd ios && pod install && cd ..
```

## 📝 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a learning project. Feel free to explore and modify for educational purposes.

## 📧 Contact

For questions or feedback, please reach out to the project maintainer.
