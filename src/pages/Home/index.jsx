import { Alignment, Container, ListContainer } from './styles';

import useHome from './useHome';

import { Loader } from '../../components/Loader';
import Modal from '../../components/Modal';

import Header from './components/Header';
import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsLists from './components/ContactsLists';
import Spinner from '../../components/Spinner';

export default function Home() {
  const {
    isPending, isLoading, isModalVisible, isLoadingDelete,
    handleCloseDeleteModal, handleConfirmDeleteContact,
    handleDeleteContact, handleToggleOrderBy,
    contacts, filteredContacts, contactBeginDeleted, getContacts,
    search, handleSearchContact, hasError, orderBy,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!hasContacts && !isLoading);
  const isSearchEmpty = hasContacts && filteredContacts.length < 1;

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

      {hasContacts && (
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

      {isPending
        && (
          <Alignment>
            <Spinner size={16} />
          </Alignment>
        )}

      {hasError && <ErrorStatus onTryAgain={getContacts} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound search={search} />}

      {hasContacts && (
        <ListContainer orderBy={orderBy}>
          <ContactsLists
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />
        </ListContainer>
      )}
    </Container>
  );
}
