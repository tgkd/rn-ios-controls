import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from 'styles';

interface IAnimatedIconView {
    name: string;
    size?: number;
    disabled?: boolean;
    pressHandler: () => void;
}

export const AnimatedIcon = ({
    name,
    disabled = false,
    size = 24,
    pressHandler,
}: IAnimatedIconView) => {
    const animatedVal = useRef(new Animated.Value(1)).current;
    const animate = (toValue: number, callback?: () => void) => {
        Animated.timing(animatedVal, {
            toValue,
            duration: 150,
        }).start(callback);
    };

    const onPress = () => {
        animate(0.95, () => {
            pressHandler();
            animate(1);
        });
    };
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={{ transform: [{ scale: animatedVal }] }}>
                <Icon
                    name={name}
                    size={size}
                    color={disabled ? colors.midGray : colors.white}
                />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};
