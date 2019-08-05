import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function Page({ children }: { children: React.ReactNode }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
