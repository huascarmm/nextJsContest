/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  Grid, Button, withStyles, CircularProgress
} from '@material-ui/core';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './forms.settings-jss';

const required = value => (value == null ? 'Required' : undefined);
class PerfilSettings extends Component {
  state = {
    success: false
  }

  componentDidMount() {
    const { $success } = this.props;
    this.setState({ success: $success });
  }

  render() {
    const {
      classes,
      handleSubmit,
      // loading
    } = this.props;
    const { success } = this.state;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });
    return (
      <Fragment>
        <form onSubmit={handleSubmit} className={classes.root}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <label>Biografía</label>
              <Grid>
                <Field
                  name="biography"
                  component={TextFieldRedux}
                  multiline
                  rows={4}
                  validate={required}
                  className={classes.field}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="flex-end">
            <Grid item className={classes.wrapperButton}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={buttonClassname}
                // disabled={loading}
              >
                Guardar
              </Button>
              {/* {loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

PerfilSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  $success: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
};

const ReduxFormMapped = reduxForm({
  form: 'formEditProfile',
})(PerfilSettings);

const mapStateToProps = state => ({
  initialValues: state.getIn(['user', 'EditProfile']),
  $success: state.getIn(['user', 'success']),
  // loading: state.getIn(['user', 'loading']),
  ...state
});

const withConnect = connect(
  mapStateToProps
)(ReduxFormMapped);


export default withStyles(styles)(withConnect);
