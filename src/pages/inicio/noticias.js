import Dashboard from 'src/containers/Templates/Dashboard'

class Noticias extends React.Component {
  render() {
    const { changeMode } = this.props;
    return (
      <Dashboard changeMode={changeMode}>
      <div>Noticias</div>
      </Dashboard>
    )
  }
}

export default Noticias;