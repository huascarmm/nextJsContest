import React, { Component, Fragment, Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ChannelsCard, NoData } from "@components";
const MapMarker = React.lazy(() => import("src/containers/pageListAsync"));
// import Loading from '../../../components/Loading';

class Contacts extends Component {
  state = {
    email: [],
    phone: [],
    cellphone: [],
    whatsapp: [],
  };

  componentDidMount() {
    const { channels } = this.props;
    this.setChannels(channels);
  }

  componentWillReceiveProps(newProps) {
    const { channels } = newProps;
    this.setChannels(channels);
  }

  setChannels(channels) {
    channels.map((channel) => {
      switch (channel.type) {
        case "whatsapp":
          this.setState((state) => {
            const whatsapp = [...state.whatsapp, channel.content];
            return { whatsapp };
          });
          break;
        case "phone":
          this.setState((state) => {
            const phone = [...state.phone, channel.content];
            return { phone };
          });
          break;
        case "cellphone":
          this.setState((state) => {
            const cellphone = [...state.cellphone, channel.content];
            return { cellphone };
          });
          break;
        case "email":
          this.setState((state) => {
            const email = [...state.email, channel.content];
            return { email };
          });
          break;
        default:
          break;
      }
      return true;
    });
  }

  render() {
    const { classes, channels } = this.props;
    const { email, whatsapp, phone, cellphone } = this.state;

    return (
      <Fragment>
        {channels.length > 0 ? (
          <Grid container spacing={2} className={classes.root}>
            <Grid item md={4} xs={12}>
              {email || whatsapp || phone || cellphone ? (
                <ChannelsCard
                  title="Contacto central"
                  description="Datos de contacto de tu municipio"
                  email={email}
                  whatsapp={whatsapp}
                  phone={phone}
                  cellphone={cellphone}
                />
              ) : (
                <NoData />
              )}
            </Grid>
            <Grid item md={8} xs={12}>
              <Suspense fallback={<div>Loading...</div>}>
                <MapMarker
                  title="Dirección de nuestras oficinas"
                  description="Calle Riot #13, Plaza Principal de Rurrenabaque, Zona Villa Esperanza"
                  badgeMarker="Oficina central"
                />
              </Suspense>
            </Grid>
          </Grid>
        ) : (
          <p>...loading</p>
        )}
      </Fragment>
    );
  }
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  channels: state.getIn(["municipality", "channels"]),
});

export default connect(mapStateToProps)(Contacts);
