import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "./TextField";



const SearchForm = () => {
  return (
    <TextField
      name="searchQuery"
      sx={{ width: 300 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
