import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@material-ui/core';

/* Select */
export const SelectRedux = ({ input, children, ...rest }) => (
  <Select
    {...input}
    {...rest}
  >
    {children}
  </Select>
);

SelectRedux.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
/* End */
export default SelectRedux;
