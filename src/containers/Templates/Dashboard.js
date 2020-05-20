import React from 'react';
import { PropTypes } from 'prop-types';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { GuideSlider } from '@components';
import {
  toggleAction,
  openAction,
  playTransitionAction,
} from '@actions/UiActions';
import { DAEMON } from '@utils/constants';
import { withStyles } from '@material-ui/core/styles';
import {
  getFeaturesAction,
  getDepartmentsAction,
} from '@actions/MunicipalityDataActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSaga from '@utils/injectSaga';
import { compose } from 'recompose';
import treeChanges from 'tree-changes';
import RightSidebarLayout from './layouts/RightSidebarLayout';
// const RightSidebarLayout = dynamic(() => import('./layouts/RightSidebarLayout'))
import municipalitySaga from '@redux/sagas/municipality';
import styles from './appStyles-jss';
import { setMunicipalityAction } from '../../actions/MunicipalityDataActions';
// import { isAuthenticate } from '../../actions/user/actions';
import { withRouter } from 'next/router'

class Dashboard extends React.Component {
  state = {
    openGuide: false,
  };

  componentDidUpdate(prevProps) {
    const { getFeatures, getDepartments, municipalityId } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('municipalityId')) {
      console.log('Obteniendo datos')
      getFeatures(municipalityId);
      getDepartments(municipalityId);
    }
  }

  componentDidMount = () => {
    const {
      router,
      initialOpen,
      loadTransition,
      municipalityId,
      getFeatures,
      getDepartments,
      setMunicipality
      // authenticate
    } = this.props;

    setMunicipality()
    // authenticate();
    // Set expanded sidebar menu
    const currentPath = router.pathname;
    initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // Execute all arguments when page changes
    router.beforePopState(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });
  };

  handleOpenGuide = () => {
    this.setState({ openGuide: true });
  };

  handleCloseGuide = () => {
    this.setState({ openGuide: false });
  };

  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      router,
      gradient,
      deco,
      bgPosition,
      layout,
      changeMode,
    } = this.props;
    const { openGuide } = this.state;
    const titleException = [
      '/app',
      '/app/crm-dashboard',
      '/app/crypto-dashboard',
    ];
    const parts = router.pathname.split('/');
    const place = parts[parts.length - 1].replace('-', ' ');
    return (
      <div
        className={classNames(
          classes.appFrameInner,
          layout === 'top-navigation' || layout === 'mega-menu'
            ? classes.topNav
            : classes.sideNav,
          mode === 'dark' ? 'dark-mode' : 'light-mode'
        )}
      >
        <GuideSlider openGuide={openGuide} closeGuide={this.handleCloseGuide} />
        <RightSidebarLayout
          // history={history}
          toggleDrawer={toggleDrawer}
          loadTransition={loadTransition}
          changeMode={changeMode}
          sidebarOpen={sidebarOpen}
          pageLoaded={pageLoaded}
          mode={mode}
          gradient={gradient}
          deco={deco}
          bgPosition={bgPosition}
          place={place}
          titleException={titleException}
          handleOpenGuide={this.handleOpenGuide}
        >
          {children}
        </RightSidebarLayout>
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  municipalityId: PropTypes.string.isRequired,
  getFeatures: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  // authenticate: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = (state) => ({
  sidebarOpen: state.getIn([reducer, 'sidebarOpen']),
  pageLoaded: state.getIn([reducer, 'pageLoaded']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  deco: state.getIn([reducer, 'decoration']),
  layout: state.getIn([reducer, 'layout']),
  bgPosition: state.getIn([reducer, 'bgPosition']),
  municipalityId: state.getIn(['municipality', 'municipalityId']),
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
  getFeatures: bindActionCreators(getFeaturesAction, dispatch),
  getDepartments: bindActionCreators(getDepartmentsAction, dispatch),
  setMunicipality: bindActionCreators(setMunicipalityAction, dispatch)
  // authenticate: bindActionCreators(isAuthenticate, dispatch)
});

const withSaga = injectSaga({
  key: 'LandingPage',
  saga: municipalitySaga,
  mode: DAEMON,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withRouter(
  withStyles(styles)(
    compose(
      withSaga,
      withConnect
    )(Dashboard)
  )
);
