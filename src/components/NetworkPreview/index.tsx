import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ScalingTouchableView } from 'components/ScalingTouchableView';
import { ToggleButton } from 'components/ToggleButton';
import { BUTTONS } from 'components/Network';

import { Screens } from 'navigation';

interface IProps {
    pressHandler: (route: Screens) => void;
}

export function NetworkPreview({ pressHandler }: IProps) {
    return (
        <ScalingTouchableView
            conatinerStyles={styles.conatiner}
            route={Screens.network}
            onPress={pressHandler.bind(null, Screens.network)}
        >
            {BUTTONS.slice(0, 4).map(b => (
                <View key={b.name} style={styles.btnContainer}>
                    <ToggleButton
                        pressHandler={() => null}
                        rounded
                        icon={{ name: b.name, ...b.icon }}
                        background={b.background}
                    />
                </View>
            ))}
        </ScalingTouchableView>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 125,
        width: 125,
        borderRadius: 18,
        padding: 6,
    },

    btnContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
