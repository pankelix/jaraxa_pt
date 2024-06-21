import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDrugsSearchById(id) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [drug, setDrug] = useState(null)

    useEffect(() => {
        if (id) {
            setLoading(true)
            setError(false)
            axios({
                method: 'GET',
                url: 'https://api.fda.gov/drug/label.json',
                params: { search: `id:${id}` }
            }).then(res => {
                setDrug(res.data.results[0])
                setLoading(false)
            }).catch(error => {
                setError(true)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [id])

    return { loading, error, drug }
}
