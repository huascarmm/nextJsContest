import Dashboard from 'src/containers/Templates/Dashboard'

class Autoridades extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <div>Autoridades</div>
      </Dashboard>
    )
  }
}

export default Autoridades;