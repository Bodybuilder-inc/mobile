import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, BoxButtonSearch, SearchIcon, Input } from './styles';

interface InputSearchProps extends TextInputProps {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  active?: boolean;
}

const SearchBar: React.FC<InputSearchProps> = ({
  placeholder,
  onPress,
  value,
  active = false,
  ...rest
}) => {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        value={value}
        active={active}
        placeholderTextColor="#AEAEB3"
        {...rest}
      />
      <BoxButtonSearch onPress={onPress}>
        <SearchIcon />
      </BoxButtonSearch>
    </Container>
  );
};

export default SearchBar;
