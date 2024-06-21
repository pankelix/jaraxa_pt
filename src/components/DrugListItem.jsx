import React, { forwardRef } from "react"
import { ListItem, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const DrugListItem = forwardRef(({ drug }, ref) => {
  const brandName = drug.openfda.brand_name ? drug.openfda.brand_name[0] : "Unknown brand"

  return (
    <Stack className="mb-2 bg-white border rounded-md border-neutral-200" spacing={1} ref={ref}>
      <Link to={`/drug/${drug.id}`}>
        <ListItem>
          <div className="flex items-center justify-between w-full">
            <h1>{brandName}</h1>
            <ArrowForwardIcon sx={{ color: 'grey' }} />
          </div>
        </ListItem>
      </Link>
    </Stack>
  )
})

export default DrugListItem
