import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useDrugsSearchById from '../logic/useDrugsSearchById'
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { KeyboardDoubleArrowDown, Map, Vaccines, Warning, DoNotDisturb, PanTool, PregnantWoman, LocalHospital, HealthAndSafety, FactoryOutlined } from '@mui/icons-material'
import { Reply } from '@mui/icons-material'

export default function DrugDetail() {
    const { id } = useParams()
    const { drug, loading, error } = useDrugsSearchById(id)

    if (loading) return <div>Loading...</div>
    if (error) return <div className="px-2 py-1 bg-white rounded-md">
        <p>No result found</p>
    </div>

    return (
        <>
            <div className="flex flex-col lg:mx-32 ">
                <div className='mx-6 mt-10 mb-5 border-b border-neutral-200'>
                    <Link to={'/'}>
                        <button className='flex items-center px-2 py-1'>
                            <Reply sx={{ color: 'grey', mr: 1, my: 1, fontSize: 34 }} />
                            <p className='text-neutral-500'>New search</p>
                        </button>
                    </Link>
                </div>

                <Box p={2} className="flex flex-col gap-4">
                    <div className='flex flex-col border-b-2 lg:flex-row lg:items-center lg:justify-between'>
                        <Typography className='p-2 ' variant="h5">{drug.openfda.brand_name[0]}</Typography>
                        <Typography className='p-2 text-green-400' variant="h6">Active Ingredients: {drug.openfda.substance_name.join(', ')}</Typography>
                        <Box className="flex items-center">
                            <FactoryOutlined className='pb-1' />
                            <Typography className='p-2' variant="h8">Manufacturer: {drug.openfda.manufacturer_name || 'None'}</Typography>
                        </Box>
                    </div>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="indications">
                            <Box className="flex items-center gap-3">
                                <Map />
                                <Typography variant="h6">Indications and usage</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails className='flex flex-col gap-2'>
                            <Typography className='p-2' variant="body1">{drug.indications_and_usage || 'None'}</Typography>
                            <Typography className='p-2' variant="body1">Route: {drug.openfda.route || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="dosage">
                            <Box className="flex items-center gap-3">
                                <Vaccines />
                                <Typography variant="h6">Dosage and administration</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.dosage_and_administration || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="warnings">
                            <Box className="flex items-center gap-3">
                                <Warning />
                                <Typography variant="h6">Warnings</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.warnings || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="do-not-use">
                            <Box className="flex items-center gap-3">
                                <DoNotDisturb />
                                <Typography variant="h6">Do not use if...</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.do_not_use || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="stop-use">
                            <Box className="flex items-center gap-3">
                                <PanTool />
                                <Typography variant="h6">Stop use if...</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.stop_use || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="pregnancy-or-breestfeeding">
                            <Box className="flex items-center gap-3">
                                <PregnantWoman />
                                <Typography variant="h6">Pregnancy or breastfeeding</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.pregnancy_or_breast_feeding || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="ask-doctor">
                            <Box className="flex items-center gap-3">
                                <LocalHospital />
                                <Typography variant="h6">Ask a doctor...</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails className='flex flex-col gap-2'>
                            <Typography className='p-2' variant="body1">{drug.ask_doctor}</Typography>
                            <Typography className='p-2' variant="body1">{drug.ask_doctor_or_pharmacist || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardDoubleArrowDown />}
                            id="other-information">
                            <Box className="flex items-center gap-3">
                                <HealthAndSafety />
                                <Typography variant="h6">Other information</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className='p-2' variant="body1">{drug.other_safety_information || 'None'}</Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Typography className='p-2' variant="h8">{drug.questions}</Typography>
                </Box>
            </div>
        </>
    )
}