import React from "react"
import { Box, TextField } from "@mui/material"

export default function SearchInput({ value, onChange, onSearch, onKeyPress }) {
  return (
    <div className="flex items-center justify-center mx-2 mt-10 mb-5 lg:justify-start">
      <Box p={2}>
        <TextField className="bg-white"
          id="outlined-basic"
          label="Search by brand name"
          variant="outlined"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyPress}
          onBlur={onSearch}
        />
      </Box>
    </div>
  )
}
