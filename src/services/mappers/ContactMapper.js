import { removeMaskPhone } from '../../utils/phone';

class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      category_id: domainContact.category,
      email: domainContact.email,
      name: domainContact.name,
      phone: removeMaskPhone(domainContact.phone),
    };
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      email: persistenceContact.email,
      name: persistenceContact.name,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.tbl_categories_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
