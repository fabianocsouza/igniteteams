import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';

type RouteParams = {
  group: string;
}

export const Players = () => {
  const [ newPlayerName, setNewPlayerName ] = useState('');
  const  [ team,  setTeam ] = useState("Time A");
  const [ players, setPlayers ] = useState([]);
  const routes = useRoute();
  const { group } = routes.params  as RouteParams;

  const handleAddPlayers = async () => {
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);
      const players =  await playersGetByGroup(group);
      console.log(players);
      
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova Pessoa', error.message);
      }else {
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar.');
      }
    }

  }
  return (
    <Container>
      <Header showBackButton/>

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
        onChangeText={setNewPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon 
          icon='add'
          onPress={handleAddPlayers}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A','Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      
      <FlatList
          data={players}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item}
              onRemove={()=> {}}
            />
          )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time.'/>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && { flex: 1}
        ]}
      />

      <Button
        title='Remover Turma'
        type='SECONDARY'
      />
    </Container>
  );
}