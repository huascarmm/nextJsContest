import React, { Component } from 'react';
import { SliderWidget, NoData } from '@components';
import { Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getLastNewsAction } from '@actions/MunicipalityDataActions';

class SliderLanding extends Component {
  state = {
    top: -100,
    loader: true
  };

  componentDidMount() {
    // eslint-disable-next-line
    // const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    // const { overTop } = this.props;
    // if (overTop) {
    //   this.setState({ top: -1 * rect.y });
    // }
  }

  componentWillUpdate(newProps) {
    const { municipalityId, getLastNews } = newProps;
    const { loader } = this.state;
    if (municipalityId !== '' && loader) {
      getLastNews(municipalityId);
      // eslint-disable-next-line
      this.setState({ loader: false });
    }
  }

  customizing = lastNews => lastNews.map(n => ({
    title: n.titlePost,
    description: n.contentPost,
    button: 'Ver más',
    image: n.imagePost,
    type: 'article',
    link:
      '/inicio/noticias/'
      + encodeURI(n.titlePost.replace(/ /g, '_'))
      + '?publicationId='
      + n.id
  }));

  conditionalRender(lastNews, top) {
    switch (lastNews.length) {
      case undefined:
        // return <Loading local />;
        return <div>...Loading</div>
      case 0:
        return <NoData />;

      default:
        return (
          <Grid
            container
            style={{
              marginTop: top + 'px',
              width: '104%',
              marginLeft: '-2%'
            }}
          >
            <Grid item xs={12}>
              <SliderWidget posts={this.customizing(lastNews)} />
            </Grid>
          </Grid>
        );
    }
  }

  render() {
    const { lastNews } = this.props;
    const { top } = this.state;
    return this.conditionalRender(lastNews, top);
  }
}

SliderLanding.propTypes = {
  lastNews: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  overTop: PropTypes.bool
};
SliderLanding.defaultProps = {
  overTop: false
};

const mapStateToProps = state => ({
  municipalityId: state.getIn(['municipality', 'municipalityId']),
  lastNews: state.getIn(['municipality', 'lastNews'])
});

const mapDispatchToProps = dispatch => ({
  getLastNews: bindActionCreators(getLastNewsAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect
)(SliderLanding);
