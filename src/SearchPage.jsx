import React, { useState, useRef, useCallback } from "react";
import useDrugsSearch from "./useDrugsSearch";
import { Link } from "react-router-dom";
import { Box, ListItem, Skeleton, Stack, TextField } from "@mui/material";

export default function SearchPage() {
    const [field, setField] = useState('')
    const [term, setTerm] = useState('')
    const [limit, setLimit] = useState(20)

    const { drugs, moreResults, loading, error } = useDrugsSearch(field, term, limit)

    const handleSearch = (event) => {
        setField('openfda.brand_name')
        setTerm(event.target.value)
        setLimit(20)
    }

    const observer = useRef()

    const lastDrugElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && moreResults) {
                setLimit(prevLimit => prevLimit + limit)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, moreResults, limit])

    return (<>
        <Box gap={4} p={2}>
            <TextField id="outlined-basic" label="Search by brand name" variant="outlined" value={term} onChange={handleSearch} />
        </Box>

        <Box gap={4} p={2}>
            {drugs.map((drug, index) => {
                if (drug.openfda && Object.keys(drug.openfda).length > 0) {
                    const brandName = drug.openfda.brand_name[0]
                    if (drugs.length === index + 1) {
                        return <Stack spacing={1} ref={lastDrugElementRef} key={drug.id}>
                            <ListItem>
                                <Link to={`/drug/${drug.id}`}>{brandName ? brandName : 'Unknown brand'}</Link>
                            </ListItem>
                        </Stack>
                    } else {
                        return <Stack spacing={1} key={drug.id + drug.set_id}>
                            <ListItem>
                                <Link to={`/drug/${drug.id}`}>{brandName ? brandName : 'Unknown brand'}</Link>
                            </ListItem>
                        </Stack>
                    }
                } else {
                    return null
                }
            })}
        </Box>

        {loading ? <div>
            {Array.from({ length: limit }).map((_, index) => (
                <Skeleton key={index} animation="wave" variant="text" width="100%" height={40} />
            ))}
        </div> : ''}

        {error && 'Error'}

    </>
    )
}