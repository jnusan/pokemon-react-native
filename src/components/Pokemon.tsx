import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { usePokemon } from '../hooks/usePokemon';
import { IPokemon } from '../interfaces/reqResPokemon';
import { PokemonContext } from '../context/PokemonContext'
import { SelectPokemon } from './SelectPokemon';
import axios from 'axios';

export const Pokemon = () => {
  const { pokemon1, pokemon2 } = useContext(PokemonContext);
  const [ pokemon1Result, setPokemon1Result ] = useState();
  const [ pokemon2Result, setPokemon2Result ] = useState();

  const startBattle = async () => {
    if(pokemon1 && pokemon2) {
      getPokemonInfo();
    }
  }

  const getPokemonInfo = async () => {
    const resp1 = await axios.get(pokemon1.url);
    const resp2 = await axios.get(pokemon2.url);
    console.log(resp1.data);
    console.log(resp2.data);
    setPokemon1Result(resp1.data);
    setPokemon2Result(resp2.data);
  }

  return (
    <>
      <View>
        <SelectPokemon pokemonPos={1}/>

        {
          pokemon1Result && 
          <Text>
            Pokemon 1 with info
          </Text>
        }

        <SelectPokemon pokemonPos={2}/>

        {
          pokemon2Result && 
          <Text>
            Pokemon 2 with info
          </Text>
        }

        <Button
          onPress={ startBattle }
          title="Fight!"
          color="#841584"
        />
      </View>
    </>
  )
}
