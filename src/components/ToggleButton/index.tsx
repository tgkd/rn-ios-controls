import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    pressHandler: (name: string) => void;
    styles?: StyleProp<any>;
    isActive: boolean;
}

export class ToggleButton extends React.Component<IToggleProps> {
    private animatedColor: any;

    private readonly animatedScale = new Animated.Value(1);

    public render() {
        const {
            icon,
            background = {
                defaultColor: colors.opacityBackground,
                activeColor: colors.white,
            },
            rounded,
            ...props
        } = this.props;
        this.animatedColor = new Animated.Value(Number(this.props.isActive));
        const AnimatedIcon = Animated.createAnimatedComponent(Icon);

        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <Animated.View
                    style={[
                        styles.default,
                        rounded && styles.rounded,
                        props.styles,
                        {
                            backgroundColor: this.animatedColor.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                    background.defaultColor,
                                    background.activeColor,
                                ],
                            }),
                            transform: [{ scale: this.animatedScale }],
                        },
                    ]}
                >
                    <AnimatedIcon
                        name={icon.name}
                        size={icon.size || 24}
                        style={{
                            color: this.animatedColor.interpolate({
                                inputRange: [0, 1],
                                outputRange: [icon.defaultColor, icon.activeColor],
                            }),
                        }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    private readonly animateScale = (toValue: number, callback?: () => void) => {
        Animated.timing(this.animatedScale, {
            toValue,
            duration: 100,
        }).start(callback);
    };

    private readonly onPress = () => {
        const { rounded, pressHandler } = this.props;

        Animated.timing(this.animatedColor, {
            duration: this.props.rounded ? 150 : 50,
            toValue: Number(!this.props.isActive),
            easing: Easing.ease,
        }).start(() => {
            if (rounded) {
                pressHandler(this.props.icon.name);
                return;
            }
            this.animateScale(0.95, () => {
                pressHandler(this.props.icon.name);
                this.animateScale(1, () => {});
            });
        });
    };
}

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
