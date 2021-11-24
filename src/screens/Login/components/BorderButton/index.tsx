import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title, Button } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export function BorderButton({ title, ...rest }: Props) {
  return (
    <Container>
      <Button {...rest}>
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
