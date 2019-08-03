import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import Home from 'components/Home';
import Page from 'components/Page';

export default function Screen(props: ComponentEvent) {
    return (
        <Page>
            <Home {...props} />
        </Page>
    );
}
