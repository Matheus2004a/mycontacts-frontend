import { Container, ListContainer } from './styles';

import useHome from './useHome';

import { Loader } from '../../components/Loader';
import Modal from '../../components/Modal';

import Header from './components/Header';
import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsLists from './components/ContactsLists';

export default function Home() {
  const {
    isLoading, isModalVisible, isLoadingDelete,
    handleCloseDeleteModal, handleConfirmDeleteContact,
    handleDeleteContact, handleToggleOrderBy,
    contacts, filteredContacts, contactBeginDeleted, getContacts,
    search, handleSearchContact, hasError, orderBy,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        visible={isModalVisible}
        danger
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <h1>Tem certeza que deseja remover o contato ”{contactBeginDeleted?.name}”?</h1>

        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearch
          value={search}
          onChange={handleSearchContact}
        />
      )}

      <Header
        hasError={hasError}
        qtdContacts={contacts.length}
        qtdContactsFiltered={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={getContacts} />}

      {!hasError && (
        <ListContainer orderBy={orderBy}>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyList />
          )}
          <>
            {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFound search={search} />
            )}

            <ContactsLists
              filteredContacts={filteredContacts}
              onToggleOrderBy={handleToggleOrderBy}
              onDeleteContact={handleDeleteContact}
            />
          </>
        </ListContainer>
      )}
    </Container>
  );
}
