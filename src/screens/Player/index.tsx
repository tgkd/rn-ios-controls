import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import Player from 'components/Player';
import Page from 'components/Page';

export default function Screen(props: ComponentEvent) {
    return (
        <Page>
            <Player {...props} />
        </Page>
    );
}
