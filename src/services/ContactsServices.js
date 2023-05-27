import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient('https://mycontacts-frontend-matheus-aurelio.vercel.app');
  }

  async listContacts(signal, orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, { signal });
    return contacts.map(ContactMapper.toDomain);
  }

  async listContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
  }

  createContact(data) {
    const body = ContactMapper.toPersistence(data);
    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, data) {
    const body = ContactMapper.toPersistence(data);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsServices();
