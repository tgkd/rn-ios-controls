import React, { useState, useRef } from 'react';
import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    Slider,
} from 'react-native';
import { Navigation, ComponentEvent } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { PlayerButtons } from 'components/PlayerButtons';

import { Screens } from 'navigation';
import { colors } from 'styles';
import { isIphoneX } from 'helpers';

interface IProps extends ComponentEvent {}

export default function Player(props: IProps) {
    const [volumeVal, setVolume] = useState(20);
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

    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={goBack}>
            <Navigation.Element elementId={`${Screens.player}_2`}>
                <TouchableOpacity activeOpacity={1} style={styles.resultBlock}>
                    <Animated.View
                        style={[styles.row, styles.header, { opacity: animatedOpacity }]}
                    >
                        <Image source={{}} style={styles.songImg} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.songTitle}>iPhone</Text>
                            <Text style={styles.songName}>Music</Text>
                        </View>
                        <Icon
                            name={'ios-radio-button-off'}
                            size={46}
                            color={colors.white}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.content, { opacity: animatedOpacity }]}>
                        <View style={styles.progressBar} />
                        <PlayerButtons size={36} />
                        <View style={styles.row}>
                            <Icon
                                name={'ios-volume-low'}
                                size={30}
                                color={colors.whiteOpacity}
                            />
                            <Slider
                                style={styles.slider}
                                maximumValue={100}
                                minimumValue={0}
                                step={1}
                                value={volumeVal}
                                onValueChange={val => setVolume(val)}
                            />
                            <Icon
                                name={'ios-volume-high'}
                                size={30}
                                color={colors.whiteOpacity}
                            />
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Navigation.Element>
        </TouchableOpacity>
    );
}

const dim = Dimensions.get('window');

const height = isIphoneX() ? dim.height - 420 : dim.height - 240;
const width = dim.width - 40;
const borderRadius = Math.round((height + width) / 14);

const styles = StyleSheet.create({
    resultBlock: {
        height,
        width,
        borderRadius,
        backgroundColor: colors.opacityBackground,
    },
    container: {
        flex: 1,
        width: '100%',
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.pageBackground,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    header: {
        paddingHorizontal: 26,
        paddingVertical: 26,
        borderBottomWidth: 1,
        borderBottomColor: colors.whiteOpacity,
    },

    songImg: {
        height: 60,
        width: 60,
        backgroundColor: colors.whiteOpacity,
        borderRadius: 6,
    },

    headerTextContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },

    songName: {
        fontSize: 18,
        color: colors.white,
    },
    songTitle: {
        fontSize: 12,
        color: colors.whiteOpacity,
    },

    content: {
        flex: 1,
        paddingHorizontal: 26,
        paddingVertical: 26,
    },

    progressBar: {
        height: 3,
        backgroundColor: colors.whiteOpacity,
    },

    slider: {
        flex: 1,
        marginHorizontal: 20,
    },
});
