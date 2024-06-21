import React from "react"
import { Box, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"

export default function SearchInput({ value, onChange, onSearch, onKeyPress }) {
  return (
    <div className="flex items-center justify-center w-[80%] mx-2 mt-10 mb-5 lg:justify-start">
      <Box p={2} className="flex items-end w-full mr-3">
        <Search sx={{ color: 'white', mr: 1, my: 1, fontSize: 34 }} />
        <TextField
          className="bg-white rounded-xl"
          fullWidth
          margin="none"
          size="small"
          id="standard-basic"
          InputProps={{ sx: { padding: '0.2rem', paddingLeft: '1rem' } }}
          InputLabelProps={{ sx: { paddingLeft: '1rem' } }}
          label="Search by brand name"
          variant="standard"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyPress}
          onBlur={onSearch}
        />
      </Box>
    </div>
  )
}
