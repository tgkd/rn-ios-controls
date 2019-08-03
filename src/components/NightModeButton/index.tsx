import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Easing,
    Animated,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from 'styles';

export interface IToggleProps {
    pressHandler: () => void;
}

export const NightModeButton = ({ pressHandler }: IToggleProps) => {
    const [active, setActive] = useState(false);
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedTranslate = useRef(new Animated.Value(1)).current;
    const animatedVal = useRef(new Animated.Value(0)).current;
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const animate = (
        newScaleVal: number,
        newTranslateVal: number,
        callback?: () => void
    ) => {
        Animated.parallel([
            Animated.timing(animatedTranslate, {
                toValue: newTranslateVal,
                duration: 200,
            }),
            Animated.timing(animatedScale, {
                toValue: newScaleVal,
                duration: 100,
            }),
        ]).start(callback);
    };

    const onPress = () => {
        setActive(!active);
        Animated.timing(animatedVal, {
            duration: 150,
            toValue: Number(!active),
            easing: Easing.ease,
        }).start(() => {
            animate(0.95, 0, () => {
                pressHandler();
                animate(1, 1, () => {});
            });
        });
    };

    const backgroundColor = animatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.buttonBackground, colors.white],
    });
    const iconColor = animatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.white, colors.purple],
    });

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View
                style={[
                    styles.default,
                    {
                        backgroundColor: backgroundColor,
                        transform: [{ scale: animatedScale }],
                    },
                ]}
            >
                <Animated.View style={[styles.circle, { backgroundColor: iconColor }]} />
                <Animated.View
                    style={[
                        styles.animatedCircle,
                        {
                            backgroundColor: animatedVal.interpolate({
                                inputRange: [0, 1],
                                outputRange: [colors.buttonBackground, colors.white],
                            }),
                            transform: [
                                {
                                    translateX: animatedTranslate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [3, 10],
                                    }),
                                },
                                {
                                    translateY: animatedTranslate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-1, -8],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    default: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 16,
    },

    circle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 22,
        width: 22,
        borderRadius: 11,
        transform: [{ translateX: 3 }, { translateY: -2 }],
    },
    animatedCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
    },
});
