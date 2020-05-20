import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {MainMenu} from '@components';
import styles from './sidebar-jss';

class SidebarContent extends React.Component {
  state = {
    transform: 0
  };

  componentDidMount = () => {
    // Scroll content to top
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    const mainContent = document.getElementById('sidebar');
    mainContent.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll
    });
  };

  render() {
    const {
      classes,
      drawerPaper,
      toggleDrawerOpen,
      loadTransition,
      leftSidebar,
      isLogin
    } = this.props;

    const { transform } = this.state;

    return (
      <div
        className={classNames(
          classes.drawerInner,
          transform,
          !drawerPaper ? classes.drawerPaperClose : ''
        )}
      >
        <div
          id="sidebar"
          className={classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            isLogin && classes.withProfile
          )}
        >
          <MainMenu
            loadTransition={loadTransition}
            toggleDrawerOpen={toggleDrawerOpen}
          />
        </div>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
  isLogin: true
};
export default withStyles(styles)(SidebarContent);
