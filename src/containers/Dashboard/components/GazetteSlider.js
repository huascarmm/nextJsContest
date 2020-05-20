import React, { Component } from 'react';
import Gavel from '@material-ui/icons/Gavel';
import PropTypes from 'prop-types';
import { getLastLawsAction } from '@actions/MunicipalityDataActions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import treeChanges from 'tree-changes';
import { bindActionCreators } from 'redux';
import { Divider, Typography, withStyles } from '@material-ui/core';
import styles from '@components/Widget/widget-jss';
import { NoData, CarouselWidget } from '@components'

class GazetteSlider extends Component {
  state = {
    loader: true
  };

  componentDidMount() {
    const { getLastLaws, municipalityId } = this.props;
    const { loader } = this.state;
    getLastLaws(municipalityId);
    this.setState({ loader: !loader });
  }

  componentDidUpdate(prevProps) {
    const { getLastLaws, municipalityId } = this.props;
    const { loader } = this.state;
    const { changed } = treeChanges(prevProps, this.props);
    if (changed('municipalityId')) {
      getLastLaws(municipalityId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loader: !loader });
    }
  }

  customizing = lastLaws => lastLaws.map(law => {
    let base = {
      title: law.titlePost,
      content: law.contentPost,
      link:
        '/inicio/gaceta/'
        + encodeURI(law.titlePost.replace(/ /g, '_'))
        + '?publicationId='
        + law.id
    };
    switch (law.subCategories[0]) {
      case 'ley':
        base = { ...base, background: '#7CB342', icon: 'mood' };
        break;

      case 'Reglamento':
        base = { ...base, background: '#00ACC1', icon: 'flag' };
        break;

      case 'decreto':
        base = { ...base, background: '#00BFA5', icon: 'done' };
        break;

      case 'resolucion':
        base = { ...base, background: '#F57F17', icon: 'extension' };
        break;

      default:
        break;
    }
    return base;
  });

  conditionalRender(lastLaws) {
    switch (lastLaws.length) {
      case undefined:
        // return <Loading local />;
        return <div>...Loading</div>

      case 0:
        return <NoData />;

      default:
        return <CarouselWidget carouselData={this.customizing(lastLaws)} />;
    }
  }

  render() {
    const {
      classes, lastLaws
    } = this.props;

    return (
      <div>
        <Typography className={classes.smallTitle} variant="button">
          <Gavel className={classes.leftIcon} />
          Gaceta Municipal
        </Typography>
        <Divider className={classes.divider} />
        {this.conditionalRender(lastLaws)}
      </div>
    );
  }
}

GazetteSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  lastLaws: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  getLastLaws: PropTypes.func.isRequired,
  municipalityId: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired
};

const mapStateToProps = state => ({
  municipalityId: state.getIn(['municipality', 'municipalityId']),
  lastLaws: state.getIn(['municipality', 'lastLaws'])
});

const mapDispatchToProps = dispatch => ({
  getLastLaws: bindActionCreators(getLastLawsAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStyles(styles)(
  compose(
    withConnect
  )(GazetteSlider)
);
