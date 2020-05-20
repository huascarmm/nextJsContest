import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  withStyles, Divider, Paper, Grid
} from '@material-ui/core';
import Dashboard from 'src/containers/Templates/Dashboard';
import {
  GazetteSlider,
  ObrasSlider,
  MunicipalStats,
  Contacts,
  Features,
  SliderLanding,
} from 'src/containers/Dashboard/components'
import styles from 'src/containers/Dashboard/dashboard-jss';
import dynamic from 'next/dynamic';

class Page extends React.Component {
  render() {
    const { changeMode } = this.props;
    const brand = { name: 'Inicio', desc: 'Municipios de Bolivia' };
    const title = brand.name + ' - Municipios de Bolivia';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Head>
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
      </Dashboard>
    )
  }
}
Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);