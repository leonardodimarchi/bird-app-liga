export const environment = {
  production: false,
  mockupEnabled: true,
  config: {
    dbName: '__bird',
  },

  keys:{
    myComments: 'MY_COMMENTS_KEY',
  },

  api: {
    baseUrl: 'http://localhost:3000',
    comment: {
      list: '/comments?page={currentPage}&maxItens={maxItens}',
      listByCategoryId:'/categories/{categoryId}/comments?page={currentPage}&maxItens={maxItens}',
      create: '/comments',
    },
    categories: {
      list:'/categories?page={currentPage}&maxItens={maxItens}',
      create: '/categories',
    },
  },
};
