import { StyleSheet, View, Text } from 'react-native';
//Theme imports
import { useTheme } from '../context/ThemeContext';
import { ThemedView, ThemedText } from '../components/ThemedComponents';



export default function SecondaryScreen() {
    const { theme, isDarkMode, toggleDarkMode } = useTheme();
  return (
    <ThemedView style={styles.container}>
      
      <ThemedText style={styles.title}>
        Secondary Page
      </ThemedText>
      <ThemedText>
        This is the secondary screen.
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
