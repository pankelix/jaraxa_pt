import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDrugsSearch(field, term, limit) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [drugs, setDrugs] = useState([])
    const [moreResults, setMoreResults] = useState(false)

    useEffect(() => {
        setDrugs([])
    }, [term])

    useEffect(() => {
        if (term) {
            setLoading(true)
            setError(false)
            let cancel
            axios({
                method: 'GET',
                url: 'https://api.fda.gov/drug/label.json',
                params: { search: `${field}:${term}`, limit: limit },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setDrugs(prevDrugs => {
                    return [...prevDrugs, ...res.data.results]
                })
                setMoreResults(res.data.meta.results.total > limit)
                setLoading(false)
            }).catch(error => {
                if (axios.isCancel(error)) return
                setError(true)
                setLoading(false)
            })
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [field, term, limit])

    return { loading, error, drugs, moreResults }
}
