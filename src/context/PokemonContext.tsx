import React, { useState } from 'react'
import { IPokemon } from '../interfaces/reqResPokemon';

const PokemonContext = React.createContext({});

const PokemonProvider = ({ children }) => {
  const [pokemon1, setPokemon1] = useState<IPokemon>();
  const [pokemon2, setPokemon2] = useState<IPokemon>();
  const [pokemon1Data, setPokemon1Data] = useState();
  const [pokemon2Data, setPokemon2Data] = useState();
  return (
    <PokemonContext.Provider value={{ 
      pokemon1, 
      setPokemon1,
      pokemon2, 
      setPokemon2,
      pokemon1Data,
      setPokemon1Data,
      pokemon2Data,
      setPokemon2Data
     }}>
      { children }
    </PokemonContext.Provider>
  )
}

export {
  PokemonContext,
  PokemonProvider
}
