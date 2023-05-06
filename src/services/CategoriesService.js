import HttpClient from './utils/HttpClient';

class CategoriesServices {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-backend.vercel.app');
  }

  async listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesServices();
