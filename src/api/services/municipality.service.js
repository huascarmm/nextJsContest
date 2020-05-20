import HttpClient from '../../utils/http.client';
import FileStorageApi from './file.storage.service';

let instance = null;

export class MunicipalityService extends HttpClient {
  constructor() {
    super('municipality');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async onInit(municipalityId) {
    const filter = {
      include: [{
        relation: 'municipalityFeatures',
        scope: {
          include: [{
            relation: 'feature'
          }]
        }
      }, {
        relation: 'municipalityChannels',
        scope: {
          include: [{
            relation: 'channel'
          }]
        }
      }]
    }
    const { municipalityFeatures, municipalityChannels } = await this.findById(municipalityId, filter);
    console.log(data)
    municipalityFeatures.map(relation => {
      if (relation.feature !== undefined) {
        return {
          name: relation.feature.name,
          category: relation.feature.category,
          link: relation.feature.link,
          icon: relation.feature.icon,
          shortDescription: relation.description,
        }
      }
    })
  }

  async hostingProgress(hostname) {
    const filter = {
      where: { host_name: { like: `%${hostname}%` } },
      fields: ['id', 'name'],
      include: [
        {
          relation: 'municipalityFileStorages',
          scope: {
            where: {
              description: { like: '%logotipo%' },
              status: true,
            },
            limit: 1,
            order: 'lastUpdated DESC',
            include: [
              {
                relation: 'fileStorage',
                scope: {
                  where: { status: true },
                },
              },
            ],
          },
        },
      ],
    };

    const response = await this.find(filter);

    const { municipalityFileStorages, ...municipality } = response.shift();

    if (municipalityFileStorages !== undefined) {
      const image = municipalityFileStorages.shift().fileStorage;
      Object.assign(municipality, {
        logotipo: FileStorageApi.getLinkTo(image),
      });
    }
    return municipality;
  }
}

const MunicipalityApi = new MunicipalityService();
export default MunicipalityApi;
