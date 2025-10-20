import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  GestureResponderEvent,
  Platform
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const getButtonWidth = () => {
  const screen = Dimensions.get("window");
  const isLandscape = screen.width > screen.height;
  
  // For web, use a fixed size that works well
  if (Platform.OS === 'web') {
    return 80;
  }
  
  // For mobile, adjust size based on orientation
  if (isLandscape) {
    return Math.min(screen.width, screen.height) / 6.5; // Much smaller buttons in landscape
  }
  return screen.width / 4; // Normal size in portrait
};

const createStyles = (theme: any, isDarkMode: boolean) => {
  const buttonWidth = getButtonWidth();
  
  return StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontSize: Platform.OS === 'web' ? 20 : (buttonWidth < 60 ? 18 : 25),
      fontWeight: '500'
    },
    textSecondary: {
      color: isDarkMode ? theme.colors.background : theme.colors.text,
      fontSize: Platform.OS === 'web' ? 20 : (buttonWidth < 60 ? 18 : 25),
      fontWeight: '500'
    },
    button: {
      backgroundColor: theme.colors.card,
      flex: 1,
      height: Math.floor(buttonWidth - 10),
      alignItems: "center" as "center" | "flex-start",
      justifyContent: "center",
      borderRadius: Platform.OS === 'web' ? 12 : Math.floor(buttonWidth / 2),
      margin: buttonWidth < 50 ? 1 : (buttonWidth < 60 ? 3 : 5),
      minWidth: Platform.OS === 'web' ? 70 : undefined,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    buttonDouble: {
      backgroundColor: theme.colors.card,
      flex: Platform.OS === 'web' ? 0 : 0,
      height: Math.floor(buttonWidth - 10),
      alignItems: "flex-start" as "center" | "flex-start",
      justifyContent: "center",
      borderRadius: Platform.OS === 'web' ? 12 : Math.floor(buttonWidth / 2),
      margin: buttonWidth < 50 ? 1 : (buttonWidth < 60 ? 3 : 5),
      width: Platform.OS === 'web' ? 150 : Dimensions.get('window').width / 2 - 10,
      paddingLeft: Platform.OS === 'web' ? 25 : (buttonWidth < 60 ? 25 : 40),
      minWidth: Platform.OS === 'web' ? 150 : undefined,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    buttonSecondary: {
      backgroundColor: isDarkMode ? '#4A4A4A' : '#D1D1D6',
      flex: 1,
      height: Math.floor(buttonWidth - 10),
      alignItems: "center" as "center" | "flex-start",
      justifyContent: "center",
      borderRadius: Platform.OS === 'web' ? 12 : Math.floor(buttonWidth / 2),
      margin: buttonWidth < 50 ? 1 : (buttonWidth < 60 ? 3 : 5),
      minWidth: Platform.OS === 'web' ? 70 : undefined,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    buttonAccent: {
      backgroundColor: theme.colors.primary,
      flex: 1,
      height: Math.floor(buttonWidth - 10),
      alignItems: "center" as "center" | "flex-start",
      justifyContent: "center",
      borderRadius: Platform.OS === 'web' ? 12 : Math.floor(buttonWidth / 2),
      margin: buttonWidth < 50 ? 1 : (buttonWidth < 60 ? 3 : 5),
      minWidth: Platform.OS === 'web' ? 70 : undefined,
      borderWidth: 1,
      borderColor: theme.colors.border
    }
  });
};

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  size?: "double";
  theme?: "secondary" | "accent";
};

const Button: React.FC<ButtonProps> = ({ onPress, text, size, theme: buttonTheme }) => {
  const { theme, isDarkMode } = useTheme();
  const [buttonWidth, setButtonWidth] = useState(getButtonWidth());
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setButtonWidth(getButtonWidth());
    });
    
    return () => subscription?.remove();
  }, []);
  
  const styles = createStyles(theme, isDarkMode);
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  if (buttonTheme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (buttonTheme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={buttonStyles}
      activeOpacity={0.7}
      // Web-specific props
      {...(Platform.OS === 'web' && {
        onMouseEnter: (e: any) => {
          e.target.style.opacity = '0.8';
        },
        onMouseLeave: (e: any) => {
          e.target.style.opacity = '1';
        }
      })}
    >
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
