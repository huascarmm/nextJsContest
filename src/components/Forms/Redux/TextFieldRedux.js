import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

/* Textfield */
const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => {
  const [val, setVal] = useState('');
  return (
    <TextField
      {...rest}
      {...input}
      value={val || input.value}
      onChange={e => setVal(e.target.value)}
      error={touched && Boolean(error)}
    />
  );
};

TextFieldRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object
};

TextFieldRedux.defaultProps = {
  meta: null
};
/* End */
export default TextFieldRedux;
