import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Title from './Title';
import styles from './landingStyle-jss';

class BlockTitle extends React.Component {
  render() {
    const {
      classes, slideMode, title, children
    } = this.props;
    return (
      <div
        className={classNames(classes.contact, !slideMode && classes.withBg)}
      >
        <div className={classes.container}>
          <div className={classes.contactBubble}>
            <Title title={title} align="left" nomargin />
            <div className={classes.contactText}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

BlockTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  slideMode: PropTypes.bool
};

BlockTitle.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(BlockTitle);
