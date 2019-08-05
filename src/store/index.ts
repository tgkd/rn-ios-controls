import { createStore, combineReducers } from 'redux';
import reducer from './buttonsStore/reducer';

const rootReducer = combineReducers({
    buttons: reducer,
});

export const initStore = () => createStore(rootReducer);
