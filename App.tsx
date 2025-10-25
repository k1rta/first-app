// React and React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Third-party
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';

// Local
import DrawerStack from './navigation/DrawerStack';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import FlatListDetailsScreen from './screens/FlatListDetailsScreen';
import type { RootStackParamList } from './types/navigation';

// Navigation types moved to types/navigation.ts for reuse

// Stack Navigator instance
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Error boundary fallback component
 * Shown when an uncaught error occurs in the app
 */
const ErrorFallback = ({ error }: { error: Error }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.message}>{error.message}</Text>
  </View>
);

// Main App component
const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <SafeAreaProvider>
        <StatusBar style="light" />
        <ThemeProvider>
          <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { 
                backgroundColor: '#007AFF' // Blue color as hex
              },
              headerTintColor: '#ffffffff',
              contentStyle: { 
                backgroundColor: '#ffffff' // White background
              },
              // Accessibility
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 18,
              },
            }}
            //initialRouteName="Home"
            initialRouteName="Drawer"
          >
            <Stack.Screen
          name="Drawer"
          component={DrawerStack}
          options={{ headerShown: false }}
        />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'Home',
                // Screen-specific options can be added here
              }}
            /> 
            <Stack.Screen
              name="FlatListDetailsScreen"
              component={FlatListDetailsScreen}
              options={{ 
                headerShown: true,
                title: 'Product Details'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </ThemeProvider>
    </SafeAreaProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#d32f2f',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
