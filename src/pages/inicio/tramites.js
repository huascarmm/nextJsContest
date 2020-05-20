import Dashboard from 'src/containers/Templates/Dashboard'

class Tramites extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
      <div>Tramites</div>
      </Dashboard>
    )
  }
}

export default Tramites;