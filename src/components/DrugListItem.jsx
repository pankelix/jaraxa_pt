import React, { forwardRef } from "react"
import { ListItem, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const DrugListItem = forwardRef(({ drug }, ref) => {
  const brandName = drug.openfda.brand_name ? drug.openfda.brand_name[0] : "Unknown brand"

  return (
    <Stack className="mb-2 bg-white rounded-md" spacing={1} ref={ref}>
      <ListItem>
        <div className="flex items-center justify-between w-full">
          <Link to={`/drug/${drug.id}`}>{brandName}</Link>
          <ArrowForwardIcon />
        </div>
      </ListItem>
    </Stack>
  )
})

export default DrugListItem
