import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import hotel from '../../../assets/images/hotel';

const CancellationHotel = ({ open, item, onHide }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        borderRadius: '10px',
    };


    return (
        <Modal open={open}>
            <Box sx={{ ...style, width: { xs: '90%', sm: '60%', md: '500px' } }}>

                <Typography sx={{
                    backgroundColor: 'var(--gray)',
                    fontSize: { xs: 12, lg: 18 },

                    borderRadius: '10px',
                    px: { xs: 2, md: 3 },
                    py: { xs: 1, md: 1.5 },
                    color: 'var(--primary)',

                }}>Cancellation Policy details</Typography>

                <Box sx={{
                    px: { xs: 2, md: 3 },
                    py: { xs: 1, md: 1 },
                }}>

                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "30px",
                            backgroundColor: "#F98A17",
                            borderRadius: "18px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            py: 1
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "65%",
                                height: "100%",
                                backgroundColor: "#00A19D",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#fff",
                                    fontSize: { xs: 9, md: 12 }
                                }}
                            >
                                100% Refund
                            </Typography>
                        </Box>


                        <Typography
                            sx={{
                                position: "absolute",
                                left: "80%",
                                transform: "translateX(-50%)",
                                color: "white",
                                fontSize: { xs: 9, md: 12 }

                            }}
                        >
                            Non Refundable
                        </Typography>


                        <Box sx={{
                            position: "absolute",
                            left: "7px",

                            top: "5px",
                            color: "#fff",
                            fontSize: { xs: 9, md: 11 }
                        }}>
                            <img src={hotel.circle} alt="" width={20} />
                        </Box>


                        <Box sx={{
                            position: "absolute",
                            right: "7px",
                            top: "5px",
                            color: "#fff",
                            fontSize: { xs: 9, md: 11 }
                        }}>
                            <img src={hotel.circle} alt="" width={20} />
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 0.5,
                            width: "100%",

                        }}
                    >
                        <Box
                            sx={{
                                width: "65%",
                                display: "flex",
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                                Now
                            </Typography>
                            <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                                25 Dec 10:59 PM
                            </Typography>
                        </Box>


                        <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                            26 Dec 10:59 PM
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "var(--black)",
                            fontSize: { xs: 11, md: 13 },
                            mb: 1,
                            mt: 1.5
                        }}
                    >
                        Free Cancellation (100% refund) if you cancel this booking before 19 Feb, 1:59 PM.
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "var(--black)",
                            fontSize: { xs: 11, md: 13 },
                            mb: 1,
                        }}
                    >
                        Cancellations post that will be subject to a fee as follows:
                    </Typography>

                    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", overflowY: "auto", mb: 2 }}>
                        <Table sx={{ fontWeight: "bold", border: "1px solid #ccc", height: 30, padding: "5px" }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "var(--table-header)" }}>
                                    <TableCell align="left" sx={{ fontWeight: 400, border: "1px solid #ccc", height: 30, padding: "5px" }}>
                                        Date
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 400, border: "1px solid #ccc", height: 30, padding: "5px" }}>
                                        Fee
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        Before 19 Feb, 1:59 PM
                                    </TableCell>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        0.0% of booking amount
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        After 19 Feb, 2:00 PM
                                    </TableCell>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        100.0% of booking amount
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        Before 20 Feb, 2.00 PM
                                    </TableCell>
                                    <TableCell align="left" sx={{ border: "1px solid #ccc", color: 'var(--black)', fontWeight: 300, fontSize: 11, height: 30, padding: "5px" }}>
                                        100.0% of booking amount
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Typography
                        variant="body2"
                        sx={{
                            color: "var(--black)",
                            fontSize: { xs: 11, md: 13 },
                            mb: 1,
                        }}
                    >
                        Cancellations are only allowed before the check-in time and date. All time mentioned above is in Destination Time.
                    </Typography>


                    <Stack direction='row' justifyContent='end' my={1.5}>
                        <Button
                            onClick={onHide}
                            sx={{
                                backgroundColor: 'var(--orengel)',
                                fontSize: 10,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'var(--orengel)', // Change color
                                    opacity: 0.8, // Slight transparency
                                },
                            }}
                        >
                            Close
                        </Button>

                    </Stack></Box>
            </Box>

        </Modal>

    )
}

export default CancellationHotel
