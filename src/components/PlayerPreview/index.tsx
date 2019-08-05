import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { PlayerButtons } from 'components/PlayerButtons';
import { ScalingTouchableView } from 'components/ScalingTouchableView';

import { Screens } from 'navigation';
import { colors } from 'styles';

interface IProps {
    pressHandler: (route: Screens) => void;
}

export function PlayerPreview({ pressHandler }: IProps) {
    return (
        <ScalingTouchableView
            conatinerStyles={styles.conatiner}
            route={Screens.player}
            onPress={pressHandler.bind(null, Screens.player)}
        >
            <View style={styles.contentContainer}>
                <View style={styles.row}>
                    <Text style={styles.title}>Music</Text>
                </View>
                <PlayerButtons />
            </View>
        </ScalingTouchableView>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 125,
        width: 125,
        borderRadius: Math.round(125 + 125) / 14,
    },
    contentContainer: {
        padding: 6,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
    },
});
