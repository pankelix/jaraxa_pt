import { useEffect, useState } from 'react';

export default function useDrugsSearch(field, term, limit) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [drugs, setDrugs] = useState([]);
    const [total, setTotal] = useState(0);
    const [moreResults, setMoreResults] = useState(false);

    useEffect(() => {
        setDrugs([]);
    }, [term]);

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
                    setTotal(data.meta.results.total);
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

    return { loading, error, drugs, total, moreResults };
}
