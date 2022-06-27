import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Pokemon } from './src/components/Pokemon'
import { PokemonProvider } from './src/context/PokemonContext'

const App = () => {

  return (
    <PokemonProvider>
      <Pokemon />
    </PokemonProvider>
  )
}

export default App
