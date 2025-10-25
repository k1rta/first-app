import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Theme } from '../../types/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonStyles {
  button: ViewStyle;
  text: TextStyle;
  iconContainer: ViewStyle;
}

export const getButtonStyles = (
  theme: Theme,
  variant: ButtonVariant,
  size: ButtonSize,
  isDisabled: boolean,
  fullWidth: boolean
): ButtonStyles => {
  // Base button styles
  const baseButton: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.sm,
    opacity: isDisabled ? 0.6 : 1,
    width: fullWidth ? '100%' : undefined,
  };

  // Size styles
  const sizeStyles = {
    small: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      minHeight: 32,
    },
    medium: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 44,
    },
    large: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 56,
    },
  };

  // Text size styles
  const textSizeStyles = {
    small: { fontSize: theme.typography.small },
    medium: { fontSize: theme.typography.medium },
    large: { fontSize: theme.typography.large },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      button: {
        ...baseButton,
        backgroundColor: theme.colors.primary,
      },
      text: {
        color: '#FFFFFF',
        fontWeight: '600' as const,
      },
    },
    secondary: {
      button: {
        ...baseButton,
        backgroundColor: theme.colors.secondary,
      },
      text: {
        color: '#FFFFFF',
        fontWeight: '600' as const,
      },
    },
    outline: {
      button: {
        ...baseButton,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      text: {
        color: theme.colors.primary,
        fontWeight: '600' as const,
      },
    },
    danger: {
      button: {
        ...baseButton,
        backgroundColor: theme.colors.error,
      },
      text: {
        color: '#FFFFFF',
        fontWeight: '600' as const,
      },
    },
    text: {
      button: {
        ...baseButton,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
      },
      text: {
        color: theme.colors.primary,
        fontWeight: '600' as const,
      },
    },
  };

  return {
    button: {
      ...baseButton,
      ...sizeStyles[size],
      ...variantStyles[variant].button,
    },
    text: {
      ...textSizeStyles[size],
      ...variantStyles[variant].text,
      textAlign: 'center',
    },
    iconContainer: {
      marginHorizontal: 4,
    },
  };
};

export const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 4,
  },
});
