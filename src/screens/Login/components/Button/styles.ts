import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ButtonColorProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonColorProps>`
  width: 100%;

  padding: 17px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};

  margin: 10px;
  border-radius: 50px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_600};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
