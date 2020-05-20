import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import injectSaga from '@utils/injectSaga';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import {PostCard} from '@components';
import postsSaga from '@redux/sagas/posts';
import { filterPostsAction } from '@actions/MunicipalityDataActions';

class PostsGrid extends React.Component {
  state = {
    reload: true,
  };

  componentWillReceiveProps(arg) {
    const { filterPosts, moduleName } = this.props;
    const { reload } = this.state;

    if (reload || moduleName !== arg.moduleName) {
      filterPosts({
        municipalityId: arg.municipalityId,
        postsCategoryId: arg.postsCategoryId,
        filterType: 'all',
      });
      this.setState({ reload: false });
    }
  }

  render() {
    const { posts, moduleName } = this.props;
    return posts.length > 0 ? (
      <Grid container>
        {posts.map((p) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={Math.random()}
            style={{ padding: '5px', marginBottom: '16px' }}
          >
            <PostCard
              date={p.datePost}
              image={p.imagePost}
              title={p.titlePost}
              likes={p.likesPost}
              dislikes={p.disLikesPost}
              shared={p.sharesPost}
              commented={p.commentsPost}
              action1Link={
                '/inicio/'
                + moduleName
                + '/'
                + encodeURI(p.titlePost.replace(/ /g, '_'))
                + '?publicationId='
                + p.id
              }
              action2Link={p.linkFile}
              type="link"
              subCategories={p.subCategories}
            />
          </Grid>
        ))}
      </Grid>
    ) : posts.length === 0 ? (
      <Grid container justify="center">
        <Paper style={{ padding: '20px', marginBottom: '24px' }}>
          No se encontraron resultados
        </Paper>
      </Grid>
    ) : (
      // <Loading local />
    <div>...Loading</div>
    );
  }
}

PostsGrid.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  filterPosts: PropTypes.func.isRequired,
  moduleName: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  municipalityId: state.getIn(['municipality', 'municipalityId']),
  posts: state.getIn(['posts', 'posts']),
});
const mapDispatchToProps = (dispatch) => ({
  filterPosts: bindActionCreators(filterPostsAction, dispatch),
});
const withSaga = injectSaga({
  key: 'PostsGrid',
  saga: postsSaga,
});

export default compose(
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PostsGrid);
