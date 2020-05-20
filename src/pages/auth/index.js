import { Link } from 'server/router.module';
import dynamic from 'next/dynamic';
import styles from '@components/Forms/user-jss';
import { withStyles } from '@material-ui/core';
const Outer = dynamic(() => import('src/containers/Templates/Outer'))

class Auth extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Outer>
        <div className={classes.root}>
          Auth Component
          <Link route="/">
            <a>Got to User detail page</a>
          </Link>
        </div>
      </Outer>
    )
  }
}
export default withStyles(styles)(Auth);