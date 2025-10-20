import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemedView, ThemedText } from '../components/ThemedComponents';

export default function SettingsScreen(): React.ReactElement {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.settingRow}>
        <ThemedText variant="medium">Dark Mode</ThemedText>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={theme.colors.primary}
          trackColor={{ 
            false: theme.colors.border, 
            true: theme.colors.primary + '40'
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
