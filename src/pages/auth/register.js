import Head from "next/head";
import injectSaga from '@utils/injectSaga';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";
import styles from '@components/Forms/user-jss';
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import { signUp } from "../../actions/user/actions";
import Outer from 'src/containers/Templates/Outer';
import treeChanges from "tree-changes";
import { RegisterForm } from '@components';

class Register extends React.Component {
  componentDidUpdate(prevProps) {
    const { success } = this.props;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('success')) {
      if (success) {
        window.location.href = '/';
      }
    }
  }

  submitForm(values) {
    const { signup } = this.props;
    let params = {};
    if (window.location.search) {
      if (
        window.location.search.length > 0
        || window.location.search !== undefined
      ) {
        const query = window.location.search.substring(
          1,
          window.location.search.length
        );
        params = JSON.parse(decodeURIComponent(query));
      }
    }
    setTimeout(() => {
      // this.setState({ valueForm: values });
      const user = JSON.parse(JSON.stringify(values));
      delete user.passwordConfirm;
      delete user.checkbox;
      signup(user, params);
    }, 500);
  }

  render() {
    const title = ' - Register';
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
              <RegisterForm onSubmit={values => this.submitForm(values)} />
            </div>
          </div>
        </div>
      </Outer>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired
};

const reducer = 'login';
const mapStateToProps = state => ({
  currentUser: state.getIn([reducer, 'currentUser']),
  success: state.getIn([reducer, 'successful']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(signUp, dispatch)
});

// const withSaga = injectSaga({
//   key: 'AuthRegister',
//   saga: userAuthRegisterSaga
// });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withStyles(styles)(compose(
  // withSaga,
  withConnect
)(Register));