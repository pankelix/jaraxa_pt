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
            let cancel
            axios({
                method: 'GET',
                url: 'https://api.fda.gov/drug/label.json',
                params: { search: `id:${id}` },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setDrug(res.data.results[0])
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
    }, [id])

    return { loading, error, drug }
}
