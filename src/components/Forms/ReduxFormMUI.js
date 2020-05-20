/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import dynamic from 'next/dynamic';

export TextFieldRedux from './Redux/TextFieldRedux';
export TextFieldControlRedux from './Redux/TextFieldControlRedux';

export const EditorRedux = dynamic({
  loader: () => import('./Redux/EditorRedux'),
  ssr: false
});
export SelectRedux from './Redux/SelectRedux';
export MultiSelectRedux from './Redux/MultiSelectRedux';
export DropZoneRedux from './Redux/DropZoneRedux';

/* Checkbox */
export const CheckboxRedux = ({ input, ...rest }) => (
  <Checkbox
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

CheckboxRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */

/* Switch */
export const SwitchRedux = ({ input, ...rest }) => (
  <Switch
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

SwitchRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */

/* DatePicker */
export const DatePickerRedux = ({
  meta: { touched, error },
  input,
  ...rest
}) => {
  rest.format = '';
  if (rest.formatToPicker !== undefined) {
    rest.format = rest.formatToPicker;
    delete rest.formatToPicker;
  }
  const [selectedDate, handleDateChange] = useState(null);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <DatePicker
        {...input}
        {...rest}
        value={selectedDate || input.value}
        onChange={handleDateChange}
      />
      {touched && error && <span>{error}</span>}
    </MuiPickersUtilsProvider>
  );
};

DatePickerRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};
DatePickerRedux.defaultProps = {
  meta: null,
};
/* End */

/* UploadRedux */
const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

export UploadFieldRedux from './Redux/UploadFieldRedux';
export const UploadRedux = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

UploadRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};
UploadRedux.defaultProps = {
  meta: null,
};
/* End */
