import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {State} from "../../reducer";
import {pushHistory} from "../login/loginActions";
import {openSideDialog} from "../sideDialog/sideDialogActions";
import {clearSideNavigation, closeSideNavigation, setSideNavigation} from "../navigationSide/sideNavigationActions";
import Encyclopedia from "./encyclopedia";
import {EncyclopediaEntry} from "./encyclopediaReducer";

interface OwnContainerProps {
}

interface MapStateToProps {

    entries: EncyclopediaEntry[],
    activeEntry: number,
}

const mapStateToProps = (state: State, ownProps: OwnContainerProps): MapStateToProps => {
    return {

        entries: state.encyclopedia.entries,
        activeEntry: state.encyclopedia.activeEntry,
    }
};


interface MapDispatchToProps {
    pushHistory: typeof pushHistory,
    setSideNavigation: typeof setSideNavigation,
    openSideDialog: typeof openSideDialog,

    clearSideNavigation: typeof clearSideNavigation,
    closeSideNavigation: typeof closeSideNavigation,
}

const mapDispatchToProps = (dispatch: any, ownProps: OwnContainerProps): MapDispatchToProps => {
    return bindActionCreators({
        pushHistory,
        openSideDialog,
        setSideNavigation,
        clearSideNavigation,
        closeSideNavigation,
    }, dispatch)
};


export const EncyclopediaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Encyclopedia);
