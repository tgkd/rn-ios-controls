import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ScalingTouchableView } from 'components/ScalingTouchableView';
import { ToggleButton } from 'components/ToggleButton';
import { BUTTONS } from 'components/Network';

import { Screens } from 'navigation';

interface IProps {
    redirect: (route: Screens) => void;
    buttonsState: { [key: string]: boolean };
    setButtonState: (key: string) => void;
}

interface IState {
    buttonsState: {
        [key: string]: boolean;
    };
}

export class NetworkPreview extends React.Component<IProps, IState> {
    public render() {
        const { buttonsState } = this.props;

        return (
            <ScalingTouchableView
                conatinerStyles={styles.conatiner}
                route={Screens.network}
                onPress={this.goToNetworkPage}
            >
                {BUTTONS.slice(0, 4).map(b => (
                    <View key={b.name} style={styles.btnContainer}>
                        <ToggleButton
                            pressHandler={this.props.setButtonState}
                            rounded
                            icon={{ name: b.name, ...b.icon }}
                            background={b.background}
                            isActive={buttonsState[b.name]}
                        />
                    </View>
                ))}
            </ScalingTouchableView>
        );
    }

    private readonly goToNetworkPage = () => {
        this.props.redirect(Screens.network);
    };
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 125,
        width: 125,
        borderRadius: Math.round(125 + 125) / 14,
        padding: 6,
    },

    btnContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
