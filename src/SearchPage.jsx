import React, { useState, useEffect, useRef, useCallback } from "react";
import useDrugsSearch from "./useDrugsSearch";
import { Link } from "react-router-dom";
import { Box, ListItem, Skeleton, Stack, TextField } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SearchPage() {
    const [field, setField] = useState('')
    const [term, setTerm] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [limit, setLimit] = useState(20)
    const [recentSearches, setRecentSearches] = useState([])

    const { drugs, moreResults, loading, error } = useDrugsSearch(field, term, limit)

    useEffect(() => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(searches);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            setField('openfda.brand_name')
            setTerm(inputValue)
            setLimit(20)

            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            if (!recentSearches.includes(inputValue)) {
                if (recentSearches.length >= 10) {
                    recentSearches.pop(); // Limit to 10 recent searches
                }
                recentSearches.unshift(inputValue);
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
                setRecentSearches(recentSearches);
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleRecentSearchClick = (searchTerm) => {
        setInputValue(searchTerm)
        setField('openfda.brand_name')
        setTerm(searchTerm)
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

    return (
        <>
            <div className="flex items-center justify-center lg:justify-start">
                <Box gap={4} p={2}>
                    <TextField
                        id="outlined-basic"
                        label="Search by brand name"
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        onBlur={handleSearch}
                    />
                </Box>
            </div>

            <Box gap={4} p={2}>
                <div className="mx-2 mb-5">
                    <h2 className="mb-2 font-bold">Recently Searched:</h2>
                    <ul className="grid grid-cols-2 gap-1">
                        {recentSearches.map((search, index) => (
                            <li key={index}>
                                <button onClick={() => handleRecentSearchClick(search)}>{search}</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {drugs.map((drug, index) => {
                    if (drug.openfda && Object.keys(drug.openfda).length > 0) {
                        const brandName = drug.openfda.brand_name[0]
                        if (drugs.length === index + 1) {
                            return (
                                <Stack className="mb-2 bg-white rounded-md" spacing={1} ref={lastDrugElementRef} key={drug.id}>
                                    <ListItem>
                                        <div className="flex items-center justify-between w-full">
                                            <Link to={`/drug/${drug.id}`}>{brandName ? brandName : 'Unknown brand'}</Link>
                                            <ArrowForwardIcon />
                                        </div>
                                    </ListItem>
                                </Stack>
                            );
                        } else {
                            return (
                                <Stack className="mb-2 bg-white rounded-md" spacing={1} key={drug.id + drug.set_id}>
                                    <ListItem>
                                        <div className="flex items-center justify-between w-full">
                                            <Link to={`/drug/${drug.id}`}>{brandName ? brandName : 'Unknown brand'}</Link>
                                            <ArrowForwardIcon />
                                        </div>
                                    </ListItem>
                                </Stack>
                            );
                        }
                    } else {
                        return null;
                    }
                })}
            </Box>

            {loading ? (
                <div>
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeleton key={index} animation="wave" variant="text" width="100%" height={40} />
                    ))}
                </div>
            ) : ''}

            {error && 'Error'}
        </>
    )
}
