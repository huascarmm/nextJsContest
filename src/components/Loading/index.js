import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  circularProgress: {
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)'
  },
  fixed: {
    position: 'fixed'
  },
  relative: {
    position: 'relative'
  },
};

function Loading(props) {
  const { classes, local, variant } = props;
  return (
    <CircularProgress
      className={classNames(
        classes.circularProgress,
        local ? classes.relative : classes.fixed
      )}
      size={variant === 'big' ? 90 : 35}
      thickness={1}
      color="secondary"
    />
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  local: PropTypes.bool,
  variant: PropTypes.string
};

Loading.defaultProps = {
  local: false,
  variant: 'big'
};
export default withStyles(styles)(Loading);
