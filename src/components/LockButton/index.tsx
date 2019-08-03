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

export const LockButton = ({ pressHandler }: IToggleProps) => {
    const [active, setActive] = useState(false);
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedVal = useRef(new Animated.Value(0)).current;
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const animateScale = (toValue: number, callback?: () => void) => {
        Animated.timing(animatedScale, {
            toValue,
            duration: 100,
        }).start(callback);
    };

    const onPress = () => {
        setActive(!active);
        Animated.timing(animatedVal, {
            duration: 300,
            toValue: Number(!active),
            easing: Easing.ease,
        }).start(() => {
            animateScale(0.95, () => {
                pressHandler();
                animateScale(1, () => {});
            });
        });
    };

    const backgroundColor = animatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.opacityBackground, colors.white],
    });
    const iconColor = animatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.white, colors.red],
    });
    const arraowSpin = animatedVal.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: active
            ? ['90deg', '110deg', '90deg']
            : ['450deg', '360deg', '90deg'],
    });

    // TODO find a more beautiful refresh icon
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
                <AnimatedIcon
                    name={'ios-refresh'}
                    size={42}
                    style={{ color: iconColor, transform: [{ rotate: arraowSpin }] }}
                />
                <View style={styles.lockIcon}>
                    <AnimatedIcon
                        name={'ios-unlock'}
                        size={20}
                        style={[{ color: iconColor }]}
                    />
                </View>
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

    lockIcon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
