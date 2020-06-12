import React, { Suspense } from "react";
// import { Helmet } from 'react-helmet';
import PropTypes from "prop-types";
import { PapperBlock } from "@components";
const PopoverMarker = React.lazy(() => import("./demos/PopoverMarker"));

class MapMarker extends React.Component {
  render() {
    const { title, description, badgeMarker } = this.props;
    return (
      <div>
        {/* <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet> */}
        <PapperBlock overflowX title={title} desc={description}>
          <Suspense fallback={<div>Loading...</div>}>
            <PopoverMarker badgeMarker={badgeMarker} />
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
