import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = () => ({
  root: {
    position: 'relative',
    width: '100%',
    padding: '20px 0',
    height: '100%'
  },
  centered: {
    position: 'absolute',
    top: 'calc(50% - 16px)',
    left: 'calc(50% - 96px)',
  }
});

function NoData(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.centered}>Sin datos todavía</Typography>
    </div>
  );
}

NoData.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NoData);
