import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Typography, Divider, Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: '24px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: '80px',
    height: '80px',
    margin: theme.spacing(3)
  }
});

class ProfileCard2 extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <Avatar
          alt="Remy Sharp"
          src="https://www.infobae.com/new-resizer/gxF-0tldLERbz-7ZMMKkVYUq5GM=/750x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/04/23121914/adrian_uribe_instagram_hospital_terapia_intensiva.jpg"
          className={classes.avatar}
        />
        <div>
          <Typography>Jefe de area:</Typography>
          <Typography variant="h6">Juan Eduardo Perez</Typography>
          <Divider />
          <Typography>
            Lorem ipsum profesion texto de prueba, ipsum profesion texto de
            prueba ipsum profesion texto de pruebaipsum profesion texto de
            prueba
          </Typography>
        </div>
      </Card>
    );
  }
}
ProfileCard2.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProfileCard2);
