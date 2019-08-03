import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AnimatedIcon } from 'components/AnimatedIcon';

export const PlayerButtons = ({ size = 24 }: { size?: number }) => (
    <View style={styles.row}>
        <AnimatedIcon
            name={'ios-rewind'}
            size={size}
            disabled
            pressHandler={() => null}
        />
        <AnimatedIcon name={'ios-play'} size={size * 1.5} pressHandler={() => null} />
        <AnimatedIcon
            name={'ios-fastforward'}
            size={size}
            disabled
            pressHandler={() => null}
        />
    </View>
);

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
