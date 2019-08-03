import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';

export enum Screens {
    home = 'navigation.Home',
    controlCenter = 'navigation.ControlCenter',
    player = 'navigation.Player',
    network = 'navigation.Networking',
}

export function goToHomeScreen() {
    Navigation.setRoot({
        root: {
            component: {
                id: 'Home',
                name: Screens.home,
                options: {
                    topBar: {
                        visible: false,
                    },
                    bottomTabs: {
                        visible: false,
                    },
                },
            },
        },
    });
}

export function initApp() {
    Navigation.events().registerAppLaunchedListener(() => {
        pushToControlCenter();
    });
}

// TODO show stack as transparent modal
export function pushToControlCenter() {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'ControlCenter',
                children: [
                    {
                        component: {
                            name: Screens.controlCenter,
                            options: {
                                statusBar: { visible: false },
                                bottomTabs: { visible: false },
                                topBar: { visible: false },
                                modalPresentationStyle:
                                    OptionsModalPresentationStyle.overCurrentContext,
                                layout: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                    componentBackgroundColor: 'rgba(0, 0, 0, 0.45)',
                                },
                            },
                        },
                    },
                ],
            },
        },
    });
}
