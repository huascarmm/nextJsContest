import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  withStyles,
  Grid,
  Typography,
  List,
  ListItem,
  Icon,
  Button,
  CircularProgress,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { Info } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Ionicon from 'react-ionicons';
import ListItemText from '@material-ui/core/ListItemText';
import { reduxForm, FieldArray, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import FormChannel from './component-helps/FormChannel';
import styles from './forms.settings-jss';

const selector = formValueSelector('formChannels');

const style = theme => ({
  wrap: {
    // padding: '10px'
  },
  content: {
    // height: '100px',
    padding: '10px 20px 5px',
    // width: 'calc(100% - 20%)'
  },
  center: {
    alignSelf: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  ...styles
});

const listNetworks = [{
  title: 'Facebook',
  factory: 'ionic',
  type: 'facebook',
  icon: 'logo-facebook',
}, {
  title: 'Google',
  factory: 'ionic',
  type: 'google',
  icon: 'logo-google'
}, {
  title: 'Linkedin',
  factory: 'ionic',
  type: 'linkedin',
  icon: 'logo-linkedin'
}, {
  title: 'Twitter',
  factory: 'ionic',
  type: 'twitter',
  icon: 'logo-twitter'
}, {
  title: 'Snapchat',
  factory: 'ionic',
  type: 'snapchat',
  icon: 'logo-snapchat'
}, {
  title: 'Instagram',
  factory: 'ionic',
  type: 'instagram',
  icon: 'logo-instagram'
}];

const listContactsInfo = [{
  title: 'Whatsapp',
  factory: 'ionic',
  type: 'whatsapp',
  icon: 'logo-whatsapp'
}, {
  title: 'Telefono',
  type: 'phone',
  icon: 'phone'
}, {
  title: 'Celular',
  type: 'mobile',
  icon: 'smartphone'
}];

const contactsOption = [{
  title: 'Casa',
  type: 'casa',
  icon: 'home'
}, {
  title: 'Oficina',
  type: 'oficina',
  icon: 'store'
}, {
  title: 'Trabajo',
  type: 'trabajo',
  icon: 'work'
}];

const getIconFactory = (channel, factory = '') => {
  const list = listNetworks.concat(listContactsInfo);
  let iconFactory = list.find(obj => obj.type === channel.type);
  if (factory.length > 0) {
    iconFactory = contactsOption.find(obj => obj.type === channel.description);
  }
  return iconFactory.factory !== 'ionic'
    ? <Icon color="primary" style={{ fontSize: 18 }}>{iconFactory.icon}</Icon>
    : <Ionicon color="#009688" icon={iconFactory.icon} />;
};

const ListItemChannel = (listChannels, des) => (
  <List component="nav" aria-label="main mailbox folders">
    {listChannels && listChannels.map(channel => (
      <ListItem key={channel.id}>
        <ListItemIcon>
          {getIconFactory(channel)}
        </ListItemIcon>
        <ListItemText>
          {channel.description.length > 0 && getIconFactory(channel, channel.description)}
          {channel.content}
        </ListItemText>
        {/* <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
    ))}
    {!listChannels && (
      <Typography component="h6" style={{ opacity: '0.5' }}>
        <Info />
        {des}
      </Typography>
    )}
  </List>
);

class SecialNetworkSettings extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      contacts,
      socialNetworks,
      listSocialNetworks,
      listContacts,
      // loading
    } = this.props;
    const _listContacts = JSON.parse(JSON.stringify(listContacts));
    const _listSocialNetworks = JSON.parse(JSON.stringify(listSocialNetworks));
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Grid className={classes.wrap} container spacing={3}>
            <Grid item xs={10} md={6}>
              <Paper elevation={3} className={classes.content}>
                <FieldArray
                  name="socialNetworks"
                  title="Redes Sociales"
                  component={FormChannel}
                  placeholder="Usuario"
                  listChannel={listNetworks}
                />
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    {ListItemChannel(socialNetworks, 'Agregar Redes Sociales')}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={10} md={6}>
              <Paper elevation={3} className={classes.content}>
                <Typography>Tus Redes Sociales</Typography>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    {ListItemChannel(_listSocialNetworks, 'No Tienes Redes Sociales')}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid className={classes.wrap} container spacing={3}>
            <Grid item xs={10} md={6}>
              <Paper elevation={3} className={classes.content}>
                <FieldArray
                  name="contacts"
                  title="Contactos"
                  component={FormChannel}
                  placeholder="Número"
                  list
                  listChannel={listContactsInfo}
                  listOptions={contactsOption}
                />
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    {ListItemChannel(contacts, 'Agregar Contactos')}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={10} md={6}>
              <Paper elevation={3} className={classes.content}>
                <Typography>Tus Contactos</Typography>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    {ListItemChannel(_listContacts, 'No Tiene Contactos')}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.content}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
          {/* <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop> */}
        </form>
      </Fragment>
    );
  }
}
SecialNetworkSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  socialNetworks: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  listContacts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  listSocialNetworks: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // loading: PropTypes.bool.isRequired
};

SecialNetworkSettings.defaultProps = {
  contacts: [],
  socialNetworks: [],
  listContacts: [],
  listSocialNetworks: [],
};

const ReduxFormMapped = reduxForm({
  form: 'formChannels',
});

const mapStateToProps = state => ({
  force: state,
  initialValues: state.getIn(['user', 'channels']),
  // loading: state.getIn(['user', 'loading']),
  contacts: selector(state, 'contacts'),
  socialNetworks: selector(state, 'socialNetworks'),
  listContacts: selector(state, 'listContacts'),
  listSocialNetworks: selector(state, 'listSocialNetworks')
});

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps
);

export default withStyles(style)(
  compose(
    withConnect,
    ReduxFormMapped
  )(SecialNetworkSettings)
);
