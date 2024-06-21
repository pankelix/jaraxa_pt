import { useEffect, useState } from 'react'

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
            setLoading(true);
            setError(false);
            fetch(`https://api.fda.gov/drug/label.json?search=${field}:${term}&limit=${limit}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDrugs(prevDrugs => [...prevDrugs, ...data.results]);
                    setMoreResults(data.meta.results.total > limit);
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [field, term, limit]);

    return { loading, error, drugs, moreResults }
}
