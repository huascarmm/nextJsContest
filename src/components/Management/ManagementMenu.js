import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import styles from './email-jss';

class ManagementMenu extends React.Component {
  gotoPage = (page) => {
    const { goto, onClose } = this.props;
    goto(page);
    onClose();
  };

  render() {
    const {
      classes,
      menu,
      selected,
    } = this.props;
    return (
      <Fragment>
        <List>
          {menu.toJSON().map(sidebar => (
            <ListItem button key={sidebar.key} className={selected === sidebar.key ? classes.selected : ''} onClick={() => this.gotoPage(sidebar.key)}>
              <ListItemIcon>
                <Icon>{sidebar.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={sidebar.name} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider} />
      </Fragment>
    );
  }
}

ManagementMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  goto: PropTypes.func.isRequired,
  menu: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onClose: PropTypes.func,
  selected: PropTypes.string.isRequired,
};

ManagementMenu.defaultProps = {
  onClose: () => { }
};

export default withStyles(styles)(ManagementMenu);
