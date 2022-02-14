import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 10vw;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
`;

const Filter = ({ onFilterInput, onBlur, value }) => {
  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        value={value}
        onChange={onFilterInput}
        onBlur={onBlur}
      />
    </Label>
  );
};

export default Filter;

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
