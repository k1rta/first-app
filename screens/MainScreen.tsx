import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
//Theme imports
import { useTheme } from '../context/ThemeContext';
import { ThemedView, ThemedText } from '../components/ThemedComponents';


export default function MainScreen() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        Main Page
      </ThemedText>
      <ThemedText>
        Welcome to the main screen with themed components!
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
