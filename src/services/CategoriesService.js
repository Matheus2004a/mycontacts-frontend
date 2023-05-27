import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesServices {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-frontend-matheus-aurelio.vercel.app');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesServices();
