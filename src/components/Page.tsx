import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Page({ children }: { children: React.ReactNode }) {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
