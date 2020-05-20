import HttpClient from '../../utils/http.client';
import FileStorageApi from './file.storage.service';
let instance = null;

class PostsCategoriesService extends HttpClient {
  constructor() {
    super('posts-categories');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getFile = async (postsFileStorages, tag) => {
    let image = '';
    if (postsFileStorages !== undefined) {
      const { fileStorage, ...relation } = await postsFileStorages.find(p => p.tag === tag);
      if (relation !== undefined) {
        image = await FileStorageApi.getLinkTo(fileStorage);
      }
    }
    return image;
  }

  getEntity = async (postsFileStorages, tag) => {
    let entity = {};
    if (postsFileStorages !== undefined) {
      entity = postsFileStorages.find(relation => relation.tag === tag);
    }
    return entity;
  }

  /**
   *
   * @param String targetId
   * @param String municipalityId
   * @param Number to
   * @param Number of
   */
  async findToPosts(targetId, municipalityId, to = 6, of = 0) {
    const filter = {
      where: { status: true, municipalityId },
      order: ['created DESC'],
      limit: to,
      skip: of,
      include: [{
        relation: 'subCategory',
      }, {
        relation: 'postsFileStorages',
        scope: {
          include: [{
            relation: 'fileStorage'
          }]
        }
      }]
    };
    const posts = await this.endPoint([targetId, 'posts'])
      .request('get', null, filter);
    return posts.map(async ({
      id,
      created,
      content,
      title,
      subCategory,
      postsFileStorages
    }) => ({
      id,
      datePost: created,
      titlePost: title,
      contentPost: content,
      subCategories: subCategory !== undefined ? [subCategory.name] : [],
      imagePost: await this.getFile(postsFileStorages, 'mainImage'),
      type: await this.getEntity(postsFileStorages, 'mainImage').tag
    }));
  }
}

const PostsCategoriesApi = new PostsCategoriesService();
export default PostsCategoriesApi;
