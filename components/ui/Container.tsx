import React from 'react';
import { View, StyleSheet, ViewProps, useWindowDimensions } from 'react-native';
import { spacing } from '@/theme/tokens';

export const Container: React.FC<ViewProps> = ({ style, children, ...rest }) => {
    const { width } = useWindowDimensions();
    const horizontal = width >= 600 ? spacing.xl * 1.5 : spacing.xl;
    return (
        <View style={[styles.container, { paddingHorizontal: horizontal }, style]} {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: spacing.xl,
        paddingBottom: spacing.xl,
        maxWidth: 1200,
        alignSelf: 'center'
    }
});

export default Container;
