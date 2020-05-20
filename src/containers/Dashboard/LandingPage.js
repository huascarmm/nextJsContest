import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import {
  withStyles, Divider, Grid, Paper
} from '@material-ui/core';
import { compose } from 'recompose';
import injectSaga from '@utils/injectSaga';
import styles from './dashboard-jss';
import postsSaga from '@redux/sagas/posts';
import {
  GazetteSlider,
  ObrasSlider,
  MunicipalStats,
  Contacts,
  Features,
  SliderLanding,
} from 'src/containers/Dashboard/components'

class LandingPage extends Component {
  render() {
    const brand = { name: 'Inicio', desc: 'Municipios de Bolivia' };
    const title = brand.name + ' - Municipios de Bolivia';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        {/* <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet> */}
        {/* 1st Section */}
        <SliderLanding overTop />
        <Divider className={classes.divider} />

        <Features classes={classes} />
        <Divider className={classes.divider} />

        <Paper className={classes.paperRoot} elevation={4}>
          <Grid container spacing={2} className={classes.root}>
            <Grid item md={4} xs={12}>
              <GazetteSlider />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ObrasSlider />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <MunicipalStats />
            </Grid>
          </Grid>
        </Paper>
        <Divider className={classes.divider} />
        <Contacts classes={classes} />
      </div>
    );
  }
}
LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};
const withSaga = injectSaga({
  key: 'SliderLanding',
  saga: postsSaga
});
export default withStyles(styles)(compose(withSaga)(LandingPage));
