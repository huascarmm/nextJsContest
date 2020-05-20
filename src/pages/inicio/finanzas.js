import Dashboard from 'src/containers/Templates/Dashboard'

class Finanzas extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
      <div>Finanzas</div>
      </Dashboard>
    )
  }
}

export default Finanzas;