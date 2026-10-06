import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'

import './App.css'

import SearchBar from './components/SearchBar'
import PokemonCard from './components/PokemonCard'

function App() {
  const [pokemon, setPokemon] = useState('')
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const name = pokemon.trim().toLowerCase()

    if (!name) {
      setError('Digite o nome de um Pokémon.')
      setPokemonData(null)
      return
    }

    setLoading(true)
    setError('')
    setPokemonData(null)

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )

      if (!response.ok) {
        throw new Error('Pokémon não encontrado.')
      }

      const data = await response.json()

      setPokemonData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const pokemonTypes = useMemo(() => {
    if (!pokemonData) {
      return []
    }

    return pokemonData.types.map(
      (type) => type.type.name
    )
  }, [pokemonData])

  return (
    <Container maxWidth="md" className="app-container">
      <Box className="header">
        <Typography variant="h2" component="h1">
          PokéBusca
        </Typography>

        <Typography variant="body1">
          Pesquise informações sobre seus Pokémon favoritos.
        </Typography>
      </Box>

      <SearchBar
        pokemon={pokemon}
        setPokemon={setPokemon}
        onSearch={handleSearch}
        loading={loading}
      />

      <Box className="result-container">
        {loading && (
          <CircularProgress />
        )}

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {pokemonData && (
          <PokemonCard
            pokemonData={pokemonData}
            pokemonTypes={pokemonTypes}
          />
        )}
      </Box>
    </Container>
  )
}

export default App