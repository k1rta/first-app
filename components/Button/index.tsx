import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getButtonStyles, styles } from './styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  style?: any;
  textStyle?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  
  const buttonStyles = getButtonStyles(
    theme,
    variant,
    size,
    isDisabled,
    fullWidth
  );

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={variant === 'text' || variant === 'outline' 
            ? theme.colors.primary 
            : '#FFFFFF'
          } 
          size={buttonStyles.text.fontSize}
        />
      );
    }

    return (
      <>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <Text style={[buttonStyles.text, textStyle]}>{title}</Text>
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      accessibilityRole="button"
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
