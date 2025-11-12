import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing, radii } from '@/theme/tokens';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'accent';

export const Badge: React.FC<{ label: string; tone?: Tone }> = ({ label, tone = 'neutral' }) => {
    const style = (() => {
        switch (tone) {
            case 'primary': return { bg: colors.brand.primary, fg: colors.text.inverse };
            case 'success': return { bg: colors.brand.success, fg: colors.text.inverse };
            case 'warning': return { bg: colors.brand.warning, fg: colors.text.inverse };
            case 'danger': return { bg: colors.brand.danger, fg: colors.text.inverse };
            case 'accent': return { bg: colors.brand.accent, fg: colors.text.primary };
            default: return { bg: colors.surface.border, fg: colors.text.primary };
        }
    })();
    return (
        <View style={[styles.base, { backgroundColor: style.bg }]}>
            <Text variant="caption" color={style.fg}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: radii.md,
    }
});

export default Badge;
