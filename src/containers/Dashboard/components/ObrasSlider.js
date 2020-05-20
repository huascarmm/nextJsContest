import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HomeWork from '@material-ui/icons/HomeWork';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import treeChanges from 'tree-changes';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styles from '@components/Widget/widget-jss';
import { getListPosts } from '@api/apiRest/secondary';
import { NoData, NewsWidget } from '@components';

class Obras extends Component {
  state = {
    loader: true,
    finances: null
  };

  componentDidMount() {
    const { municipalityId } = this.props;
    if (municipalityId !== '') {
      this.getLastFinances(municipalityId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loader: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { municipalityId } = this.props;
    const { changed } = treeChanges({ ...prevState, ...prevProps }, { ...this.state, ...this.props });
    if (changed('municipalityId')) {
      this.getLastFinances(municipalityId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loader: false });
    }
  }

  getLastFinances = municipalityId => {
    getListPosts({
      municipalityId,
      postsCategoryId: 'aa09e8e8-ce93-4db3-b000-0882b1690fc9'
    }).then(res => {
      this.setState({
        finances: this.customizing(res)
      });
    });
  };

  customizing = finances => finances.map(f => ({
    label: f.titlePost,
    imgPath: f.imagePost,
    desc: f.contentPost,
    link:
      '/inicio/obras/'
      + encodeURI(f.titlePost.replace(/ /g, '_'))
      + '?publicationId='
      + f.id
  }));

  render() {
    const { classes } = this.props;
    const { finances } = this.state;
    return (
      <Fragment>
        {finances && finances.length === 0 && <NoData />}
        {finances && finances.length > 0 && (
          <div>
            <Typography className={classes.smallTitle} variant="button">
              <HomeWork className={classes.leftIcon} />
              Obras Municipales
            </Typography>
            <Divider className={classes.divider} />
            <NewsWidget slideData={finances} />
          </div>
        )}
        {!finances && (
          // <Loading local />
          <div>...Loading</div>
        )}
      </Fragment>
    );
  }
}

Obras.propTypes = {
  classes: PropTypes.object.isRequired,
  municipalityId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  municipalityId: state.getIn(['municipality', 'municipalityId'])
});

const conn = connect(mapStateToProps);

export default withStyles(styles)(compose(conn)(Obras));
