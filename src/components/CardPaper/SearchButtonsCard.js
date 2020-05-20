import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { BigIconButton, SearchUi } from '@components';
import styles from './cardStyle-jss';

class SearchButtonsCard extends Component {
  render() {
    const {
      classes, categories, handleClick, handleSearch
    } = this.props;
    return (
      <Paper className={classes.rootCard} elevation={4}>
        <Grid container justify="center">
          <div className={classes.searchWrapper}>
            <div className={classes.iconSearch}>
              <SearchIcon />
            </div>
            <SearchUi history={{}} handleSearch={handleSearch} />
          </div>
        </Grid>
        <Grid container justify="center">
          {categories.map(c => (
            <BigIconButton key={c.title} handleClick={handleClick} item={c} />
          ))}
        </Grid>
      </Paper>
    );
  }
}

SearchButtonsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired
};
export default withStyles(styles)(SearchButtonsCard);
