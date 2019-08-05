import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        (height === 812 || width === 812 || (height === 896 || width === 896))
    );
}
