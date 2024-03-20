import { FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';


import { Container } from'./styles';

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
      navigation.navigate('new');
  }
  const handleOpenGroup = (group: string) => {
      navigation.navigate('players', {group})
  }

  const fetchGroups = async () => {
    try {
      
      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => { 
    fetchGroups();
  },[]));

  return (
      <Container>
        <Header  />
        <Highlight
          title='Turmas'
          subtitle='Jogue com a sua turma'
       />
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          ) }
          contentContainerStyle={groups.length === 0 && { flex:1 } }
          ListEmptyComponent={() => (
            <ListEmpty 
              message='Que tal cadastrar a primeira turma?'
            />
          )}
          showsVerticalScrollIndicator={false}
        />
       
       <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
       />
      </Container>
  );
}

