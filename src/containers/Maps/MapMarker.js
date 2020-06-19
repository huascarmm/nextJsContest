import React, { Suspense } from "react";
// import { Helmet } from 'react-helmet';
import PropTypes from "prop-types";
import { PapperBlock } from "@components";
const Map = React.lazy(() => import("./demos/Map"));
class MapMarker extends React.Component {
  render() {
    const { title, description, badgeMarker } = this.props;
    return (
      <div>
        <PapperBlock overflowX title={title} desc={description}>
          <Suspense fallback={<div>Loading...</div>}>
            <Map />
          </Suspense>
        </PapperBlock>
      </div>
    );
  }
}
MapMarker.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badgeMarker: PropTypes.string.isRequired,
};
export default MapMarker;
/**
 *
 */
