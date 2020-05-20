import { green } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    margin: '0 20px'
  },
  wrapper: {
    padding: '25px'
  },
  field: {
    width: '100%'
  },
  wrapperButton: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

export default styles;
