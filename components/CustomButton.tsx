import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// TypeScript type for different variants
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant; // ? means this is optional
}

const CustomButton = (props: CustomButtonProps) => {
  // Default variant is 'primary' if not specified
  const variant = props.variant || 'primary';

  // Select the correct style based on variant
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'danger' && styles.buttonDanger,
  ];

  const textStyle = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={props.onPress}
    >
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#007AFF', // Secondary button text is blue
  },
});

export default CustomButton;
