import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { FormLabel } from '@material-ui/core';

/* Textfield */
const TextFieldControlRedux = ({
  meta: { touched, error },
  input,
  multiple,
  label,
  children,
  ...rest
}) => {
  const [val, setVal] = multiple ? useState([]) : useState('');
  return (
    <Fragment>
      {label && (
        <FormLabel error={touched && Boolean(error)} component="label">
          {label}
          {' '}
          {touched && Boolean(error) && '*'}
        </FormLabel>
      )}
      <TextField
        {...rest}
        {...input}
        value={val || input.value}
        onChange={e => setVal(e.target.value)}
        error={touched && Boolean(error)}
      >
        {children && children}
      </TextField>
    </Fragment>
  );
};
TextFieldControlRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  children: PropTypes.node
};

TextFieldControlRedux.defaultProps = {
  meta: null,
  children: null,
  multiple: false,
  label: null
};
/* End */
export default TextFieldControlRedux;
