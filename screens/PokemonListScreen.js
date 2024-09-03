import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PokemonListScreen = ({ navigation }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailResponse = await fetch(pokemon.url);
          const pokemonDetailData = await pokemonDetailResponse.json();
          return {
            name: pokemon.name,
            imageUrl: pokemonDetailData.sprites.front_default,
            type: pokemonDetailData.types[0].type.name,
            details: pokemonDetailData,
          };
        })
      );

      setPokemonData(pokemonDetails);
      setFilteredData(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados de Pokémon:', error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(pokemonData);
    }
  };

  const handlePress = (pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  const { width } = Dimensions.get('window');
  const cardWidth = (width - 32) / 2; // Largura do cartão, considerando margem
  const cardHeight = cardWidth * 1.2; // Altura do cartão proporcional à largura

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#EF5350" />
      ) : (
        <>
          <Text style={styles.title}>Pokémon</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar Pokémon"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.list}
            numColumns={2} // Ajusta para 2 colunas por linha
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)} style={[styles.card, { width: cardWidth, height: cardHeight }]}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window'); // Obtém a largura da tela

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#00796b',
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#00796b',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 8,
    paddingTop: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    borderColor: 'cyan',
    borderWidth: 2,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 16,
    marginBottom: 8,
  },
});

export default PokemonListScreen;
