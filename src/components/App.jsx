import { Component } from 'react';
import styled from 'styled-components';
import List from './List';
import ContactForm from './Form';
import Notification from './Notification';
import Filter from './Filter';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSameName = data => {
    return this.state.contacts.find(({ name }) => name === data.name);
  };

  onFormSubmit = data => {
    if (this.state.contacts.length === 0) {
      this.setState({ contacts: [data] });
      return;
    } else if (this.onSameName(data)) {
      alert(`${data.name} is already in contacts.`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [data, ...prevState.contacts],
      }));
      return;
    }
  };

  onInputHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterReset = () => {
    this.setState({ filter: '' });
  };

  onDeleteHandle = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />
        <h2>Contacts</h2>
        <Filter
          onFilterInput={this.onInputHandler}
          onBlur={this.filterReset}
          value={this.state.filter}
        />
        {this.state.contacts.length > 0 ? (
          <List contacts={filteredContacts} onDelete={this.onDeleteHandle} />
        ) : (
          <Notification />
        )}
      </Container>
    );
  }
}

export default App;
