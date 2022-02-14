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

  transferFilterState = () => {
    return this.state.filter;
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

  render() {
    const { contacts, filter } = this.state;
    let filteredContacts = [];

    contacts.map(contact => {
      if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
        filteredContacts.push(contact);
        return;
      }
    });

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />
        <h2>Contacts</h2>
        <Filter
          onFilterInput={this.onInputHandler}
          onBlur={this.filterReset}
          onValue={this.transferFilterState}
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
