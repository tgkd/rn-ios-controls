import { Navigation } from 'react-native-navigation';

import HomeScreen from 'screens/Home';
import PlayerScreen from 'screens/Player';
import ControlCenterScreen from 'screens/ControlCenter';
import NetworkScreen from 'screens/Network';

import { Screens } from './Navigation';

export function registerScreens() {
    Navigation.registerComponent(Screens.home, () => HomeScreen);
    Navigation.registerComponent(Screens.controlCenter, () => ControlCenterScreen);
    Navigation.registerComponent(Screens.player, () => PlayerScreen);
    Navigation.registerComponent(Screens.network, () => NetworkScreen);
}
