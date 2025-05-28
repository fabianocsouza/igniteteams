import { Container, Content, Icon, SafeArea } from "./styles";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

export function NewGroup() {
  return (
    <Container>
      <SafeArea>
        <Header showBackButton />

        <Content>
          <Icon />

          <Highlight
            title="Nova Turma"
            subtitle="crie uma turma para adicionar pessoas"
          />

          <Input placeholder="Nome da Turma" />

          <Button title="Criar" style={{ marginTop: 20 }} />
        </Content>
      </SafeArea>
    </Container>
  );
}
