import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

function PokemonCard({ pokemonData, pokemonTypes }) {
  return (
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
          Tipo: {pokemonTypes.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PokemonCard