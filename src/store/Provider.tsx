import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { initStore } from './index';

let store: any;

export class AppStoreProvider extends PureComponent {
    getChildContext() {
        return {
            store,
        };
    }

    static childContextTypes = {
        store: PropTypes.shape({}),
    };

    render() {
        const { children } = this.props;

        store = store || initStore();

        return <Provider store={store}>{children}</Provider>;
    }
}
