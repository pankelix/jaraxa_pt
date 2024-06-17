import React, { useState, useRef, useCallback } from "react";
import useDrugsSearch from "./useDrugsSearch";

export default function App() {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(15)

  const { drugs, moreResults, loading, error } = useDrugsSearch(search, limit)

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setLimit(15)
  }

  const observer = useRef()

  const lastDrugElementRef = useCallback(node => {
    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && moreResults) {
        setLimit(prevLimit => prevLimit + 15)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, moreResults])

  return (<>
    <input type="text" value={search} onChange={handleSearch} />

    {drugs.map((drug, index) => {
      if (drug.openfda && Object.keys(drug.openfda).length > 0) {
        const brandName = drug.openfda.brand_name[0]
        if (drugs.length === index + 1) {
          return <div ref={lastDrugElementRef} key={drug.id}>{brandName ? brandName : 'Unknown brand'}</div>
        } else {
          return <div key={/* drug.id */ index}>{brandName ? brandName : 'Unknown brand'}</div>
        }
      }
    })}

    <div>{loading && 'Loading...'}</div>

    <div>{error && 'Error'}</div>
  </>
  )
}
