import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDrugsSearch(search, limit) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [drugs, setDrugs] = useState([])
    const [moreResults, setMoreResults] = useState(false)

    useEffect(() => {
        setDrugs([])
    }, [search])

    useEffect(() => {
        if (search) {
            setLoading(true)
            setError(false)
            let cancel
            axios({
                method: 'GET',
                url: 'https://api.fda.gov/drug/label.json',
                /* params: { search: '_exists_:openfda', limit: limit }, */
                params: { search: `openfda.brand_name:${search}`, limit: limit }, //brand name, brand name, substance name
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setDrugs(prevDrugs => {
                    return [...prevDrugs, ...res.data.results]
                })
                console.log(res.data)
                setMoreResults(res.data.meta.results.total > limit)
                setLoading(false)
            }).catch(error => {
                if (axios.isCancel(error)) return
                setError(true)
                setLoading(false)
            })
            return () => cancel()
        }
    }, [search, limit])

    return { loading, error, drugs, moreResults }
}
