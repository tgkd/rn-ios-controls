import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { VerticalSlider } from 'components/Slider';
import { LockButton } from 'components/LockButton';
import { NightModeButton } from 'components/NightModeButton';
import { NetworkPreview } from 'components/NetworkPreview';
import { PlayerPreview } from 'components/PlayerPreview';
import { ScreenMirroringButton } from 'components/ScreenMirroringButton';
import { IControlCenterProps } from '../../screens/ControlCenter';

import { Screens } from 'navigation';
import { colors } from 'styles';

StatusBar.setHidden(true);

export default class ControlCenter extends React.Component<IControlCenterProps> {
    public render() {
        const { buttonsState, setButtonState } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <NetworkPreview
                            setButtonState={setButtonState}
                            buttonsState={buttonsState}
                            redirect={this.goTo}
                        />
                    </View>
                    <View style={styles.col}>
                        <PlayerPreview pressHandler={this.goTo} />
                    </View>
                </View>
                <View style={styles.verticalMargin} />
                <View style={styles.row}>
                    <View style={styles.col}>
                        <View style={styles.buttonsRow}>
                            <LockButton pressHandler={() => null} />
                            <NightModeButton pressHandler={() => null} />
                        </View>
                        <ScreenMirroringButton pressHandler={() => null} />
                    </View>

                    <View style={styles.col}>
                        <View style={styles.buttonsRow}>
                            <VerticalSlider
                                min={0}
                                max={100}
                                height={120}
                                width={58}
                                icon={'brightness'}
                                onChange={() => null}
                            />
                            <VerticalSlider
                                min={0}
                                max={100}
                                height={120}
                                width={58}
                                icon={'volume'}
                                onChange={() => null}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    private readonly goTo = (routeName: Screens) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: routeName,
                options: {
                    statusBar: { visible: false },
                    topBar: { visible: false },
                    bottomTabs: { visible: false },
                    customTransition: {
                        animations: [
                            {
                                type: 'sharedElement',
                                fromId: `${routeName}_1`,
                                toId: `${routeName}_2`,
                                springVelocity: 0.2,
                                duration: 0.3,
                                startDelay: 0,
                            },
                        ],
                        duration: 0.3,
                    },
                },
            },
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.pageBackground,
        paddingBottom: 20,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },

    col: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        maxWidth: 125,
        maxHeight: 125,
    },

    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    verticalMargin: {
        height: 6,
    },
});
