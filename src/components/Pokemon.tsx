import React, { useContext, useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PokemonContext } from '../context/PokemonContext'
import { SelectPokemon } from './SelectPokemon';
import { ShowPokemon } from './ShowPokemon';
import axios from 'axios';

export const Pokemon = () => {
  const { pokemon1, pokemon2,  pokemon1Data, setPokemon1Data, pokemon2Data, setPokemon2Data } = useContext(PokemonContext);
  const [ loadingPokemonInfo, setLoadingPokemonInfo ] = useState();

  const startBattle = async () => {
    if(pokemon1 && pokemon2) {
      await getPokemonInfo();
    }
  }

  const getPokemonData = (data) => {
    return {
      hp: data.stats[0].base_stat,
      sprites: data.sprites,
      name: data.name,
      moves: data.moves,
      max: data.stats[0].base_stat
    }
  }

  const getPokemonInfo = async () => {
    setLoadingPokemonInfo(true);
    const resp1 = await axios.get(pokemon1.url);
    const resp2 = await axios.get(pokemon2.url);
    setPokemon1Data(getPokemonData(resp1.data));
    setPokemon2Data(getPokemonData(resp2.data));
    setLoadingPokemonInfo(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <SelectPokemon pokemonPos={1}/>
          <SelectPokemon pokemonPos={2}/>
          <Button
            onPress={ startBattle }
            title={loadingPokemonInfo ? 'Loading pokemon...' : 'Fight!'}
            color="#841584"
            disabled={loadingPokemonInfo ? true : false}
          />

          <View>
            {
              pokemon2Data && 
              <ShowPokemon pokemon={pokemon2Data} position={2}/>
            }
            {
              pokemon1Data && 
              <ShowPokemon pokemon={pokemon1Data} position={1} />
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
