import Dashboard from 'src/containers/Templates/Dashboard'

class Obras extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
      <div>Obras</div>
      </Dashboard>
    )
  }
}

export default Obras;