import React, { Suspense } from "react";
import PropTypes from "prop-types";
const SearchLocation = React.async(() =>
  import("../../../containers/Maps/demos/SearchLocation")
);

/* Textfield */
const SearchLocationRedux = ({
  input: { name, onChange, ...inputProps },
  ...rest
}) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchLocation
      name={name}
      {...inputProps}
      {...rest}
      defaultCenter={inputProps.value}
      getPosition={(position) => onChange(position)}
    />
  </Suspense>
);

SearchLocationRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */
export default SearchLocationRedux;
