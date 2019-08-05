const initState: { [key: string]: boolean } = {
    'ios-link': false,
    'ios-radio': false,
    'ios-bluetooth': false,
    'ios-wifi': false,
    'ios-cellular': false,
    'ios-airplane': false,
};

export default function(state = initState, action: { type: string; btnId: string }) {
    switch (action.type) {
        case 'SET_BUTTON_STATE':
            return {
                ...state,
                [action.btnId]: !state[action.btnId],
            };

        default:
            return state;
    }
}
