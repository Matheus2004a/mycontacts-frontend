import HttpClient from './utils/HttpClient';

class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-backend.vercel.app');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(data) {
    return this.httpClient.post('/contacts', { body: JSON.stringify(data) });
  }
}

export default new ContactsServices();
