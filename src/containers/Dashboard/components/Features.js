import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonCard } from '@components';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

class Features extends Component {
  render() {
    const { features, classes } = this.props;
    const featuresMenu = features.length > 0 ? features.filter(f => f.category === 'menu') : [];
    return (
      <Fragment>
        {featuresMenu.length > 0 ? (
          <Grid container spacing={2} className={classes.root}>
            {featuresMenu.map(f => (
              <Grid item xs={12} sm={6} md={4} key={f.name}>
                <ButtonCard
                  icon={f.icon}
                  desc={f.shortDescription}
                  action={f.name}
                  link={f.link}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
            // <Loading local />
            <div>...Loading</div>
          )}
      </Fragment>
    );
  }
}

Features.propTypes = {
  features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  features: state.getIn(['municipality', 'features'])
});

export default connect(mapStateToProps)(Features);
