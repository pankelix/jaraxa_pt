import { useEffect, useState } from 'react'

export default function useDrugsSearchById(id) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [drug, setDrug] = useState(null)

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(false);
            fetch(`https://api.fda.gov/drug/label.json?search=id:${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDrug(data.results[0]);
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    return { loading, error, drug }
}
