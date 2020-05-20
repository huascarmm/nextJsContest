import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
// import styles from './forms.settings-jss';

const styles = () => ({
  wrapper: {
    margin: '0 20px'
  }
});

class RecordSharedSettings extends Component {
  render() {
    const { classes, recordShareds } = this.props;
    console.log(recordShareds);
    return (
      <Fragment>
        <Grid className={classes.wrapper}>
            No compartio nunguna publicaciones
        </Grid>
      </Fragment>
    );
  }
}

RecordSharedSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  recordShareds: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  recordShareds: state.getIn(['user', 'listRecordsShareds']),
  ...state
});

const mapDispatchToProps = {
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordSharedSettings);

export default withStyles(styles)(withConnect);
