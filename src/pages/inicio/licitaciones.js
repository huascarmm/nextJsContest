import Dashboard from 'src/containers/Templates/Dashboard'

class Licitaciones extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
      <div>Licitaciones</div>
      </Dashboard>
    )
  }
}

export default Licitaciones;