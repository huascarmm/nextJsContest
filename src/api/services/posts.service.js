import HttpClient from '../../utils/http.client';
import { Array } from '../../redux/helpers/array.library';
let instance = null;

class PostsService extends HttpClient {
  constructor() {
    super('posts');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  // eslint-disable-next-line no-unused-vars
  async getPostToShow(id, params) {
    const filter = {
      include: [{
        relation: 'subCategory'
      }, {
        relation: 'postsFileStorages',
        scope: {
          include: [{
            relation: 'fileStorage',
          }]
        }
      }]
    };
    const post = await this.findById(id, filter);
    Object.assign(post, {
      images: Array(post.postsFileStorages).groupBy('tag')
    });
    return post;
  }
}

const PostsApi = new PostsService();
export default PostsApi;
