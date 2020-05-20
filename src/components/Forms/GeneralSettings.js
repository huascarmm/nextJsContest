/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import {
  Grid,
  Paper,
  Button,
  TextField,
  withStyles,
  CircularProgress,
  // Backdrop
} from '@material-ui/core';
import { actionsGeneralUpdate } from '../../actions/user/actions';
import styles from './forms.settings-jss';

class GeneralSettings extends Component {
  state = {
    user: {},
    profile: {},
    success: false
  }

  componentDidMount() {
    const {
      $user, $profile, $success
    } = this.props;
    this.setState({ user: $user, profile: $profile, success: $success });
  }

  handleChange = ({ target }) => {
    const fields = target.name.split('.');
    const { user, profile } = this.state;

    let newInstance = {};

    if (fields[0] === 'user') {
      newInstance = Object.assign(user, {
        [fields[1]]: target.value
      });
    } else if (fields[0] === 'profile') {
      newInstance = Object.assign(profile, {
        [fields[1]]: target.value
      });
    }

    this.setState({ [fields[0]]: newInstance });
  }

  handleSubmit = () => {
    const { user, profile } = this.state;
    const { updateGeneral } = this.props;
    updateGeneral(user, profile);
  }

  render() {
    const { classes } = this.props;
    const {
      user, profile, success
    } = this.state;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });
    return (
      <Fragment>
        <form className={classes.root}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} className={classes.wrapper}>
                <h2>Datos Personales</h2>
                <Grid>
                  <label>Nombre Completo</label>
                  <Grid>
                    <TextField
                      name="user.first_name"
                      value={user.first_name}
                      placeholder="Nombre"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <label>Apellidos</label>
                  <Grid>
                    <TextField
                      name="user.last_name"
                      value={user.last_name}
                      placeholder="Apellidos"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <label>Correo Electronico</label>
                  <Grid>
                    <TextField
                      name="user.email"
                      value={user.email}
                      placeholder="Correo Electronico"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <label>Carnet de identidad</label>
                  <Grid>
                    <TextField
                      name="user.identity_card"
                      value={user.identity_card}
                      placeholder="Ejemplo: 39902932 L.P."
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <label>Ciudad</label>
                  <Grid>
                    <TextField
                      name="user.city"
                      value={user.city}
                      placeholder="Ejemplo: La Paz"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <label>Region</label>
                  <Grid>
                    <TextField
                      name="user.region"
                      value={user.region}
                      placeholder="Ejemplo: Departamento de Cochabamba"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid>
                {/* <Grid>
                  <label>Fecha de Cumpleaños</label>
                  <Grid>
                    <TextField
                      name="user.birthday"
                      value={user.birthday}
                      placeholder="Ejemplo: 07 febrero 2018"
                      onChange={this.handleChange}
                      className={classes.field}
                      required
                    />
                  </Grid>
                </Grid> */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} className={classes.wrapper}>
                <h2>Datos de Perfil</h2>
                <Grid>
                  <label>Bibliografía</label>
                  <Grid>
                    <TextField
                      name="profile.biography"
                      value={profile.biography}
                      onChange={this.handleChange}
                      className={classes.field}
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="flex-end">
            <Grid item className={classes.wrapperButton}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                // disabled={loading}
                onClick={this.handleSubmit}
              >
                Guardar
              </Button>
              {/* {loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
            </Grid>
          </Grid>
        </form>
        {/* <Backdrop
          className={classes.backdrop}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </Fragment>
    );
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  $user: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  $profile: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  $success: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
  updateGeneral: PropTypes.func.isRequired
};

const ReduxFormMapped = reduxForm({
  form: 'formEditGeneral'
})(GeneralSettings);

const mapStateToProps = state => ({
  $user: state.getIn(['user', 'EditUser']),
  $profile: state.getIn(['user', 'EditProfile']),
  $success: state.getIn(['user', 'success']),
  // loading: state.getIn(['user', 'loading']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateGeneral: bindActionCreators(actionsGeneralUpdate, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormMapped);
export default withStyles(styles)(withConnect);
