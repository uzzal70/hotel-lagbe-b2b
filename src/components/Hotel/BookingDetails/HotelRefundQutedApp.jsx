import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'

const HotelRefundQutedApp = ({open, close}) => {
  return (
    <Modal open={open} onClose={close}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              width: { xs: '90%', sm: 400, md: 500 },
              p: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight={600}>
                Download Voucher With Price
              </Typography>
              <Button onClick={close} sx={{ minWidth: 0 }}>
                ✕
              </Button>
            </Box>

            {/* Total Net Price */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Total Net Price</Typography>
              <Typography fontWeight={500}>
                dfs
              </Typography>
            </Box>

            {/* Markup Input */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography>Enter Your Markup</Typography>
              <TextField
                variant="outlined"
                type="number"
                value={''}
                // onChange={(e) => setMarkup(e.target.value)}
                placeholder="0"
                size="small"
                InputProps={{
                  endAdornment: (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                      alt="Edit"
                      width={16}
                      height={16}
                      style={{ marginLeft: 5 }}
                    />
                  ),
                  style: { width: 100 },
                }}
              />
            </Box>

            <hr />

         

            {/* Download Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                bgcolor: 'var(--primary)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 9999,
                py: 1,
                '&:hover': {
                  bgcolor: 'var(--primary)',
                },
              }}
            >
              DOWNLOAD
            </Button>
          </Box>
      </Modal>
  )
}

export default HotelRefundQutedApp
