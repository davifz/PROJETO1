import { Box, Button, TextField } from '@mui/material'

function SearchBar({ pokemon, setPokemon, onSearch, loading }) {
  return (
    <Box className="search-container">
      <TextField
        fullWidth
        label="Nome do Pokémon"
        placeholder="Ex.: pikachu"
        value={pokemon}
        onChange={(event) => setPokemon(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch()
          }
        }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={onSearch}
        disabled={loading}
      >
        Pesquisar
      </Button>
    </Box>
  )
}

export default SearchBar