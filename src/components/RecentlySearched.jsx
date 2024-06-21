import { Box } from "@mui/material"
import React from "react"

export default function RecentlySearched({ recentSearches, onRecentSearchClick }) {
  return (
    <Box className="mx-6 my-4 h-fit lg:w-2/6">
      <h2 className="p-2 pl-4 text-white rounded-t-md bg-slate-400">Recently Searched:</h2>

      <ul className="grid grid-cols-3 gap-4 px-2 pt-2 pb-4 bg-white lg:gap-3 lg:grid-cols-2">
        {recentSearches.map((search, index) => (
          <li key={index} className="col-span-1">
            <button className="block w-full px-2 overflow-hidden font-bold text-left truncate" onClick={() => onRecentSearchClick(search)}>{search}</button>
          </li>
        ))}
      </ul>
    </Box>
  )
}
