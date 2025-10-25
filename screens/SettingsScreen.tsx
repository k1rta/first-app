import React from 'react';
import { View, Switch, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemedView, ThemedText } from '../components/ThemedComponents';
import CustomButton from '../components/CustomButton';

export default function SettingsScreen(): React.ReactElement {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();

  const handleSave = () => {
    Alert.alert('Saved!', 'Settings saved successfully');
  };

  const handleView = () => {
    Alert.alert('View', 'Viewing profile...');
  };

  const handleDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete?');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
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
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>CustomButton Examples</ThemedText>
        
        <View style={styles.buttonContainer}>
          {/* Primary Button */}
          <CustomButton 
            title="Save" 
            onPress={handleSave} 
            variant="primary" 
          />

          {/* Secondary Button */}
          <CustomButton 
            title="View" 
            onPress={handleView} 
            variant="secondary" 
          />

          {/* Danger Button */}
          <CustomButton 
            title="Delete" 
            onPress={handleDelete} 
            variant="danger" 
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    width: '100%',
  },
});
