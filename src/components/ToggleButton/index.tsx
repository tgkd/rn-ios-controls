import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Easing,
    Animated,
    TouchableWithoutFeedback,
    StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from 'styles';

export interface IToggleProps {
    icon: {
        activeColor: string;
        defaultColor: string;
        name: string;
        size?: number;
    };
    background?: {
        activeColor: string;
        defaultColor: string;
    };
    rounded?: boolean;
    pressHandler: () => void;
    styles?: StyleProp<any>;
}

export const ToggleButton = ({
    pressHandler,
    icon,
    background = { defaultColor: colors.opacityBackground, activeColor: colors.white },
    rounded,
    ...props
}: IToggleProps) => {
    const [active, setActive] = useState(false);
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedColor = useRef(new Animated.Value(0)).current;
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const animateScale = (toValue: number, callback?: () => void) => {
        Animated.timing(animatedScale, {
            toValue,
            duration: 100,
        }).start(callback);
    };

    const onPress = () => {
        setActive(!active);
        Animated.timing(animatedColor, {
            duration: rounded ? 150 : 50,
            toValue: Number(!active),
            easing: Easing.ease,
        }).start(() => {
            if (rounded) {
                pressHandler();
                return;
            }
            animateScale(0.95, () => {
                pressHandler();
                animateScale(1, () => {});
            });
        });
    };

    const backgroundColor = animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: [background.defaultColor, background.activeColor],
    });
    const iconColor = animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: [icon.defaultColor, icon.activeColor],
    });

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View
                style={[
                    styles.default,
                    rounded && styles.rounded,
                    props.styles,
                    {
                        backgroundColor: backgroundColor,
                        transform: [{ scale: animatedScale }],
                    },
                ]}
            >
                <AnimatedIcon
                    name={icon.name}
                    size={icon.size || 24}
                    style={{ color: iconColor }}
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

    rounded: {
        height: 46,
        width: 46,
        borderRadius: 23,
    },
});
