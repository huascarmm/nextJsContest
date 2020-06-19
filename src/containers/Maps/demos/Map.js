class Map extends React.Component {
  /** This functions are supposed to be replaced for API calls to get the dynamic center & markers */
  getCenter() {
    return "-14.4433834,-67.530909";
  }
  getMarkers() {
    return "-14.4433834,-67.530909";
  }
  getSrcMap() {
    return (
      "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAexm2_HTB7mX3R67XNic5NgOd7jHmFWS4&zoom=18&size=600x400&center=" +
      this.getCenter() +
      "&markers=" +
      this.getMarkers()
    );
  }
  render() {
    return (
      <a
        href="https://www.google.com/maps/place/-14.4433834,-67.530909"
        target="_blank"
      >
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundImage: `url(${this.getSrcMap()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </a>
    );
  }
}

export default Map;
