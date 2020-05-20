import Dashboard from 'src/containers/Templates/Dashboard'

class Presentacion extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
        <div>Presentacion</div>
      </Dashboard>
    )
  }
}
export default Presentacion;