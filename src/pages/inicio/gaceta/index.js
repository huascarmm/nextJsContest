import Dashboard from 'src/containers/Templates/Dashboard'
import { SearchButtonsContainer, PostsGrid } from '@components';

class Gaceta extends React.Component {
  state = {
    categoryId: "916c337a-5d75-43f3-b548-7e4da698b82a",
    moduleName: "gaceta",
  }
  render() {
    const { changeMode } = this.props;
    const { categoryId, moduleName } = this.state;
    return (
      <Dashboard changeMode={changeMode}>
        <React.Fragment>
          <SearchButtonsContainer moduleName={moduleName} category={categoryId} />

          <PostsGrid moduleName={moduleName} postsCategoryId={categoryId} />
        </React.Fragment>
      </Dashboard>
    )
  }
}

export default Gaceta;