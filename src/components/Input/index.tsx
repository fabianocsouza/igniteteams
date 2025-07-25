import { useTheme } from "styled-components/native";
import type { TextInput, TextInputProps } from "react-native";

import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput | null>;
};

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
