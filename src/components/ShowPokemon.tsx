import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PokemonContext} from '../context/PokemonContext';

export const ShowPokemon = ({pokemon, position}) => {
  const {pokemon1Data, pokemon2Data, setPokemon1Data, setPokemon2Data} =
    useContext(PokemonContext);

  const [attacks, setAttacks] = useState<any[]>([]);
  const sprite =
    position === 1
      ? pokemon.sprites.back_default
      : pokemon.sprites.front_default;
  const name = pokemon.name;
  const moves = pokemon.moves;

  const capitalizar = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getAttacks();
  }, []);

  const getAttacks = async () => {
    const movesPokemon = [];
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * moves.length);
      movesPokemon.push(pokemon.moves[index]);
    }
    const promises = [];
    for (const movePokemon of movesPokemon) {
      promises.push(fetch(movePokemon.move.url).then(res => res.json()));
    }
    const promisesResults = await Promise.all(promises);
    setAttacks(promisesResults);
  };

  const attackOponent = (attack) => {
    console.log('attack!');
    console.log(attack);
    if (position === 1) {
      setPokemon2Data({
        ...pokemon2Data,
        hp: pokemon2Data.hp - (attack.power || 0),
      });
    } else {
      setPokemon1Data({
        ...pokemon1Data,
        hp: pokemon1Data.hp -  (attack.power || 0),
      });
    }
  };

  const getHp = () => {
    if(pokemon.hp < 0) {
      pokemon.hp = 0;
    }
    return `${pokemon.hp}/${pokemon.max}`;
  }

  return (
    <View style={{backgroundColor: 'aliceblue'}}>
      <View>
        <Text
          style={[
            styles.marginTop,
            position === 2 ? styles.frontPokemonName : styles.backPokemonName,
          ]}>
          {capitalizar(name)}
        </Text>
        <Text style={[styles.pokemonHp, pokemon.hp <= 0 ? styles.isDead: {}]}>
          { getHp() }
        </Text>
      </View>

      <View style={styles.containerPokemonAttacks}>
        <View style={position === 2 ? styles.row : styles.rowReverse}>
          <View style={styles.pokemonAttacks}>
            {attacks.map((attack, key) => {
              return (
                <TouchableOpacity onPress={() => { attackOponent(attack) }} key={key}>
                  <Text style={styles.pokemonAttack}>{capitalizar(attack.name)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <Image
              style={[
                styles.imgPokemon,
                position === 2 ? styles.frontPokemon : styles.backPokemon,
              ]}
              source={{
                uri: sprite,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgPokemon: {
    width: 250,
    height: 250,
  },
  marginTop: {
    marginTop: 15,
  },
  frontPokemon: {
    marginLeft: 5,
  },
  backPokemon: {
    marginRight: 5,
  },
  frontPokemonName: {
    textAlign: 'right',
    marginRight: 100,
  },
  containerPokemonAttacks: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  backPokemonName: {
    marginLeft: 100,
  },
  pokemonAttacks: {
    width: 150,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pokemonAttack: {
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
    width: 150,
    paddingTop: 5,
    marginTop: 15,
  },
  pokemonHp: {
    width: 100,
    height: 20,
    backgroundColor: '#3b4cca',
    textAlign: 'center',
    marginRight: 100,
    color: 'white'
  },
  isDead: {
    backgroundColor: 'red',
  },
});
