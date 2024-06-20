import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useDrugsSearchById from './useDrugsSearchById'

export default function DrugDetail() {
    const { id } = useParams()
    const { drug, loading, error } = useDrugsSearchById(id)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Link to={'/'}>New Search</Link>

            <div>
                <h1>{drug.openfda.brand_name[0]}</h1>
                <p>{drug.warnings[0]}</p>
            </div>

        </>
    );
}