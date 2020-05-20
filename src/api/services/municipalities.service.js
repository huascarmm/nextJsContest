import HttpClient from '../../utils/http.client';
let instance = null;

class MunicipalitiesService extends HttpClient {
  constructor() {
    super('municipalities');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getMunicipalityDepartmen(id) {
    const filter = {
      include: [{
        relation: 'municipalDepartment',
        scope: {
          fields: ['id', 'name', 'description', 'icon'],
          where: { status: true }
        }
      }]
    };
    const municipalityDepartments = await this.endPoint([id, 'municipal-department-municipalities']).request('get', null, filter);
    const entrities = municipalityDepartments.map((entity) => entity.municipalDepartment || {});
    return entrities;
  }

  async getFeatures(municipalityId = '') {
    const filter = {
      where: { status: true },
      fields: { description: true, featureId: true },
      include: [{
        relation: 'feature',
        scope: {
          fields: {
            name: true,
            category: true,
            link: true,
            icon: true,
            id: true,
          },
          where: { status: true },
        },
      }]
    }
    const features1 = await this.endPoint([municipalityId, 'municipality-features']).request('get', null, filter);
    const features = features1.map(municipality => {
      if (municipality.feature !== undefined) {
        return {
          name: municipality.feature.name,
          category: municipality.feature.category,
          link: municipality.feature.link,
          icon: municipality.feature.icon,
          shortDescription: municipality.description,
        }
      }
    })

    const filterChannel = {
      where: { status: true },
      fields: { channelId: true },
      include: [{
        relation: 'channel',
        scope: {
          fields: {
            id: true,
            type: true,
            content: true,
          },
          where: { status: true },
        },
      }]
    }
    const channels1 = await this.endPoint([municipalityId, 'municipality-channels']).request('get', null, filterChannel);

    const channels = channels1
      .filter((c) => c.channel !== undefined)
      .map(({ channel }) => ({
        type: channel.type,
        content: channel.content,
      }));
    return { features, channels }
  }

  async getDepartments(municipalityId) {
    const filter = {
      fields: ['municipalDepartmentId'],
      include: [{
        relation: 'municipalDepartment',
        scope: {
          fields: ['id', 'name', 'description', 'icon'],
          where: { status: true },
        }
      }]
    }
    let departments = await this.endPoint([municipalityId, 'municipal-department-municipalities']).request('get', null, filter);

    departments = departments.filter(
      (f1) => f1.municipalDepartment !== undefined
    );
    return departments;
  }
}

const MunicipalitiesApi = new MunicipalitiesService();
export default MunicipalitiesApi;
