import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const PokemonDetailScreen = ({ route }) => {
  const { pokemon } = route.params;
  const { width } = Dimensions.get('window'); // Obtém a largura da tela
  const cardWidth = (width - 32) / 2; // Largura do cartão, considerando margem
  const cardHeight = cardWidth * 1.2; // Altura do cartão proporcional à largura

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
        <Text style={styles.typeText}>{pokemon.type.toUpperCase()}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Detalhes:</Text>
          <Text style={styles.detailText}>Altura: {pokemon.details.height / 10} m</Text>
          <Text style={styles.detailText}>Peso: {pokemon.details.weight / 10} kg</Text>
          <Text style={styles.detailText}>Base de Experiencia: {pokemon.details.base_experience}</Text>
          <Text style={styles.detailText}>Abilidades:</Text>
          {pokemon.details.abilities.map((ability, index) => (
            <Text key={index} style={styles.detailText}>- {ability.ability.name}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window'); // Obtém a largura da tela


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Fundo com uma cor clara e fresca
    alignItems: 'center',
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff', // Fundo dos cartões
    borderRadius: 12,
    padding: 16,
    margin: 16,
    width: 290, // Ajuste da largura para caber na tela
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'cyan', // Borda verde clara
    borderWidth: 2, // Largura da borda
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    marginTop:200
  },
  image: {
    width: 150, // Tamanho ajustado da imagem
    height: 150,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginVertical: 8,
  },
  typeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  detailsContainer: {
    width: '100%',
    padding: 8,
    alignItems: 'flex-start',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
});

export default PokemonDetailScreen;
