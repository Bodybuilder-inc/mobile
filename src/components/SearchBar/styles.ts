import styled, { css } from 'styled-components/native';
import { Dimensions, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

interface Props {
  active: boolean;
}

export const Container = styled.View`
  width: ${width * 0.7}px;
  height: 60px;
  background-color: #47474d;
  border-radius: 30px;
`;

export const Input = styled(TextInput)<Props>`
  flex: 1;
  margin-right: 60px;
  margin-left: 20px;
  color: #e1e1e8;
  ${({ active, theme }) =>
    active &&
    css`
      border-width: 3px;
      border-color: #03b252;
    `};
`;

export const BoxButtonSearch = styled(RectButton)`
  width: 60px;
  height: 60px;
  background-color: #dd3434;
  position: absolute;
  right: 0px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const SearchIcon = styled(FeatherIcon).attrs({
  name: 'search',
})`
  color: #fff;
  font-size: 25px;
`;
