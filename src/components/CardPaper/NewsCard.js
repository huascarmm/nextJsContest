import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Popover,
  CardContent,
  CardActions,
  CardMedia,
  Card
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import {
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  LinkedinIcon
} from 'react-share';
import styles from './cardStyle-jss';

class NewsCard extends React.Component {
  state = { anchorEl: null };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const {
      classes,
      children,
      title,
      image,
      action,
      link,
      ...rest
    } = this.props;

    const { anchorEl } = this.state;
    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const uri2Share = 'https://' + window.location.hostname + link;

    return (
      <Card className={classes.cardMedia} {...rest} style={{ width: '100%' }}>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>{children}</CardContent>
        {action && (
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button size="small" color="primary" onClick={this.handleClick}>
              Compartir
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <div className={classes.socialsContainer}>
                <div className={classes.socialsItems}>
                  <WhatsappShareButton url={uri2Share}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
                <div className={classes.socialsItems}>
                  <FacebookShareButton url={uri2Share}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div className={classes.socialsItems}>
                  <TwitterShareButton url={uri2Share}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
                <div className={classes.socialsItems}>
                  <LinkedinShareButton url={uri2Share}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div className={classes.socialsItems}>
                  <EmailShareButton url={uri2Share}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
                <div className={classes.socialsItems}>
                  <TelegramShareButton url={uri2Share}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </div>
            </Popover>

            <Button
              size="small"
              color="primary"
              // component={Link}
              // to={link}
            >
              Ver más
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  action: PropTypes.bool
};

NewsCard.defaultProps = {
  action: true
};

export default withStyles(styles)(NewsCard);
