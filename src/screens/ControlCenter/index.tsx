import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import ControlCenter from 'components/ControlCenter';
import Page from 'components/Page';

import { connectData } from '../../store/connectData';

export interface IControlCenterProps extends ComponentEvent {
    buttonsState: { [key: string]: boolean };
    setButtonState: (key: string) => void;
}

function Screen(props: IControlCenterProps) {
    return (
        <Page>
            <ControlCenter {...props} />
        </Page>
    );
}

export default connectData()(Screen);
