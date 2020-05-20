/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
// import { LinkAdapter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import Alert from '@material-ui/lab/Alert';
import treeChanges from 'tree-changes';
import People from '@material-ui/icons/People';
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

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};
// eslint-disable-next-line
class RegisterForm extends React.Component {
  state = {
    tab: 0,
    error: false,
    message: ''
  };

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('errors')) {
      console.log(errors);
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

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const {
      classes, handleSubmit, pristine, submitting, deco
    } = this.props;
    const { tab, error, message } = this.state;
    return (
      <Fragment>
        <Hidden mdUp>
          <LinkAdapter to="/inicio" className={classNames(classes.brand, classes.outer)}>
            {'<- '}
            Inicio
          </LinkAdapter>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Hidden smDown>
            <div className={classes.topBar}>
              <LinkAdapter to="/inicio" className={classes.brand}>
                {'<- '}
                Inicio
              </LinkAdapter>
              <Button
                size="small"
                className={classes.buttonLink}
                component={LinkAdapter}
                to="/auth/login"
              >
                <Icon className={classes.icon}>arrow_forward</Icon>
                Ya tienes cuenta?
              </Button>
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Registro
          </Typography>

          {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Lorem ipsum dolor sit amet
          </Typography> */}
          {/* <Tabs
            value={tab}
            onChange={this.handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            className={classes.tab}
          >
            <Tab label="With Email" />
            <Tab label="With Social Media" />
          </Tabs> */}
          {tab === 0 && (
            <section className={classes.formWrap}>

              {error && <Alert severity="warning">{message}</Alert>}

              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="first_name"
                      component={TextFieldRedux}
                      placeholder="Nombres"
                      label="Nombres"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="last_name"
                      component={TextFieldRedux}
                      placeholder="Apellido Completo"
                      label="Apellido Completo"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                </div>
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
                      type="password"
                      label="Tu Contraseña"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="passwordConfirm"
                      component={TextFieldRedux}
                      type="password"
                      label="Confirmar Contraseña"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControlLabel
                    control={(
                      <Field
                        name="checkbox"
                        component={CheckboxRedux}
                        required
                        className={classes.agree}
                      />
                    )}
                    label="De Acuerdo "
                  />
                  {/* <a href="#" className={classes.link}>
                    Terminos &amp; Condiciones
                  </a> */}
                </div>
                <div className={classes.btnArea}>
                  <Button variant="contained" color="primary" type="submit">
                    Registrar
                    <ArrowForward
                      className={classNames(
                        classes.rightIcon,
                        classes.iconSmall
                      )}
                      disabled={submitting || pristine}
                    />
                  </Button>
                </div>
              </form>
            </section>
          )}
          {tab === 1 && (
            <section className={classes.socmedFull}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                className={classes.redBtn}
                type="button"
              >
                <AllInclusive
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Socmed 1
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                className={classes.blueBtn}
                type="button"
              >
                <Brightness5
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Socmed 2
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                className={classes.cyanBtn}
                type="button"
              >
                <People
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Socmed 3
              </Button>
            </section>
          )}
        </Paper>
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const RegisterFormReduxed = reduxForm({
  form: 'RegisterFormImmutable'
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(state => ({
  force: state,
  errors: state.getIn(['login', 'errors']).toJS(),
  deco: state.getIn([reducer, 'decoration'])
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
