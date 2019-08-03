import React from 'react';
import {
    Animated,
    Easing,
    View,
    StyleSheet,
    PanResponder,
    StyleProp,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from 'styles';

interface IProps {
    onChange: (val: number) => void;
    width: number;
    height: number;
    min: number;
    max: number;
    containerStyles?: StyleProp<any>;
    icon?: 'brightness' | 'volume';
}

interface IState {
    value: number;
    sliderHeight: any;
    panResponder: any;
}

export class VerticalSlider extends React.Component<IProps, IState> {
    private moveStartValue: number = 0;

    constructor(props: IProps) {
        super(props);

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderTerminationRequest: () => false,
            onPanResponderGrant: () => {
                this.moveStartValue = this.state.value;
            },
            onPanResponderMove: (e, gestureState) => {
                const val = this.getNewGestureVal(gestureState);
                this.changeState(val);
                this.props.onChange(val);
            },
            onPanResponderRelease: (e, gestureState) => {
                this.changeState(this.getNewGestureVal(gestureState));
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.changeState(this.getNewGestureVal(gestureState));
            },
        });

        this.state = {
            value: 0,
            sliderHeight: new Animated.Value(0),
            panResponder,
        };
    }

    public render() {
        const { width, height, containerStyles, icon } = this.props;
        const { panResponder, sliderHeight } = this.state;
        return (
            <View style={[{ height, width }]}>
                <View
                    style={[styles.container, { height, width }, containerStyles]}
                    {...panResponder.panHandlers}
                >
                    <Animated.View
                        style={[styles.slider, { height: sliderHeight, width }]}
                    />
                    {icon ? (
                        <View style={styles.iconContainer}>{this.renderIcon()}</View>
                    ) : null}
                </View>
            </View>
        );
    }

    private readonly renderIcon = () => {
        const { icon } = this.props;
        switch (icon) {
            case 'brightness':
                return <Icon name={'ios-sunny'} size={24} color={colors.buttonDisabled} />;

            case 'volume':
                return (
                    <Icon
                        name={this.getVolIcon()}
                        size={24}
                        color={colors.buttonDisabled}
                    />
                );

            default:
                return null;
        }
    };

    private readonly getVolIcon = () => {
        const { value } = this.state;
        switch (true) {
            case value <= 0:
                return 'ios-volume-off';
            case 0 < value && value < 33:
                return 'ios-volume-low';
            case 33 <= value:
                return 'ios-volume-high';

            default:
                return 'ios-volume-high';
        }
    };

    private readonly getNewGestureVal = (gestureState: any) => {
        const { min, max, height } = this.props;
        const ratio = -gestureState.dy / height;
        let value = Math.max(min, this.moveStartValue + ratio * max - min);
        return Math.floor(value);
    };

    private readonly getSliderHeight = (value: number) => {
        const { min, max, height } = this.props;
        return ((value - min) * height) / (max - min);
    };

    private readonly changeState = (value: number) => {
        const { height } = this.props;
        const sliderHeight = this.getSliderHeight(value);
        let cursorPos = sliderHeight;
        if (cursorPos >= height) {
            cursorPos = height;
        } else if (cursorPos <= 0) {
            cursorPos = 0;
        } else {
            cursorPos = cursorPos / 2;
        }
        Animated.timing(this.state.sliderHeight, {
            toValue: sliderHeight,
            easing: Easing.linear,
            duration: 10,
        }).start(() => {
            this.setState({ value });
        });
    };
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: colors.opacityBackground,
        borderRadius: 16,
    },
    slider: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.white,
    },
    iconContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 20,
    },
});
