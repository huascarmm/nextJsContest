import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Icon,
  Hidden,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  containerButton: {
    margin: '0 5px',
    boxShadow: theme.shadows[3],
    borderRadius: theme.rounded.medium,
    overflow: 'hidden',
    padding: '30px 20px',
    position: 'relative',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main
  },
  iconBg: {
    color: theme.palette.common.white,
    opacity: 0.25,
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 96
  },
  carouselDesc: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(3)
  },

  buttonReadMore: {
    borderColor: '#FFF',
    color: '#FFF',
    marginTop: theme.spacing(1)
  }
});

class ButtonCard extends Component {
  render() {
    const {
      classes, icon, desc, action, link
    } = this.props;
    return (
      <div className={classes.containerButton}>
        <Icon className={classes.iconBg}>{icon}</Icon>
        <Hidden smDown>
          <Typography className={classes.carouselDesc}>{desc}</Typography>
        </Hidden>
        <Button
          variant="outlined"
          size="large"
          className={classes.buttonReadMore}
          // component={Link}
          // to={link}
        >
          {action}
        </Button>
      </div>
    );
  }
}

ButtonCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  desc: PropTypes.string
};
ButtonCard.defaultProps = {
  desc: ''
};

export default withStyles(styles)(ButtonCard);
