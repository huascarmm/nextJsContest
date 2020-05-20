import HttpClient from '../../utils/http.client';
let instance = null;

class ProfileService extends HttpClient {
  constructor() {
    super('profiles');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getAvatar(userId) {
    const filter = {
      where: { userId },
      include: [{
        relation: 'profileFileStorages',
        scope: {
          where: { tag: 'avatar' },
          order: ['created DESC'],
          include: [{
            relation: 'fileStorage'
          }]
        }
      }]
    };
    let avatar = {};
    let link = '';
    try {
      const response = await this.request('get', null, filter);
      const profile = response.shift();
      if (profile.profileFileStorages !== undefined) {
        avatar = profile.profileFileStorages.shift().fileStorage;
        link = this.backendApi + [
          'file-storages',
          avatar.container,
          'download',
          avatar.name
        ].join('/');
        Object.assign(avatar, { link });
      }
    } catch (error) {
      console.error(error);
    }
    return avatar;
  }
}

const ProfileApi = new ProfileService();
export default ProfileApi;
