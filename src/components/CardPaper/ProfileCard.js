import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from '@styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

import Divider from '@material-ui/core/Divider';
import styles from './cardStyle-jss';

class ProfileCard extends React.Component {
  render() {
    const {
      classes,
      cover,
      avatar,
      name,
      title,
      isVerified,
      btnText,
      author,
      linkProfile
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>
        <CardMedia
          className={classes.mediaProfile}
          image={cover}
          title="cover"
        />
        <CardContent className={classes.contentProfile}>
          <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
          {author && (
            <Typography variant="h5" className={classes.name} gutterBottom>
              Autor:
            </Typography>
          )}
          <Typography variant="h6" className={classes.name} gutterBottom>
            {name}
            {isVerified && <VerifiedUser className={classes.verified} />}
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            <span className={Type.regular}>{title}</span>
          </Typography>

          <Button
            className={classes.buttonProfile}
            size="large"
            variant="outlined"
            color="secondary"
            // component={Link}
            // to={linkProfile}
          >
            {btnText}
          </Button>
        </CardContent>
        <Divider />
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  linkProfile: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  author: PropTypes.bool
};

ProfileCard.defaultProps = {
  isVerified: false,
  author: false
};

export default withStyles(styles)(ProfileCard);
