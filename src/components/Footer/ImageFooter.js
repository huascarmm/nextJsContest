import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkAdapter from '@components/LinkAdapter';
import { withStyles } from '@material-ui/core/styles';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';

import {
  Hidden,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';

const styles = () => ({
  footerContainer: {
    width: '110%',
    padding: '0 5%',
    marginLeft: '-5%',
    position: 'relative',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0 ',
    paddingBottom: '0',
  },
  divider: {
    width: '110%',
    marginLeft: '-5%',
  },
});

class ImageFooter extends Component {
  socials = (channels) => channels
    .map((channel, i) => {
      let socialButton = {
        target: '_blank',
        color: 'inherit',
        key: i,
      };
      switch (channel.type) {
        case 'facebook':
          socialButton = {
            ...socialButton,
            href: channel.content,
            ariaLabel: channel.type,
            icon: 'logo-facebook',
          };
          break;
        case 'twitter':
          socialButton = {
            ...socialButton,
            href: channel.content,
            icon: 'logo-twitter',
          };
          break;
        case 'whatsapp':
          socialButton = {
            ...socialButton,
            href: channel.content,
            icon: 'logo-whatsapp',
          };
          break;
        case 'linkedin':
          socialButton = {
            ...socialButton,
            href: channel.content,
            icon: 'logo-linkedin',
          };
          break;
        case 'youtube':
          socialButton = {
            ...socialButton,
            href: channel.content,
            icon: 'logo-youtube',
          };
          break;
        case 'instagram':
          socialButton = {
            ...socialButton,
            href: channel.content,
            icon: 'logo-instagram',
          };
          break;

        default:
          break;
      }
      return socialButton;
    })
    .filter((el) => el.icon !== undefined);

  render() {
    const { classes, features, channels } = this.props;
    const featuresMenu = features.length !== undefined
      ? features.filter((f) => f.category === 'footer')
      : [];
    const channelsList = channels.length !== undefined ? this.socials(channels) : [];
    return (
      <div className={classes.footerContainer}>
        <Hidden xsDown>
          <Card>
            <CardContent className={classes.flexBetween}>
              <ButtonGroup variant="text" size="small">
                {featuresMenu.map((el) => (
                  <Button component={LinkAdapter} to={el.link} key={el.name}>
                    {el.name}
                  </Button>
                ))}
              </ButtonGroup>

              <div>
                {channelsList.map((channel) => (
                  <IconButton
                    key={channel.key}
                    href={channel.href}
                    target={channel.target}
                    aria-label={channel.ariaLabel}
                    color={channel.color}
                  >
                    <Ionicon icon={channel.icon} />
                  </IconButton>
                ))}
              </div>
            </CardContent>

            <Divider />
            <CardActions className={classes.flexCenter}>
              Hecho con amor por ®
              <Button
                href="http://blockchainconsultora.com"
                target="_blank"
                color="secondary"
              >
                BlockchainConsultora.com
              </Button>
            </CardActions>
          </Card>
        </Hidden>
      </div>
    );
  }
}

ImageFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  features: state.getIn(['municipality', 'features']),
  channels: state.getIn(['municipality', 'channels']),
});

const withConnect = connect(mapStateToProps)(ImageFooter);

export default withStyles(styles)(withConnect);

/**
 *
 */
