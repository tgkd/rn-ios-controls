import React from 'react';
import { ComponentEvent } from 'react-native-navigation';

import ControlCenter from 'components/ControlCenter';
import Page from 'components/Page';

export default function Screen(props: ComponentEvent) {
    return (
        <Page>
            <ControlCenter {...props} />
        </Page>
    );
}
