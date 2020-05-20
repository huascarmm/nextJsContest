import React from 'react';
// import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { PapperBlock } from '@components';
import { PopoverMarker } from './demos';

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
          <PopoverMarker badgeMarker={badgeMarker} />
        </PapperBlock>
      </div>
    );
  }
}
MapMarker.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badgeMarker: PropTypes.string.isRequired
};
export default MapMarker;
/**
 *
 */
