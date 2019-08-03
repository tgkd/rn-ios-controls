import React, { useState, useRef } from 'react';
import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import { Navigation, ComponentEvent } from 'react-native-navigation';

import { ToggleButton } from 'components/ToggleButton';

import { Screens } from 'navigation';
import { colors } from 'styles';

interface IProps extends ComponentEvent {}

export const BUTTONS = [
    {
        name: 'ios-airplane',
        label: 'Airplane Mode',
        icon: {
            defaultColor: colors.white,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.buttonDisabled,
            activeColor: colors.orange,
        },
    },
    {
        name: 'ios-cellular',
        label: 'Mobile Data',
        icon: {
            defaultColor: colors.white,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.buttonDisabled,
            activeColor: colors.green,
        },
    },
    {
        name: 'ios-wifi',
        label: 'Wi-Fi',
        icon: {
            defaultColor: colors.opacityBackground,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.lightGray,
            activeColor: colors.blue,
        },
    },
    {
        name: 'ios-bluetooth',
        label: 'Bluetooth',
        icon: {
            defaultColor: colors.opacityBackground,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.lightGray,
            activeColor: colors.blue,
        },
    },
    {
        name: 'ios-',
        label: 'AirDrop',
        icon: {
            defaultColor: colors.opacityBackground,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.lightGray,
            activeColor: colors.blue,
        },
    },
    {
        name: 'ios-link',
        label: 'Personal Hotspot',
        icon: {
            defaultColor: colors.white,
            activeColor: colors.white,
        },
        background: {
            defaultColor: colors.buttonDisabled,
            activeColor: colors.green,
        },
    },
];

export default function Network(props: IProps) {
    const initState: { [key: string]: boolean } = BUTTONS.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: false }),
        {}
    );
    const [buttonsState, setButtonsState] = useState(initState);
    const animatedOpacity = useRef(new Animated.Value(1)).current;

    const animate = (toValue: number, callback?: () => void, duration = 50) => {
        Animated.timing(animatedOpacity, {
            toValue,
            duration,
            useNativeDriver: true,
        }).start(callback);
    };

    const goBack = () => {
        animate(0, () => {
            animate(1, () => {}, 50);
            Navigation.pop(props.componentId);
        });
    };

    const buttonPressHandler = (name: string) => {
        setButtonsState({ ...buttonsState, [name]: !buttonsState[name] });
    };

    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={goBack}>
            <Navigation.Element elementId={`${Screens.network}_2`}>
                <TouchableOpacity activeOpacity={1} style={styles.resultBlock}>
                    {BUTTONS.map(b => (
                        <Animated.View
                            style={[styles.btnContainer, { opacity: animatedOpacity }]}
                            key={b.name}
                        >
                            <ToggleButton
                                pressHandler={buttonPressHandler.bind(null, b.name)}
                                rounded
                                icon={{
                                    ...b.icon,
                                    name: b.name,
                                    size: 24,
                                }}
                                background={b.background}
                                styles={{ height: 50, width: 50, borderRadius: 25 }}
                            />
                            <Text style={styles.btnLabel}>{b.label}</Text>
                            <Text style={styles.labelVal}>
                                {buttonsState[b.name] ? 'On' : 'Off'}
                            </Text>
                        </Animated.View>
                    ))}
                </TouchableOpacity>
            </Navigation.Element>
        </TouchableOpacity>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.pageBackground,
    },

    resultBlock: {
        height: '80%',
        width: width - 40,
        borderRadius: 40,
        backgroundColor: colors.opacityBackground,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    btnContainer: {
        width: '50%',
        height: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnLabel: {
        marginTop: 10,
        color: colors.white,
    },

    labelVal: {
        color: colors.white,
    },
});
