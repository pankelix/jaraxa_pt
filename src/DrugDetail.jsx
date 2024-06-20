import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useDrugsSearchById from './useDrugsSearchById'
import { Box, Typography } from '@mui/material'

export default function DrugDetail() {
    const { id } = useParams()
    const { drug, loading, error } = useDrugsSearchById(id)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Link to={'/'}>New Search</Link>

            <Box p={2}>
                <Typography variant="h4">{drug.openfda.brand_name[0]}</Typography>
                <Typography variant="subtitle1">Active Ingredients: {drug.openfda.substance_name.join(', ')}</Typography>
                <Typography variant="body1">Indications: {drug.indications_and_usage}</Typography>
                <Typography variant="body1">Dosage: {drug.dosage_and_administration}</Typography>
                <Typography variant="body1">Warnings: {drug.warnings}</Typography>
            </Box>

        </>
    );
}