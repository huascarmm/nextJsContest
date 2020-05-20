import { apiGet, apiGet2 } from './primary';

function getPosts(where, aditionalFields = [], relation = []) {
  return apiGet(
    '/posts',
    where,
    ['title', 'content', 'created', ...aditionalFields],
    relation.map(r => ({
      relation: r.relation,
      scope: {
        fields: {
          id: true,
          ...r.subFields
        },
        where: { status: true, ...r.subWhere }
      }
    }))
  );
}

function getFile(postsFileStorages, tag) {
  let image = '';
  if (postsFileStorages !== undefined) {
    const filter = postsFileStorages.filter(p => p.tag === tag);
    image = filter.length > 0
      ? `https://storage.googleapis.com/${filter[0].fileStorage.container}/${
        filter[0].fileStorage.name
      }`
      : '';
  }
  return image;
}

function getListPosts(data) {
  const relations = [
    {
      relation: 'subCategory',
      subFields: { name: true },
      subWhere: [],
      subRelation: []
    },
    {
      relation: 'postsFileStorages',
      subFields: { fileStorageId: true },
      subWhere: [],
      subRelation: [{ relation: 'fileStorage' }]
    }
  ];

  return new Promise((succes, fail) => {
    apiGet2(
      `/posts-categories/${data.postsCategoryId}/posts`,
      { status: true, municipalityId: data.municipalityId },

      relations.map(r => ({
        relation: r.relation,
        scope: {
          where: { status: true, ...r.subWhere },
          include: r.subRelation
        }
      }))
    )
      .then(results => {
        const parsed = results.map(r => {
          const {
            id,
            created,
            content,
            title,
            subCategory,
            postsFileStorages
          } = r;

          return {
            id,
            datePost: created,
            titlePost: title,
            contentPost: content,
            subCategories: subCategory !== undefined ? [subCategory.name] : [],
            imagePost: getFile(postsFileStorages, 'mainImage'),
            type: postsFileStorages.tag
          };
        });

        succes(parsed);
      })
      .catch(err => {
        fail(err);
      });
  });
}

function getCompletePost(
  municipalityId,
  postsCategoryId,
  query = false,
  category = false,
  idPost = false
) {
  const relations = [
    {
      relation: 'user',
      subWhere: [],
      subRelation: [
        {
          relation: 'profile',
          scope: {
            include: [
              {
                relation: 'profileFileStorages',
                scope: { include: [{ relation: 'fileStorage' }] }
              }
            ]
          }
        }
      ]
    },
    {
      relation: 'subCategory',
      subFields: { name: true },
      subWhere: category ? { id: category } : {},
      subRelation: []
    },
    {
      relation: 'postsFileStorages',
      subFields: { fileStorageId: true },
      subWhere: [],
      subRelation: [{ relation: 'fileStorage' }]
    },
    { relation: 'shares', subWhere: [], subRelation: [] },
    { relation: 'comments', subWhere: [], subRelation: [] }
  ];

  const whereQ = query
    ? {
      or: [
        { title: { like: `%${query}%` } },
        { content: { like: `%${query}%` } }
      ]
    }
    : {};

  const whereId = idPost ? { id: idPost } : {};

  return new Promise((succes, fail) => {
    apiGet2(
      '/posts',
      Object.assign(
        {
          status: true,
          municipalityId,
          postsCategoryId
        },
        whereQ,
        whereId
      ),
      relations.map(r => ({
        relation: r.relation,
        scope: {
          where: { status: true, ...r.subWhere },
          include: r.subRelation
        }
      }))
    )
      .then(results => {
        const parsed = results
          .filter(f => f.user.profile !== undefined)
          .map(r => {
            const {
              id,
              created,
              content,
              title,
              subCategory,
              postsFileStorages,
              shares
            } = r;
            // eslint-disable-next-line
            const { first_name, last_name, profile } = r.user;

            let avatar = '';
            if (profile.profileFileStorages !== undefined) {
              const profileFileStorages = profile.profileFileStorages.find(
                row => row.tag === 'avatar'
              );
              avatar = `https://storage.googleapis.com/${
                profileFileStorages.fileStorage.container
              }/${profileFileStorages.fileStorage.name}`;
            }

            return {
              id,
              datePost: created,
              titlePost: title,
              contentPost: content,
              // eslint-disable-next-line
              nameAuthor: first_name + " " + last_name,
              avatar,
              subCategories:
                subCategory !== undefined ? [subCategory.name] : [],
              imagePost: getFile(postsFileStorages, 'mainImage'),
              linkFile: getFile(postsFileStorages, 'pdf'),
              sharesPost: shares !== undefined ? shares.length : 0,
              commentsPost: 2,
              likesPost: 12,
              disLikesPost: 7
            };
          });

        succes(parsed);
      })
      .catch(err => {
        fail(err);
      });
  });
}

function getSinglePost(idPost) {
  const relations = [
    {
      relation: 'user',
      subWhere: [],
      subRelation: [
        {
          relation: 'profile',
          scope: {
            include: [
              {
                relation: 'profileFileStorages',
                scope: { include: [{ relation: 'fileStorage' }] }
              }
            ]
          }
        }
      ]
    },
    {
      relation: 'subCategory',
      subFields: { name: true },
      subWhere: {},
      subRelation: []
    },
    {
      relation: 'postsFileStorages',
      subFields: { fileStorageId: true },
      subWhere: [],
      subRelation: [{ relation: 'fileStorage' }]
    },
    { relation: 'shares', subWhere: [], subRelation: [] },
    { relation: 'comments', subWhere: [], subRelation: [] }
  ];

  return new Promise((succes, fail) => {
    apiGet2(
      '/posts',
      {
        status: true,
        id: idPost
      },
      relations.map(r => ({
        relation: r.relation,
        scope: {
          where: { status: true, ...r.subWhere },
          include: r.subRelation
        }
      }))
    )
      .then(results => {
        const parsed = results
          .filter(f => f.user.profile !== undefined)
          .map(r => {
            const {
              id,
              created,
              content,
              title,
              subCategory,
              postsFileStorages,
              shares
            } = r;
            const {
              // eslint-disable-next-line
              first_name,
              // eslint-disable-next-line
              last_name,
              profile,
              hierarchy,
              username
            } = r.user;

            let avatar = '';
            if (profile.profileFileStorages !== undefined) {
              const profileFileStorages = profile.profileFileStorages.find(
                row => row.tag === 'avatar'
              );
              avatar = `https://storage.googleapis.com/${
                profileFileStorages.fileStorage.container
              }/${profileFileStorages.fileStorage.name}`;
            }
            return {
              id,
              datePost: created,
              titlePost: title,
              contentPost: content,
              // eslint-disable-next-line
              nameAuthor: first_name + " " + last_name,
              positionAuthor: hierarchy !== undefined ? hierarchy.title : '',
              avatar,
              subCategories:
                subCategory !== undefined ? [subCategory.name] : [],
              imagePost: getFile(postsFileStorages, 'mainImage'),
              linkFile: getFile(postsFileStorages, 'pdf'),
              sharesPost: shares !== undefined ? shares.length : 0,
              username,
              commentsPost: 2,
              likesPost: 12,
              disLikesPost: 7
            };
          });

        succes(parsed);
      })
      .catch(err => {
        fail(err);
      });
  });
}

function getSubcategories(categoriesId, aditionalFields = []) {
  return new Promise((success, fail) => {
    apiGet(
      `/posts-categories/${categoriesId}/sub-categories`,
      { status: true },
      ['name', 'id', ...aditionalFields]
    )
      .then(subCategories => {
        success(
          subCategories.map(s => ({
            id: s.id,
            title: s.name,
            description: 'Sub categoria',
            icon: 'gavel'
          }))
        );
      })
      .catch(error => {
        fail(error);
      });
  });
}
export {
  getPosts,
  getSubcategories,
  getCompletePost,
  getSinglePost,
  getListPosts
};
