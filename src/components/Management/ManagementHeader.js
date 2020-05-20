import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './email-jss';

class ManagementHeader extends React.Component {
  render() {
    const {
      classes,
      header,
      handleDrawerToggle
    } = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerToggle()}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="textSecondary">
            {header && header.name}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

ManagementHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  // search: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(ManagementHeader);
