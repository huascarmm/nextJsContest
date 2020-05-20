import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observable } from '../../../actions/ReduxFormActions';

const _ = require('lodash');
const styles = theme => ({
  searchBox: {
    boxSizing: 'border-box',
    color: theme.palette.text.secondary,
    border: '1px solid transparent',
    width: '240px',
    background: theme.palette.background.default,
    height: '32px',
    marginTop: '7px',
    marginLeft: '10px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses'
  }
});

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAexm2_HTB7mX3R67XNic5NgOd7jHmFWS4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: -14.436112,
          lng: -67.526147
        },
        markers: [],
        // onMapMounted: ref => {
        //   refs.map = ref;
        // },
        // onBoundsChanged: () => {
        //   this.setState({
        //     bounds: refs.map.getBounds(),
        //     center: refs.map.getCenter(),
        //   });
        // },
        onClick: ({ latLng }) => {
          const nextMarkers = [
            {
              position: {
                lat: latLng.lat(),
                lng: latLng.lng()
              }
            }
          ];
          if (this.props.getPosition) {
            this.props.getPosition({
              lat: latLng.lat(),
              lng: latLng.lng()
            });
          }
          this.props.$observable(this.props.subscribe, {
            lat: latLng.lat(),
            lng: latLng.lng()
          });
          this.setState({
            // center: nextCenter,
            markers: nextMarkers
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds(); // eslint-disable-line

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          // eslint-disable-next-line
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            // eslint-disable-next-line
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    {...props}
    // ref={props.onMapMounted}
    options={{
      mapTypeControlOptions: {
        mapTypeIds: []
      }
    }}
    defaultMapTypeId="hybrid"
    defaultZoom={15}
    center={props.center}
    // onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT} // eslint-disable-line
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Buscar en Google Maps"
        className={props.classes.searchBox}
      />
    </SearchBox>
    {props.markers.map((marker, index) => (
      <Marker key={index.toString()} position={marker.position} />
    ))}
  </GoogleMap>
));

MapWithASearchBox.propsTypes = {
  classes: PropTypes.object.isRequired
};

const MapStyled = withStyles(styles)(MapWithASearchBox);

class SearchLocation extends React.Component {
  render() {
    return <MapStyled {...this.props} />;
  }
}
SearchLocation.propTypes = {
  getPosition: PropTypes.func
};
SearchLocation.defaultProps = {
  getPosition: null
};
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  $observable: bindActionCreators(observable, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLocation);

export default withConnect;
