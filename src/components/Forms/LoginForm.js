/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import treeChanges from 'tree-changes';

import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import LinkAdapter from '../LinkAdapter';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email'
  : undefined);

// eslint-disable-next-line
class LoginForm extends React.Component {
  state = {
    showPassword: false,
    error: false,
    message: ''
  };

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('errors')) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        error: true,
        message: errors.shift().body
      });
    }
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {
      classes, handleSubmit, pristine, submitting
    } = this.props;
    const { showPassword, error, message } = this.state;
    return (
      <Fragment>
        <Hidden mdUp>
          <LinkAdapter to="/inicio" className={classNames(classes.brand, classes.outer)}>
            {'<- '}
            Inicio
          </LinkAdapter>
        </Hidden>
        <Paper className={classes.paperWrap}>
          <Hidden smDown>
            <div className={classes.topBar}>
              <LinkAdapter to="/inicio" className={classes.brand}>
                {'<- '}
                Inicio
              </LinkAdapter>
              <Button
                size="small"
                className={classes.buttonLink}
                // component={LinkBtn}
                // to="/auth/register"
              >
                <Icon className={classes.icon}>arrow_forward</Icon>
                Crear una nueva cuenta
              </Button>
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Iniciar Sesión
          </Typography>
          {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Lorem ipsum dolor sit amet
          </Typography> */}
          {/* <section className={classes.socmedLogin}>
            <div className={classes.btnArea}>
              <Button variant="outlined" size="small" className={classes.redBtn} type="button">
                <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 1
              </Button>
              <Button variant="outlined" size="small" className={classes.blueBtn} type="button">
                <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 2
              </Button>
              <Button variant="outlined" size="small" className={classes.cyanBtn} type="button">
                <People className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 3
              </Button>
            </div>
            <ContentDivider content="Or sign in with email" />
          </section> */}
          <section className={classes.formWrap}>

            {error && <Alert severity="warning">{message}</Alert>}

            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder="Tu Correo Electronico"
                    label="Tu Correo Electronico"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type={showPassword ? 'text' : 'password'}
                    label="Tu Contraseña"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required
                    validate={required}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.optArea}>
                <FormControlLabel
                  className={classes.label}
                  control={<Field name="checkbox" component={CheckboxRedux} />}
                  label="Recuerda"
                />
                <Button
                  size="small"
                  // component={LinkAdapter}
                  // to="/reset-password"
                  className={classes.buttonLink}
                >
                  Se te olvidó tu contraseña
                </Button>
              </div>
              <div className={classes.btnArea}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Continue
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                    disabled={submitting || pristine}
                  />
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const LoginFormReduxed = reduxForm({
  form: 'LoginFromImmutable',
  enableReinitialize: true
})(LoginForm);

const reducerLogin = 'login';
const FormInit = connect(state => ({
  force: state,
  errors: state.getIn(['login', 'errors']).toJS(),
  initialValues: state.getIn([reducerLogin, 'usersLogin'])
}))(LoginFormReduxed);

export default withStyles(styles)(FormInit);
