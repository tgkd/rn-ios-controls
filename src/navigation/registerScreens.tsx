import { Navigation } from 'react-native-navigation';
import React from 'react';

import HomeScreen from 'screens/Home';
import PlayerScreen from 'screens/Player';
import ControlCenterScreen from 'screens/ControlCenter';
import NetworkScreen from 'screens/Network';
import { AppStoreProvider } from '../store/Provider';

import { Screens } from './Navigation';

function WrappedComponent(Component: any) {
    return function inject(props: any) {
        const EnhancedComponent = () => (
            <AppStoreProvider>
                <Component {...props} />
            </AppStoreProvider>
        );

        return <EnhancedComponent />;
    };
}

export function registerScreens() {
    Navigation.registerComponent(Screens.home, () => HomeScreen);
    Navigation.registerComponent(Screens.controlCenter, () =>
        WrappedComponent(ControlCenterScreen)
    );
    Navigation.registerComponent(Screens.player, () => WrappedComponent(PlayerScreen));
    Navigation.registerComponent(Screens.network, () => WrappedComponent(NetworkScreen));
}
