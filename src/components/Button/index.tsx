import { TouchableOpacityProps } from "react-native";

import { Title } from "@components/Highlight/styles";

import { ButtonTypeStyleProps, Container } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
}

export const Button = ({ title, type ='PRIMARY' , ...rest }: Props) => {
  return(
    <Container 
      type={type}
      {...rest}
    >
      <Title>{ title }</Title>
    </Container>
  );
}

