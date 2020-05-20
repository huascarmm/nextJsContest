import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { connect } from 'react-redux';
import styles from './sidebar-jss';
import { SidebarContent } from '@components';

class Sidebar extends React.Component {
  state = {
    status: false,
    anchorEl: null,
    turnDarker: false
  };

  // Initial header style
  flagDarker = false;

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const { dataMenu } = this.props;
    const features = type => dataMenu
      .map(el => {
        if (el.category === type) {
          return {
            key: el.name,
            name: el.name,
            link: el.link
          };
        }
        return false;
      })
      .filter(el => el !== false);

    const menu = [
      {
        key: 'main_menu',
        name: 'Principal',
        title: true
      },
      ...features('menu'),
      {
        key: 'footer_menu',
        name: 'Presentacionales',
        title: true
      },
      ...features('footer')
    ];

    this.setState({
      dataMenuAdjusted: [
        {
          key: 'home',
          name: 'Inicio',
          icon: 'ios-home-outline',
          child: menu
        }
      ]
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    if (this.flagDarker !== newFlagDarker) {
      this.setState({ turnDarker: newFlagDarker });
      this.flagDarker = newFlagDarker;
    }
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeStatus = status => {
    this.setState({ status });
    this.handleClose();
  };

  render() {
    const {
      classes,
      open,
      toggleDrawerOpen,
      loadTransition,
      leftSidebar
    } = this.props;
    const {
      status, anchorEl, turnDarker, dataMenuAdjusted
    } = this.state;
    return (
      <Fragment>
        <Hidden lgUp>
          <SwipeableDrawer
            onClose={toggleDrawerOpen}
            onOpen={toggleDrawerOpen}
            open={!open}
            anchor={leftSidebar ? 'left' : 'right'}
          >
            <div className={classes.swipeDrawerPaper}>
              <SidebarContent
                drawerPaper
                leftSidebar={leftSidebar}
                toggleDrawerOpen={toggleDrawerOpen}
                loadTransition={loadTransition}
                dataMenu={dataMenuAdjusted}
                status={status}
                anchorEl={anchorEl}
                openMenuStatus={this.handleOpen}
                closeMenuStatus={this.handleClose}
                changeStatus={this.handleChangeStatus}
              />
            </div>
          </SwipeableDrawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            variant="permanent"
            onClose={toggleDrawerOpen}
            classes={{
              paper: classNames(
                classes.drawer,
                classes.drawerPaper,
                !open ? classes.drawerPaperClose : ''
              )
            }}
            open={open}
            anchor={leftSidebar ? 'left' : 'right'}
          >
            <SidebarContent
              drawerPaper={open}
              leftSidebar={leftSidebar}
              turnDarker={turnDarker}
              loadTransition={loadTransition}
              dataMenu={dataMenuAdjusted}
              status={status}
              anchorEl={anchorEl}
              openMenuStatus={this.handleOpen}
              closeMenuStatus={this.handleClose}
              changeStatus={this.handleChangeStatus}
            />
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  leftSidebar: PropTypes.bool,
  dataMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

Sidebar.defaultProps = {
  leftSidebar: true,
  dataMenu: {}
};

const mapStateToProps = state => ({
  dataMenu: state.getIn(['municipality', 'features'])
});

const withConnect = connect(mapStateToProps)(Sidebar);
export default withStyles(styles)(withConnect);
