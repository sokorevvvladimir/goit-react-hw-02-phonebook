import styled from 'styled-components';
import PropTypes from 'prop-types';

const Li = styled.li`
  font-size: 18px;
  font-weight: 500;
`;

const Button = styled.button`
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  margin-left: 10px;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const List = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ name, id, number }) => {
        return (
          <Li key={id}>
            {name}: {number}
            <Button
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </Button>
          </Li>
        );
      })}
    </ul>
  );
};

export default List;

List.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
