import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import DrawerStack from "./navigation/DrawerStack";

import HomeScreen from './screens/HomeScreen';
import { View, Text, StyleSheet } from 'react-native';

// Navigation types - täielik type safety
export type RootStackParamList = {
  Home: undefined;
  Drawer: undefined;
  // Tulevikus võimalike screen'ide jaoks:
  // Profile: { userId: string };
  // Settings: undefined;
};

// Stack Navigator instance
const Stack = createNativeStackNavigator<RootStackParamList>();

// Error fallback component
const ErrorFallback= ({ error }: { error: Error })  => (
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
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { 
                backgroundColor: '#5460afff' // Red color as hex
              },
              headerTintColor: '#ffffffff',
              contentStyle: { 
                backgroundColor: '#e8d3d3ff' // Light gray background
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
                // Screen-specific options võivad tulla siia
              }}
            /> 
          </Stack.Navigator>
        </NavigationContainer>
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
