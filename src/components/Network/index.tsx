import React from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { ToggleButton } from 'components/ToggleButton';

import { Screens } from 'navigation';
import { colors } from 'styles';
import { INetworkProps } from 'screens/Network';
import { isIphoneX } from 'helpers';

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
        name: 'ios-radio',
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

export default class Network extends React.Component<INetworkProps> {
    private animatedOpacity = new Animated.Value(1);

    public render() {
        const { buttonsState } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                onPress={this.goBack}
            >
                <Navigation.Element elementId={`${Screens.network}_2`}>
                    <TouchableOpacity activeOpacity={1} style={styles.resultBlock}>
                        {BUTTONS.map(b => (
                            <Animated.View
                                style={[
                                    styles.btnContainer,
                                    { opacity: this.animatedOpacity },
                                ]}
                                key={b.name}
                            >
                                <ToggleButton
                                    pressHandler={this.props.setButtonState}
                                    rounded
                                    icon={{
                                        ...b.icon,
                                        name: b.name,
                                        size: 24,
                                    }}
                                    background={b.background}
                                    styles={{ height: 50, width: 50, borderRadius: 25 }}
                                    isActive={buttonsState[b.name]}
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

    private readonly animate = (
        toValue: number,
        callback?: () => void,
        duration = 50
    ) => {
        Animated.timing(this.animatedOpacity, {
            toValue,
            duration,
            useNativeDriver: true,
        }).start(callback);
    };

    private readonly goBack = () => {
        this.animate(0, () => {
            Navigation.pop(this.props.componentId);
            this.animate(1, () => {}, 50);
        });
    };
}

const dim = Dimensions.get('window');

const height = isIphoneX() ? dim.height - 420 : dim.height - 240;
const width = dim.width - 40;
const borderRadius = Math.round((height + width) / 14);

const styles = StyleSheet.create({
    container: {
        width: dim.width,
        height: dim.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.pageBackground,
    },

    resultBlock: {
        height,
        width,
        borderRadius,
        backgroundColor: colors.opacityBackground,
        paddingVertical: 10,
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
