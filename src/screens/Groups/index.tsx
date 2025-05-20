import { useState } from "react";
import { FlatList } from "react-native";

import { Container, SafeArea } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(["Galera da Rocket"]);
  return (
    <Container>
      <SafeArea>
        <Header />

        <Highlight title="Turmas" subtitle="jogue com a sua turma" />

        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <GroupCard title={item} />}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />

        <Button title="Criar nova turma" />
      </SafeArea>
    </Container>
  );
}
