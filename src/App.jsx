import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import './App.css'

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

      <Box className="search-container">
        <TextField
          fullWidth
          label="Nome do Pokémon"
          placeholder="Ex.: pikachu"
          value={pokemon}
          onChange={(event) => setPokemon(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch()
            }
          }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          disabled={loading}
        >
          Pesquisar
        </Button>
      </Box>

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
          <Card className="pokemon-card">
            <CardMedia
              component="img"
              image={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="pokemon-image"
            />

            <CardContent>
              <Typography variant="h4" component="h2">
                {pokemonData.name}
              </Typography>

              <Typography variant="body1">
                ID: #{pokemonData.id}
              </Typography>

              <Typography variant="body1">
                Altura: {pokemonData.height / 10} m
              </Typography>

              <Typography variant="body1">
                Peso: {pokemonData.weight / 10} kg
              </Typography>

              <Typography variant="body1">
                Tipo: {pokemonData.types
                  .map((type) => type.type.name)
                  .join(', ')}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  )
}

export default App