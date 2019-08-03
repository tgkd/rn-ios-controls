import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, StyleProp } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Screens } from 'navigation';
import { colors } from 'styles';

interface ITouchableProps {
    conatinerStyles?: StyleProp<any>;
    route?: Screens;
    onPress: () => void;
    children: React.ReactNode;
}

export const ScalingTouchableView = (props: ITouchableProps) => {
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const animatedScale = useRef(new Animated.Value(1)).current;

    const animate = (
        newScaleVal: number,
        newOpacityVal: number,
        callback?: () => void,
        duration?: number
    ) => {
        Animated.parallel([
            Animated.timing(animatedScale, {
                toValue: newScaleVal,
                duration: duration || 100,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: newOpacityVal,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(callback);
    };

    const onPressIn = () => {
        animate(0.95, 0);
    };

    const onPressOut = () => {
        animate(1, 1);
    };

    const onLongPress = () => {
        animate(
            0.95,
            0,
            () => {
                props.onPress();
                animate(1, 1, () => {}, 50);
            },
            50
        );
    };

    const renderView = () => (
        <Animated.View
            style={[
                props.conatinerStyles,
                styles.touchableView,
                {
                    transform: [{ scale: animatedScale }],
                },
            ]}
        >
            <Animated.View style={[styles.childContainer, { opacity: animatedOpacity }]}>
                {props.children}
            </Animated.View>
        </Animated.View>
    );

    return (
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={onLongPress}
        >
            {props.route ? (
                <Navigation.Element elementId={`${props.route}_1`}>
                    {renderView()}
                </Navigation.Element>
            ) : (
                renderView()
            )}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    touchableView: {
        backgroundColor: colors.opacityBackground,
    },
    childContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});
