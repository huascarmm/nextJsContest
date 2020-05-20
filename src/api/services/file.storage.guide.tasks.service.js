import HttpClient from '../../utils/http.client';
let instance = null;

class FileStorageGuideTasksService extends HttpClient {
  constructor() {
    super('file-storage-guide-tasks');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const FileStorageGuideTasksApi = new FileStorageGuideTasksService();
export default FileStorageGuideTasksApi;
