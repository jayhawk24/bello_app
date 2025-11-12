import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/theme/tokens';
import { Text } from './Text';

interface Props extends TextInputProps {
    label?: string;
    containerStyle?: ViewStyle | ViewStyle[];
}

export const Input: React.FC<Props> = ({ label, style, containerStyle, ...rest }) => {
    return (
        <View style={containerStyle}>
            {label ? (
                <Text variant="caption" style={{ marginBottom: spacing.xs, color: colors.text.secondary }}>
                    {label}
                </Text>
            ) : null}
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={colors.text.secondary}
                selectionColor={colors.brand.primary}
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.surface.card,
        padding: spacing.md,
        borderRadius: radii.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.surface.border,
        color: colors.text.primary,
    },
});

export default Input;
