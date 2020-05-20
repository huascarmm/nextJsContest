/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Button, withStyles, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { TextFieldRedux } from './ReduxFormMUI';
import { actionsUserUpdateById } from '../../actions/user/actions';
import styles from './forms.settings-jss';

const required = value => (value == null ? 'Required' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email'
  : undefined);

class UserSettings extends React.Component {
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
          <div>
            <label>Nombre Completo</label>
            <div>
              <Field
                name="first_name"
                component={TextFieldRedux}
                placeholder="Nombre"
                validate={[required]}
                className={classes.field}
                required
              />
            </div>
          </div>
          <div>
            <label>Apellidos</label>
            <div>
              <Field
                name="last_name"
                component={TextFieldRedux}
                placeholder="Apellidos"
                validate={[required]}
                className={classes.field}
                required
              />
            </div>
          </div>
          <div>
            <label>Correo Electronico</label>
            <div>
              <Field
                name="email"
                component={TextFieldRedux}
                placeholder="Correo Electronico"
                validate={[required, email]}
                className={classes.field}
                required
              />
            </div>
          </div>
          <div>
            <label>Carnet de identidad</label>
            <div>
              <Field
                name="identity_card"
                component={TextFieldRedux}
                placeholder="Ejemplo: 39902932 L.P."
                validate={[required]}
                className={classes.field}
                required
              />
            </div>
          </div>
          <div>
            <label>Ciudad</label>
            <div>
              <Field
                name="city"
                component={TextFieldRedux}
                placeholder="Ejemplo: La Paz"
                validate={[required]}
                className={classes.field}
                required
              />
            </div>
          </div>
          <div>
            <label>Region</label>
            <div>
              <Field
                name="region"
                component={TextFieldRedux}
                placeholder="Ejemplo: Departamento de Cochabamba"
                validate={[required]}
                className={classes.field}
                required
              />
            </div>
          </div>
          {/* <div>
            <label>Fecha de Cumpleaños</label>
            <div>
              <Field
                name="birthday"
                component={DatePickerRedux}
                disableFuture
                formatToPicker="dd MMMM yyyy"
                views={['year', 'month', 'date']}
                openTo="year"
                className={classes.field}
                placeholder="Ejemplo: 07 febrero 2018"
                validate={[required]}
                required
              />
            </div>
          </div> */}
          <div className={classes.wrapperButton}>
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
          </div>
        </form>
      </Fragment>
    );
  }
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  $success: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
};

const ReduxFormMapped = reduxForm({
  form: 'formEditUser', // a u nique identifier for this form
  enableReinitialize: true
});

// const withSaga = injectSaga({
//   key: 'UserEdit',
//   saga: userSaga,
// });

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(actionsUserUpdateById, dispatch)
});

const withConnect = connect(
  state => ({
    force: state,
    initialValues: state.getIn(['user', 'EditUser']),
    $success: state.getIn(['user', 'success']),
    // loading: state.getIn(['user', 'loading']),
  }),
  mapDispatchToProps
);
export default withStyles(styles)(compose(
  withConnect,
  ReduxFormMapped
)(UserSettings));
