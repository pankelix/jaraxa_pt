import React, { useState, useRef, useCallback, useEffect } from "react"
import useDrugsSearch from "../logic/useDrugsSearch"
import DrugList from "../components/DrugList"
import RecentlySearched from "../components/RecentlySearched"
import SearchInput from "../components/SearchInput"

export default function SearchPage() {
    const [field, setField] = useState('')
    const [term, setTerm] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [limit, setLimit] = useState(20)
    const [recentSearches, setRecentSearches] = useState([])

    const { drugs, moreResults, loading, error, total } = useDrugsSearch(field, term, limit)

    useEffect(() => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
        setRecentSearches(searches)
    }, [])

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)
        setField('openfda.brand_name')
        setTerm(value)
        setLimit(20)
    }

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
            if (!searches.includes(inputValue)) {
                if (searches.length >= 12) {
                    searches.pop()
                }
                searches.unshift(inputValue)
                localStorage.setItem('recentSearches', JSON.stringify(searches))
                setRecentSearches(searches)
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleBlur = () => {
        handleSearch()
    }

    const handleRecentSearchClick = (searchTerm) => {
        setInputValue(searchTerm)
        setField('openfda.brand_name')
        setTerm(searchTerm)
        setLimit(20)
    }

    const observer = useRef()

    const lastDrugElementRef = useCallback((lastDrugElement) => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && moreResults) {
                setLimit((prevLimit) => prevLimit + 1)
            }
        })
        if (lastDrugElement) observer.current.observe(lastDrugElement)
    }, [loading, moreResults])

    return (
        <>
            <div className="flex flex-col items-center pt-10 bg-gradient-to-r from-blue-500 to-lime-500">
                <h1 className="text-2xl font-bold text-white mt-7 lg:mt-10 lg:text-3xl">OPENFDA Medicine search</h1>
                <SearchInput
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                />
            </div>

            <div className="flex flex-col lg:flex-row-reverse lg:mx-32 lg:justify-between">
                {recentSearches.length !== 0 && <RecentlySearched
                    recentSearches={recentSearches}
                    onRecentSearchClick={handleRecentSearchClick}
                    className="lg:w-1/3"
                />}

                <DrugList
                    drugs={drugs}
                    recentSearches={recentSearches}
                    loading={loading}
                    limit={limit}
                    total={total}
                    error={error}
                    lastDrugElementRef={lastDrugElementRef}
                    className="lg:w-2/3"
                />
            </div>
        </>
    )
}
