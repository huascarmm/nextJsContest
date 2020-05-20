import Dashboard from 'src/containers/Templates/Dashboard'

class PoaMunicipal extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <div>PoaMunicipal</div>
      </Dashboard>
    )
  }
}

export default PoaMunicipal;