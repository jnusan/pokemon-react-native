import React, { useContext, useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { usePokemon } from '../hooks/usePokemon';
import { PokemonContext } from '../context/PokemonContext'

type Props = {
  identifier: number
}

export const SelectPokemon: React.FC<Props> = ({ pokemonPos }) => {
  const { pokemon } = usePokemon();
  const [selectedIndexPokemon, setSelectedIndexPokemon] = useState<number>();
  const { setPokemon1, setPokemon2 } = useContext(PokemonContext);

  const handleSetSelectedIndexPokemon = (itemValue: number) => {
    // TODO: Research about useReducer with dispatch events to handle complex objects!
    setSelectedIndexPokemon(itemValue);
    switch (pokemonPos) {
      case 1:
        setPokemon1(pokemon[itemValue])
      break;
      case 2:
        setPokemon2(pokemon[itemValue])
      break;
    }
  }

  const capitalizar = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Picker
        selectedValue={selectedIndexPokemon}
        onValueChange={(itemValue: number) =>
          handleSetSelectedIndexPokemon(itemValue)
        }>
        <Picker.Item label={`Select Pokemon ${pokemonPos}`} value="" />
        {
          pokemon.map((x, index) => 
            <Picker.Item key={index} label={capitalizar(x.name)} value={index} />
          )
        }
      </Picker>
    </>
  )
}
