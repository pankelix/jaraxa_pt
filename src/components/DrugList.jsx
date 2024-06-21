import React from "react"
import { Box, Skeleton } from "@mui/material"
import DrugListItem from "../components/DrugListItem"

export default function DrugList({ drugs, recentSearches, loading, total, limit, lastDrugElementRef, error }) {
    return (
        <Box p={2} className={recentSearches.length === 0 ? "lg:mt-7 mx-2 lg:w-full": "lg:mt-7 mx-2 lg:w-4/6" }>
            <div className="flex items-center justify-center mb-2 lg:justify-start">
                <h2 className="w-full p-2 pl-4 text-slate-500 rounded-t-md ">{drugs.length === 0 ? 'Please, make a search:': `${total} results: `}</h2>
            </div>

            {drugs.map((drug, index) => (
                <DrugListItem
                    key={drug.id}
                    drug={drug}
                    isLast={drugs.length === index + 1}
                    ref={drugs.length === index + 1 ? lastDrugElementRef : null}
                />
            ))}

            {loading && (
                <div>
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeleton key={index} animation="wave" variant="text" width="100%" height={40} />
                    ))}
                </div>
            )}

            {error && <div className="px-2 py-1 bg-white rounded-md">
                <p>No results found</p>
            </div>}
        </Box>
    )
}
