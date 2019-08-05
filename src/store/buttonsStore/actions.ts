export function setButtonState(btnId: string) {
    return {
        type: 'SET_BUTTON_STATE',
        btnId,
    };
}