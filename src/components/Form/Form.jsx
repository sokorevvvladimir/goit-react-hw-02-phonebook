import react, { Component } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormHtml = styled.form`
  border: 2px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30vw;
  height: 150px;
  padding: 10px;
  background-image: repeating-linear-gradient(
    -45deg,
    #1cadca,
    #1cadca 10px,
    #25515a 10px,
    #25515a 20px
  );
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #ffffff;
`;

const Input = styled.input`
  width: 10vw;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
`;

const Button = styled.button`
  width: 7vw;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const initialState = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = initialState;

  onInputHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  objectCompiler = () => {
    return { ...this.state, id: nanoid() };
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.objectCompiler());
    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <>
        <FormHtml onSubmit={this.onSubmitHandler}>
          <Label>
            Name
            <Input
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.onInputHandler}
            />
          </Label>
          <Label>
            Number
            <Input
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.onInputHandler}
            />
          </Label>
          <Button type="submit">Add contact</Button>
        </FormHtml>
      </>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
