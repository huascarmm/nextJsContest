import HttpClient from '../../utils/http.client';
let instance = null;

class ProfileFileStorageService extends HttpClient {
  constructor() {
    super('profile-file-storages');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  upload(containerName, formData) {
    const header = {
      'content-type': 'multipart/form-data'
    };
    return this.endPoint([containerName, 'upload']).request('post', formData, null, null, header);
  }

  download(containerName, fileName) {
    return this.endPoint([containerName, 'download', fileName]).request('get');
  }

  findFileInContainer(containerName, fileName) {
    return this.endPoint([containerName, 'files', fileName]).request('get');
  }
}

const ProfileFileStorageApi = new ProfileFileStorageService();
export default ProfileFileStorageApi;
