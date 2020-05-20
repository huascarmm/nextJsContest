/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { DAEMON } from '@utils/constants';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from '@utils/injectSaga';
import { compose } from 'recompose';
import LinkAdapter from '@components/LinkAdapter';
import Ionicon from 'react-ionicons';
import {
  Button,
  ButtonGroup,
  Avatar,
  Divider,
  MenuItem,
  Menu,
  Hidden,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userSaga from '@redux/sagas/user';
import styles from './header-jss';
import { logoutEvent, isAuthenticate } from '@actions/user/actions';
import Storage from '@utils/storage';

class UserMenu extends React.Component {
  state = {
    anchorEl: null,
    openMenu: null,
    image: '',
  };

  componentDidMount() {
    // const { userLogin, authenticate } = this.props;
    // authenticate();
    // const user = JSON.parse(JSON.stringify(userLogin));
    // this.isValidToken = Boolean(Storage.getItem('token'));
    // if (this.isValidToken) {
    //   if (Object.keys(user).length !== 0) {
    //     this.setState({ image: user.avatar.link || '' });
    //   }
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUserLogin = prevProps.userLogin;
    const prevImage = prevState.image;
    const { userLogin, avatarChange } = this.props;

    if (prevUserLogin !== userLogin) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ image: userLogin.avatar.link || '' });
    } else {
      const avatar = JSON.parse(JSON.stringify(avatarChange));
      if (Object.keys(avatar).length !== 0) {
        if (prevImage !== avatar.link) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ image: avatar.link || '' });
        }
      }
    }
  }

  handleMenu = (menu) => (event) => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = (event) => {
    if (event === 'logout') {
      const { logout } = this.props;
      logout();
    }
    this.setState({ anchorEl: null, openMenu: null });
  };

  render() {
    const { classes, userLogin, roles } = this.props;
    const { anchorEl, openMenu, image } = this.state;

    return false ? (
      <div className={classes.gate}>
        <Button onClick={this.handleMenu('user-setting')}>
          <Avatar
            alt={`${userLogin.first_name} ${userLogin.last_name}`}
            src={image}
          />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openMenu === 'user-setting'}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={this.handleClose}
            component={LinkAdapter}
            to={`/user/${userLogin.username}`}
          >
            Mi Perfil
          </MenuItem>
          <MenuItem
            onClick={this.handleClose}
            component={LinkAdapter}
            to={`/user/${userLogin.username}/settings`}
          >
            Configuraciones
          </MenuItem>
          {roles.find((rol) => rol.title.toLocaleLowerCase().match(/rrhh/)) && (
            <MenuItem
              onClick={this.handleClose}
              component={LinkAdapter}
              to={`/user/${userLogin.username}/administracion`}
            >
              Administración
            </MenuItem>
          )}
          <Divider />
          <MenuItem
            onClick={() => this.handleClose('logout')}
            component={LinkAdapter}
            to="/inicio"
          >
            Salir
          </MenuItem>
        </Menu>
      </div>
    ) : (
      <div className={classes.gate}>
        <ButtonGroup variant="text" size="large">
          <Button
            component={LinkAdapter}
            to="/auth/login"
            classes={{ label: classes.label }}
            style={{ borderColor: 'white' }}
          >
            <Hidden xsDown>Ingresar</Hidden>
            <Hidden smUp>
              <Ionicon icon="md-log-in" />
            </Hidden>
          </Button>
          <Button
            component={LinkAdapter}
            to="/auth/register"
            classes={{ label: classes.label }}
          >
            <Hidden xsDown>Registrarse</Hidden>
            <Hidden smUp>
              <Ionicon icon="md-add-circle" />
            </Hidden>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  // dark: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  userLogin: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  avatarChange: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  authenticate: PropTypes.func.isRequired,
  roles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

UserMenu.defaultProps = {
  dark: false,
};

const mapStateToProps = (state) => ({
  userLogin: state.getIn(['user', 'userLogin']),
  avatarChange: state.getIn(['user', 'avatar']),
  roles: state.getIn(['login', 'roles']),
});

const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(logoutEvent, dispatch),
  authenticate: bindActionCreators(isAuthenticate, dispatch),
});

const withSaga = injectSaga({
  key: 'UserMenu',
  saga: userSaga,
  mode: DAEMON,
});

const UserMenuConn = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStyles(styles)(
  compose(
    withSaga,
    UserMenuConn
  )(UserMenu)
);
