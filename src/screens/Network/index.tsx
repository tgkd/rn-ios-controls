import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import Network from 'components/Network';
import Page from 'components/Page';

export default function Screen(props: ComponentEvent) {
    return (
        <Page>
            <Network {...props} />
        </Page>
    );
}
