import React, { Component } from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = {
  progress: {
    color: "#00acc1",
    width: "6rem !important",
    height: "6rem !important"
  },
  wrapperDiv: {
    margin: "100px auto",
    padding: "0px",
    maxWidth: "360px",
    minHeight: '-webkit-fill-available',
    textAlign: "center",
    position: "relative",
    zIndex: "9999",
    top: "0"
  },
  iconWrapper: {
    display: "flex"
  },
  title: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    color: "#FFFFFF"
  }
};

class PageChange extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.wrapperDiv}>
          <div className={classes.iconWrapper}>
            <CircularProgress className={classes.progress} />
          </div>
          <h4 className={classes.title}>
            Loading page contents for: {this.props.path}
          </h4>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PageChange);
