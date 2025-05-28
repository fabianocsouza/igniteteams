import type { TouchableOpacityProps } from "react-native";

import { Container, Title, type FilterStyleProps } from "./styles";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
  };

export function Filter({ title, isActive, ...rest }: Props) {
  return (
    <Container {...rest} isActive={isActive}>
      <Title>{title}</Title>
    </Container>
  );
}
