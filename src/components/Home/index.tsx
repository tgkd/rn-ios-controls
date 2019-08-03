import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation, ComponentEvent } from 'react-native-navigation';

import { Screens, pushToControlCenter } from 'navigation';

interface IProps extends ComponentEvent {}

export default class Home extends React.Component<IProps> {
    public render() {
        return (
            <View style={styles.container}>
                <Text>home</Text>
                <TouchableOpacity onPress={this.showControlCenter}>
                    <Text>show controlls</Text>
                </TouchableOpacity>
            </View>
        );
    }

    private readonly showControlCenter = () => {
        pushToControlCenter();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f51b5',
    },
});
