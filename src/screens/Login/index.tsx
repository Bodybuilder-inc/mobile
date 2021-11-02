import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import BodyBuilderBackGround from "../../assets/background-login.png";
import Logo from "../../assets/logo-bodybuilder.svg";
import theme from "../../styles/theme";
import { BorderButton } from "./components/BorderButton";
import { Button } from "./components/Button";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  ImageBackground,
  HeaderContent,
} from "./styles";

export function Login() {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo width={70} height={70} />
          <Title>BodyBuilder</Title>
        </HeaderContent>
        <ImageBackground source={BodyBuilderBackGround} />
      </Header>

      <Footer>
        <SubTitle> Conecte-se {"\n"}agora mesmo 💪</SubTitle>

        <Button title="CRIAR CONTA" color={theme.colors.shape} />
        <BorderButton title="LOGIN" />
      </Footer>
    </Container>
  );
}
