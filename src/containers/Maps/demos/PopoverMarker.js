import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import MuseumIcon from '@material-ui/icons/Museum';
import PropTypes from 'prop-types';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: -14.4434107, lng: -67.5314482 }}
  >
    <Marker
      position={{ lat: -14.4433834, lng: -67.530909 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <span>
            <MuseumIcon />
            &nbsp;
            {props.badgeMarker}
          </span>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

class PopoverMarker extends React.Component {
  render() {
    const { badgeMarker } = this.props;
    return (
      <MapWithAMakredInfoWindow
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=xxxxxxxxxxxxxxxxxx&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        badgeMarker={badgeMarker}
      />
    );
  }
}
PopoverMarker.propTypes = {
  badgeMarker: PropTypes.string.isRequired,
};
export default PopoverMarker;
