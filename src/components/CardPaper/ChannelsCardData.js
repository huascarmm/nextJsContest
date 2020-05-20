import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LocationOn from '@material-ui/icons/LocationOn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import styles from './cardStyle-jss';
import {PapperBlock} from '@components';

class ChannelsCardData extends React.Component {
  render() {
    const {
      classes,
      title,
      description,
      whatsapp,
      email,
      phone,
      cellphone,
      address
    } = this.props;
    return (
      <div>
        <PapperBlock
          overflowX
          title={title}
          icon="ios-phone-portrait"
          desc={description}
        >
          {phone.length > 0 ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <LocalPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Teléfonos" secondary={phone.join(', ')} />
            </ListItem>
          ) : (
            ''
          )}

          {cellphone.length > 0 ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PhoneAndroidIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Celulares"
                secondary={cellphone.join(', ')}
              />
            </ListItem>
          ) : (
            ''
          )}
          {whatsapp.length > 0 ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <WhatsAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Whatsapp"
                secondary={whatsapp.join(', ')}
              />
            </ListItem>
          ) : (
            ''
          )}
          {email.length > 0 ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Correo electrónico"
                secondary={email.join(', ')}
              />
            </ListItem>
          ) : (
            ''
          )}

          {address !== '' ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <LocationOn />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dirección" secondary={address} />
            </ListItem>
          ) : (
            ''
          )}
        </PapperBlock>
      </div>
    );
  }
}
ChannelsCardData.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  whatsapp: PropTypes.array,
  email: PropTypes.array,
  phone: PropTypes.array,
  cellphone: PropTypes.array,
  address: PropTypes.string
};
ChannelsCardData.defaultProps = {
  address: '',
  description: '',
  whatsapp: [],
  email: [],
  phone: [],
  cellphone: []
};
export default withStyles(styles)(ChannelsCardData);
