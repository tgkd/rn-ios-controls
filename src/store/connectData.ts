import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setButtonState } from './buttonsStore/actions';

function mapStateToProps({ buttons }: any) {
    return {
        buttonsState: buttons,
    };
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setButtonState }, dispatch);

export function connectData(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps,
        mapDispatchToProps
    );
}
