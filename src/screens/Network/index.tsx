import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import Network from 'components/Network';
import Page from 'components/Page';

import { connectData } from '../../store/connectData';

export interface INetworkProps extends ComponentEvent {
    buttonsState: { [key: string]: boolean };
    setButtonState: (key: string) => void;
}

function Screen(props: INetworkProps) {
    return (
        <Page>
            <Network {...props} />
        </Page>
    );
}

export default connectData()(Screen);
