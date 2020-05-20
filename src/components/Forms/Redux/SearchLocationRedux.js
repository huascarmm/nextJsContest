import React from 'react';
import PropTypes from 'prop-types';
import SearchLocation from '../../../containers/Maps/demos/SearchLocation';

/* Textfield */
const SearchLocationRedux = ({
  input: { name, onChange, ...inputProps },
  ...rest
}) => (
  <SearchLocation
    name={name}
    {...inputProps}
    {...rest}
    defaultCenter={inputProps.value}
    getPosition={position => onChange(position)}
  />
);

SearchLocationRedux.propTypes = {
  input: PropTypes.object.isRequired
};
/* End */
export default SearchLocationRedux;
