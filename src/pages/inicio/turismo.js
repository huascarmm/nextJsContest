import Dashboard from 'src/containers/Templates/Dashboard'

class Turismo extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <div>Turismo</div>
      </Dashboard>
    )
  }
}

export default Turismo;