import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Container, Content, Icon, SafeArea } from "./styles";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

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
