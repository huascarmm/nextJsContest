import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Loading } from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import injectSaga from '@utils/injectSaga';
import postsSaga from '@redux/sagas/posts';
import {
  getPostSubCategoriesAction,
  filterPostsAction,
} from '@actions/MunicipalityDataActions';
import SearchButtonsCard from './SearchButtonsCard';

function SearchButtonsContainer(props) {
  const {
    subCategories,
    municipalityId,
    getPostSubCategories,
    filterPosts,
    category,
    moduleName,
  } = props;

  const [load, setLoad] = useState(true);
  const [localModule, setlocalModule] = useState('');
  const handleSearch = ({ keyCode, target }) => {
    if (keyCode === 13) {
      filterPosts({
        query: target.value,
        filterType: 'search',
      });
    }
  };

  function handleClickButtons(params) {
    filterPosts({ ...params, filterType: 'categories' });
  }

  if ((municipalityId !== '' && load) || localModule !== moduleName) {
    getPostSubCategories({
      municipalityId,
      categoryId: category,
    });
    setLoad(false);
    setlocalModule(moduleName);
  }

  return subCategories.length !== undefined ? (
    <SearchButtonsCard
      categories={subCategories}
      handleClick={handleClickButtons}
      handleSearch={handleSearch}
    />
  ) : (
    // <Loading local />
    <div>...Loading</div>
  );
}

SearchButtonsContainer.propTypes = {
  subCategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  municipalityId: PropTypes.string.isRequired,
  getPostSubCategories: PropTypes.func.isRequired,
  filterPosts: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  municipalityId: state.getIn(['municipality', 'municipalityId']),
  subCategories: state.getIn(['posts', 'subCategories']),
});

const mapDispatchToProps = (dispatch) => ({
  getPostSubCategories: bindActionCreators(
    getPostSubCategoriesAction,
    dispatch
  ),
  filterPosts: bindActionCreators(filterPostsAction, dispatch),
});

const withSaga = injectSaga({
  key: 'SearchButtonsContainer',
  saga: postsSaga,
});

export default compose(
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchButtonsContainer);
