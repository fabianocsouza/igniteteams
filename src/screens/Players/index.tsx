import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export const Players = () => {
  const [ newPlayerName, setNewPlayerName ] = useState('');
  const  [ team,  setTeam ] = useState("Time A");
  const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const routes = useRoute();
  const { group } = routes.params  as RouteParams;

  const newPlayerNameInput = useRef<TextInput>(null);

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
      newPlayerNameInput.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
      
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova Pessoa', error.message);
      }else {
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar.');
      }
    }
  }

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    }
  }

  const handlePlayerRemove = async ( playerName: string) => {
    try {
      await playerRemoveGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
    }
  }

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remover group', 'Não foi possível remover o group.');
    }
  }

  const handleGroupRemove = async () => {
      Alert.alert(
        'Remove',
        'Deseja remover o grupo?',
        [
          {text: 'Não', style: 'cancel'},
          {text: 'Sim', onPress: () => groupRemove()}
        ]
      );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  },[team]);
  return (
    <Container>
      <Header showBackButton/>

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInput}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onSubmitEditing={handleAddPlayers}
          returnKeyType="done"
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
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item.name}
              onRemove={()=> handlePlayerRemove(item.name)}
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
        onPress={handleGroupRemove}
      />
    </Container>
  );
}