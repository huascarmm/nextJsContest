import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ShareIcon from '@material-ui/icons/Share';
// import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import {
  Divider,
  Button,
  Popover,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Chip
} from '@material-ui/core';
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
JavascriptTimeAgo.locale(es);
/*
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
const optionsOpt = ['Reportar publicación', 'Ocultar', 'Copiar link'];
const ITEM_HEIGHT = 48;
*/
class PostCard extends React.Component {
  /* state = { anchorElOpt: null };
  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  }; */

  state = { anchorEl: null };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const {
      classes,
      avatar,
      name,
      date,
      image,
      title,
      likes,
      dislikes,
      shared,
      // commented,
      action1Label,
      action2Label,
      action1Link,
      action2Link,
      type,
      subCategories
    } = this.props;
    const { anchorEl } = this.state;

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const uri2Share = 'https://' + window.location.hostname + action1Link;
    // const { anchorElOpt } = this.state;
    return (
      <Card className={classes.cardSocmed}>
        {avatar !== '' ? (
          <CardHeader
            avatar={
              <Avatar alt="avatar" src={avatar} className={classes.avatar} />
            }
            /* temporal huascar action={
              <IconButton
                aria-label="More"
                aria-owns={anchorElOpt ? "long-menu" : null}
                aria-haspopup="true"
                className={classes.button}
                onClick={this.handleClickOpt}
              >
                <MoreVertIcon />
              </IconButton>
            */
            title={name}
            subheader=""
          />
        ) : (
          ''
        )}
        {/* temporal huascar<Menu
          id="long-menu"
          anchorEl={anchorElOpt}
          open={Boolean(anchorElOpt)}
          onClose={this.handleCloseOpt}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {optionsOpt.map(option => (
            <MenuItem
              key={option}
              selected={option === "Edit Profile"}
              onClick={this.handleCloseOpt}
            >
              {option}
            </MenuItem>
          ))}
          </Menu> */}
        {image !== '' && (
          <CardMedia className={classes.media} image={image} title={title} />
        )}
        <CardContent className={classes.heigthContent}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Grid container justify="space-between" alignItems="flex-start">
            <ReactTimeAgo
              date={new Date(date)}
              locale="es"
              style={{ marginTop: '5px', fontSize: 'small' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {subCategories.map(s => (
                <Chip key={s} label={s} className={classes.chip} />
              ))}
            </div>
          </Grid>
        </CardContent>

        <CardActions className={classes.actions}>
          <IconButton
            aria-label="Likes to this post"
            className={classes.button}
          >
            <ThumbUpIcon className={likes > 0 ? classes.liked : ''} />
            <span className={classes.num}>{likes}</span>
          </IconButton>
          <IconButton aria-label="Dislikes" className={classes.button}>
            <ThumbDownAltIcon className={dislikes > 0 ? classes.liked : ''} />
            <span className={classes.num}>{dislikes}</span>
          </IconButton>
          <IconButton
            aria-label="Share"
            className={classes.button}
            onClick={this.handleClick}
          >
            <ShareIcon className={shared > 0 ? classes.shared : ''} />
            <span className={classes.num}>{shared}</span>
          </IconButton>
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

          {/*
          <IconButton aria-label="Comment" className={classes.rightIcon}>
            <Comment />
            <span className={classes.num}>{commented}</span>
          </IconButton>
          */}
        </CardActions>
        {action1Link !== '' && (
          <Fragment>
            <Divider />
            <CardActions className={classes.actions}>
              {action2Link !== '' && (
                <Button
                  variant="outlined"
                  href={action2Link}
                  target="_blank"
                  color="secondary"
                >
                  {action2Label}
                </Button>
              )}
              {type === 'href' ? (
                <Button
                  variant="outlined"
                  href={action1Link}
                  target="_blank"
                  color="primary"
                >
                  {action1Label}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  // component={Link}
                  // to={action1Link}
                  color="primary"
                >
                  {action1Label}
                </Button>
              )}
            </CardActions>
          </Fragment>
        )}
      </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  shared: PropTypes.number.isRequired,
  // commented: PropTypes.number.isRequired,
  action1Label: PropTypes.string,
  action2Label: PropTypes.string,
  action1Link: PropTypes.string,
  action2Link: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  subCategories: PropTypes.array.isRequired
};

PostCard.defaultProps = {
  image: '',
  action1Label: 'Leer',
  action2Label: 'Descargar',
  action2Link: '',
  action1Link: '',
  type: 'href',
  name: '',
  avatar: ''
};

export default withStyles(styles)(PostCard);
