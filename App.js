import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList">
        <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Lista de Pokémon' }} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Detalhes do Pokémon' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
