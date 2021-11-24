import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_dark};
`;

export const Header = styled.View`
  width: 100%;

  margin-top: ${getStatusBarHeight() + 10}px;

  align-items: center;
`;

export const HeaderContent = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ImageBackground = styled.Image`
  margin-top: 10px;

  width: 330px;
  height: 400px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  padding: 0 24px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};

  line-height: ${RFValue(20)}px;
  text-align: center;
`;

export const Form = styled.View`
  width: 100%;

  margin: 64px 0;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  padding: 0 70px;
`;
