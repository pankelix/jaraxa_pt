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
        setInputValue(event.target.value)
    }

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            setField('openfda.brand_name')
            setTerm(inputValue)
            setLimit(20)

            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
            if (!recentSearches.includes(inputValue)) {
                if (recentSearches.length >= 12) {
                    recentSearches.pop()
                }
                recentSearches.unshift(inputValue)
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
                setRecentSearches(recentSearches)
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
                    onSearch={handleSearch}
                    onKeyPress={handleKeyPress}
                />
            </div>

            <div className="flex flex-col lg:mx-32">
                <div className="lg:flex lg:flex-row-reverse lg:justify-between">
                    {recentSearches.length > 0 && <RecentlySearched
                        recentSearches={recentSearches}
                        onRecentSearchClick={handleRecentSearchClick}
                    />}

                    <DrugList
                        drugs={drugs}
                        recentSearches={recentSearches}
                        loading={loading}
                        limit={limit}
                        total={total}
                        error={error}
                        lastDrugElementRef={lastDrugElementRef}
                    />
                </div>
            </div>
        </>
    )
}
