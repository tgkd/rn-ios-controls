import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ScalingTouchableView } from 'components/ScalingTouchableView';

import { Screens } from 'navigation';
import { colors } from 'styles';

export const ScreenMirroringButton = ({ pressHandler }: { pressHandler: () => void }) => (
    <ScalingTouchableView
        route={Screens.player}
        conatinerStyles={styles.button}
        onPress={pressHandler}
    >
        <Icon name={'ios-photos'} size={22} color={colors.white} />
        <Text style={styles.buttonText}>Screen Mirroring</Text>
    </ScalingTouchableView>
);

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontSize: 12,
    },
    button: {
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        width: 125,
        height: 55,
        borderRadius: 16,
    },
});
