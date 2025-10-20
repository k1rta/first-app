import React, { ReactNode } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedViewProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'card';
}

export const ThemedView: React.FC<ThemedViewProps> = ({ 
  children, 
  style, 
  variant = 'default' 
}) => {
  const { theme } = useTheme();
  
  const backgroundColor = variant === 'card' ? theme.colors.card : theme.colors.background;
  
  return (
    <View style={[{ backgroundColor }, style]}>
      {children}
    </View>
  );
};

interface ThemedTextProps {
  children: ReactNode;
  style?: TextStyle;
  variant?: 'small' | 'medium' | 'large' | 'xlarge';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  children, 
  style, 
  variant = 'medium' 
}) => {
  const { theme } = useTheme();
  
  return (
    <Text 
      style={[
        { 
          color: theme.colors.text,
          fontSize: theme.typography[variant]
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
};
