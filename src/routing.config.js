const routesConfig = [{
  name: 'index',
  pattern: '/inicio',
  page: 'index'
}, {
  name: 'PdfDateIntroLikes',
  pattern: '/inicio/gaceta/:publicationId',
  page: 'inicio/gaceta/matched'
}];
module.exports = routesConfig
