import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import injectSaga from 'utils/injectSaga';
import loginSaga from '@redux/sagas/login';
import styles from './forms.settings-jss';
import { urlBase } from '../../api/apiRest/primary';
import { getRecords } from '../../actions/login/constants';

const style = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  ...styles
});

class RecordSigninSettings extends Component {
  state = {
    linkAvatar: '',
  }

  componentWillMount() {
    const { avatar, listRecordsLogin } = this.props;
    listRecordsLogin();
    let linkAvatar = '';
    if (Object.keys(avatar).length !== 0) {
      linkAvatar = [
        urlBase,
        'file-storages',
        avatar.container,
        'download',
        avatar.name
      ].join('/');
    }
    this.setState({ linkAvatar });
  }

  render() {
    const { classes, recordSignins, avatar } = this.props;
    console.log(recordSignins);
    const { linkAvatar } = this.state;
    return (
      <Fragment>
        <Grid className={classes.wrapper}>
          <Paper elevation={3}>
            <List className={classes.root}>
              {recordSignins.length !== 0 && recordSignins.map(record => (
                <Fragment>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt={`${avatar.alt} avatar`} src={linkAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${record.city} - ${record.region}`}
                      secondary={(
                        <Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {record.ip_address}
                          </Typography>
                          {` - ${(new Date(record.created)).toUTCString()}`}
                        </Fragment>
                      )}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}

RecordSigninSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  recordSignins: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  avatar: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  listRecordsLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  recordSignins: state.getIn(['login', 'records']),
  avatar: state.getIn(['user', 'avatar']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  listRecordsLogin: bindActionCreators(getRecords, dispatch),
});

const withSaga = injectSaga({
  key: 'RecordSigninSettings',
  saga: loginSaga,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withStyles(style)(
  compose(
    withSaga,
    withConnect
  )(RecordSigninSettings)
);
