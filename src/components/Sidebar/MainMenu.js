import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinkAdapter from '@components/LinkAdapter';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from './sidebar-jss';

// eslint-disable-next-line
class MainMenu extends React.Component {
  state = {
    dataMenuAdjusted: [],
  };

  UNSAFE_componentWillMount() {
    const { departments, dataMenu } = this.props;
    this.setDataMenu(departments, dataMenu);
  }

  UNSAFE_componentWillReceiveProps() {
    const { departments, dataMenu } = this.props;
    this.setDataMenu(departments, dataMenu);
  }

  setDataMenu(departments, dataMenu) {
    if (departments.length > 0 && dataMenu.length > 0) {
      this.setState({
        dataMenuAdjusted: [
          {
            title2: 'Inicio',
            link: '/',
            icon: 'home-outline',
            key: 'home',
          },
          ...this.features('menu', dataMenu),
          {
            key: 'others',
            name: 'Publicaciones',
            icon: 'library_books',
            child: this.features('footer', dataMenu),
          },
          {
            key: 'directions',
            name: 'Direcciones',
            icon: 'work',
            child: this.getDepartments(departments),
          },
        ],
      });
    }
  }

  getDepartments = (departments) => (departments.length === undefined
    ? []
    : departments.map((d) => ({
      key: d.municipalDepartment.id,
      title: d.municipalDepartment.name,
      link: '/inicio/direcciones/' + d.municipalDepartment.name,
      icon: d.municipalDepartment.icon,
    })));

  features = (type, dataMenu) => dataMenu
    .map((el) => {
      if (el.category === type) {
        return {
          key: el.name.toLowerCase(),
          title: el.name,
          link: el.link,
          icon: el.icon,
        };
      }
      return undefined;
    })
    .filter((el) => el !== undefined);

  getMenus = (menuArray) => {
    const { classes, openSubMenu, open } = this.props;
    return menuArray.map((item, index) => {
      if (item.child) {
        return (
          <div key={index.toString()}>
            <ListItem
              key={item.key + item.title}
              button
              className={classNames(
                classes.head,
                item.icon ? classes.iconed : '',
                open.indexOf(item.key) > -1 ? classes.opened : ''
              )}
              onClick={() => openSubMenu(item.key, item.keyParent)}
            >
              {item.icon && (
                <ListItemIcon
                  className={classes.icon}
                  style={{
                    margin: '0 auto',
                  }}
                >
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
              )}
              <ListItemText
                classes={{
                  primary: classes.primary,
                }}
                variant="inset"
                primary={item.name}
              />
              {open.indexOf(item.key) > -1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              component="div"
              className={classNames(
                classes.nolist,
                item.keyParent ? classes.child : ''
              )}
              in={open.indexOf(item.key) > -1}
              timeout="auto"
              unmountOnExit
              style={{
                marginTop: '-15px',
              }}
            >
              <List
                style={{
                  marginLeft: '10px',
                }}
                className={classes.dense}
                component="nav"
                dense
              >
                {this.getMenus(item.child, 'key')}
              </List>
            </Collapse>
          </div>
        );
      }

      if (item.title2) {
        return (
          <ListItem
            key={item.key + item.title}            
            button
            // component={LinkAdapter}
            className={classNames(
              classes.head,
              item.icon ? classes.iconed : ''
            )}
            // to={item.link}
            // key={item.key}
            style={{
              margin: '0 auto',
            }}
          >
            {item.icon && (
              <ListItemIcon className={classes.icon}>
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
            )}
            <ListItemText
              classes={{
                primary: classes.primary,
              }}
              variant="inset"
              primary={item.title2}
            />
          </ListItem>
        );
      }

      // with title
      if (item.title) {
        return (
          <ListItem
            key={item.key + item.title}
            button
            // component={LinkAdapter}
            className={classNames(
              classes.head,
              item.icon ? classes.iconed : ''
            )}
            // to={item.link}
            // key={item.key}
            style={{
              margin: '0 auto',
            }}
          >
            {item.icon && (
              <ListItemIcon className={classes.icon}>
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
            )}
            <ListItemText
              classes={{
                primary: classes.primary,
              }}
              variant="inset"
              primary={item.title}
            />
          </ListItem>
        );
      }

      // icon list with badges
      return (
        <ListItem
          key={item.key + item.title}
          button
          exact
          className={classes.nested}
          activeClassName={classes.active}
          // component={LinkAdapter}
          // to={item.link}
          onClick={() => this.handleClick()}
        >
          <ListItemText
            classes={{ primary: classes.primary }}
            inset
            primary={item.name}
            style={{
              margin: '0 auto',
            }}
          />
          {item.badge && (
            <Chip
              color="primary"
              label={item.badge}
              className={classes.badge}
            />
          )}
        </ListItem>
      );
    });
  };

  handleClick() {
    const { toggleDrawerOpen, loadTransition } = this.props;
    toggleDrawerOpen();
    loadTransition(false);
  }

  render() {
    const { dataMenuAdjusted } = this.state;
    return <div>{this.getMenus(dataMenuAdjusted)}</div>;
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  departments: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

const openAction = (key, keyParent) => ({
  type: 'OPEN_SUBMENU',
  key,
  keyParent,
});

const mapStateToProps = (state) => ({
  force: state, // force active class for sidebar menu
  open: state.getIn(['ui', 'subMenuOpen']),
  dataMenu: state.getIn(['municipality', 'features']),
  departments: state.getIn(['municipality', 'departments']),
});

const mapDispatchToProps = (dispatch) => ({
  openSubMenu: bindActionCreators(openAction, dispatch),
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withStyles(styles)(MainMenuMapped);
