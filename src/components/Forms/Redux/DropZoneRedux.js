import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '@material-ui/core';
import MaterialDropZone from '../MaterialDropZone';

class DropZoneRedux extends Component {
  state = {
    files: []
  };

  render() {
    const {
      meta: { touched, error },
      label,
      input: {
        onChange, name, value
      },
      required,
      ...rest
    } = this.props;
    const { files } = this.state;
    return (
      <Fragment>
        {label && (
          <FormLabel error={touched && Boolean(error)} Component="label">
            {label}
            {' '}
            {touched && Boolean(error) && '*'}
          </FormLabel>
        )}
        <MaterialDropZone
          name={name}
          files={value.length > 0 ? value : files}
          {...rest}
          onDropChange={onChange}
          style={{
            borderColor:
              touched && Boolean(error)
                ? 'rgba(255, 0, 0, 0.32) !important'
                : 'rgba(0, 0, 0, 0.12) !important'
          }}
        />
        {touched && Boolean(error) && <span className="error">{error}</span>}
      </Fragment>
    );
  }
}
DropZoneRedux.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  meta: PropTypes.object
};

DropZoneRedux.defaultProps = {
  required: false,
  label: null,
  meta: []
};

export default DropZoneRedux;
