import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Container, Content, Icon } from "./style";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";


export const NewGroup = () => {
  const navigation = useNavigation();
  const [ group, setGroup ] = useState('')

  const handleNew = () => {
    navigation.navigate('players', {group})
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da Turma"
          onChangeText={setGroup}
        />
        <Button 
          title="Criar"
          style={{marginTop: 20}}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}