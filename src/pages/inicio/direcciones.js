import Dashboard from 'src/containers/Templates/Dashboard'

class Direcciones extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <div>Direcciones</div>
      </Dashboard>
    )
  }
}

export default Direcciones;