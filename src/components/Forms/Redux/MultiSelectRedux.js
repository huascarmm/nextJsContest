import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from '@material-ui/core';

/* Multi Select */
const MultiSelectRedux = ({
  input,
  children,
  ...rest
}) => {
  const [val, setVal] = useState([]);
  return (
    <Select
      {...input}
      {...rest}
      multiple
      input={<Input id="select-multiple-chip" />}
      value={val || input.value}
      onChange={(e) => setVal(e.target.value)}
    >
      {children}
    </Select>
  );
};

MultiSelectRedux.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
/* End */
export default MultiSelectRedux;
