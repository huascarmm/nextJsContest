import Head from "next/head";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";
import { bindActionCreators } from 'redux';
import { LoginForm } from '@components';
import styles from '@components/Forms/user-jss';
import { connect } from "react-redux";
import { compose } from "recompose";
import { loginRequest } from "@actions/user/actions";
import Outer from 'src/containers/Templates/Outer';

class Login extends React.Component {
  submitForm(values) {
    const { signin } = this.props;
    signin(values);
  }

  render() {
    const title = ' - Login';
    const description = 'brand.desc';
    const { classes } = this.props;
    return (
      <Outer>
        <div className={classes.root}>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Head>
          <div className={classes.container}>
            <div className={classes.userFormWrap}>
              <LoginForm onSubmit={values => this.submitForm(values)} />
            </div>
          </div>
        </div>
      </Outer>
    )
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  signin: bindActionCreators(loginRequest, dispatch)
});

const withConnect = connect(
  mapDispatchToProps
);
export default withStyles(styles)(compose(
  withConnect
)(Login));