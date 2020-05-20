import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  ButtonBase,
  Paper,
  Icon,
  Typography,
  withStyles,
  Hidden
} from '@material-ui/core';
import styles from './button-jss';

function BigIconButton(props) {
  const { handleClick, item, classes } = props;

  return (
    <Paper className={classes.root}>
      <ButtonBase
        onClick={() => handleClick({ subCategory: item.id })}
        className={classes.buttonBase}
      >
        <Hidden xsDown>
          <Icon className={classNames(classes.icon, classes.color)}>
            {item.icon}
          </Icon>
        </Hidden>
        <div className={classes.textContent}>
          <Typography variant="h5" className={classes.color}>
            {item.title}
          </Typography>
          <div className={classes.description}>{item.description}</div>
        </div>
      </ButtonBase>
    </Paper>
  );
}

BigIconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BigIconButton);
