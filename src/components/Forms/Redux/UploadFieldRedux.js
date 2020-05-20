import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  FormLabel,
  Fab
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

class UploadFieldRedux extends Component {
  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  render() {
    const {
      input: {
        name, value, onChange, onBlur, ...inputProps
      },
      meta: { touched, error },
      text,
      label,
      acceptedFiles,
      ...props
    } = this.props;
    return (
      <Fragment>
        {label && (
          <FormLabel error={touched && Boolean(error)} Component="label">
            {label}
            {' '}
            {touched && Boolean(error) && '*'}
          </FormLabel>
        )}
        <Fab
          name={name}
          size="small"
          variant="contained"
          style={{ width: '100%' }}
          onClick={() => document.getElementById('input-file').click()}
        >
          {text}
          <CloudUpload />
        </Fab>
        <input
          id="input-file"
          type="file"
          accept={acceptedFiles.join(',')}
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          style={{ display: 'none' }}
          {...inputProps}
          {...props}
        />
      </Fragment>
    );
  }
}
UploadFieldRedux.propTypes = {
  input: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  meta: PropTypes.object,
  label: PropTypes.string,
  acceptedFiles: PropTypes.array
};
UploadFieldRedux.defaultProps = {
  acceptedFiles: [],
  meta: null,
  label: ''
};
export default UploadFieldRedux;
