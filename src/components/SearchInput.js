import { IconButton, InputAdornment, TextField } from '@mui/material';
import {Search} from "@mui/icons-material"
import React, { useState } from 'react'

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery)
  }
  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Search by name"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 300 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton type="submit" color="primary" aria-label='search by name'>
                <Search/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  )
}

export default SearchInput