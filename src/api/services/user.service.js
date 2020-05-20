/* eslint-disable class-methods-use-this */
import HierarchyApi from './hierarchy.service';
import HttpClient from '../../utils/http.client';
import jsonSchemaFileds from '../../utils/field.exclude.default';

let instance = null;

class UserService extends HttpClient {
  constructor() {
    super('users');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  login(form) {
    return this.endPoint('login').request('post', form);
  }

  signup(form, params) {
    return this.endPoint('signup').request('post', form, null, params);
  }

  invited(token) {
    return this.endPoint(['invited', token]).request('get');
  }

  me() {
    return this.endPoint('me').request('get');
  }

  getProfile(username) {
    return new Promise(async reject => {
      const filter = {
        where: { username },
        include: [
          {
            relation: 'profile'
          },
          {
            relation: 'userHierarchies',
            scope: {
              include: [
                {
                  relation: 'hierarchy',
                  scope: {
                    include: [
                      {
                        relation: 'guideTasks'
                      },
                      {
                        relation: 'parent'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      };
      let profile = {};
      try {
        const data = await this.find(filter);
        profile = data.shift();

        const filterParent = {
          include: [
            {
              relation: 'userHierarchies',
              scope: {
                include: [
                  {
                    relation: 'user',
                    scope: {
                      fields: jsonSchemaFileds('password')
                    }
                  }
                ]
              }
            }
          ]
        };
        if (profile.userHierarchies) {
          profile.userHierarchies.forEach(async relation => {
            const { hierarchy } = relation;
            if (hierarchy.parent) {
              const hierarchyResponse = await HierarchyApi.findById(
                hierarchy.parentId,
                filterParent
              );
              Object.assign(hierarchy, { parent: hierarchyResponse });
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
      reject(profile);
    });
  }
}

const UserApi = new UserService();
export default UserApi;
