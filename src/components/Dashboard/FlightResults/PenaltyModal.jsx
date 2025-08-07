import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Collapse,
} from '@mui/material';
import { color } from 'framer-motion';
// const styles = {
//   penaltyItem: {
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     marginTop: '10px',
//     marginBottom: '10px',
//   },
// };
const PenaltySection = ({ title, penalties, isOpen }) => (
  <>
    <Box
      sx={{
        textAlign: 'right',
        color: 'var(--orengel)',
      }}
    >
      {title}
    </Box>
    <Collapse in={isOpen}>
      {penalties.length > 0 ? (
        penalties.map((penaltyGroup, index) => (
          <div key={index}>
            {penaltyGroup.map((penalty, i) => (
              <div key={i} style={styles.penaltyItem}>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    color: 'var(--primary)',
                    span: {
                      fontWeight: 300,
                    },
                  }}
                >
                  Allowed: <span>{penalty.allowed ? 'Yes' : 'No'}</span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    color: 'var(--primary)',
                    span: {
                      fontWeight: 300,
                    },
                  }}
                >
                  Time: <span>{penalty.time}</span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    color: 'var(--primary)',
                    span: {
                      fontWeight: 300,
                    },
                  }}
                >
                  Penalty: <span>{penalty.penalty}</span>
                </Typography>
              </div>
            ))}
          </div>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No penalties available.
        </Typography>
      )}
    </Collapse>
  </>
);

const PenaltyModal = ({ open, onClose, changePenalties, cancelPenalties }) => {
  if (!open) return null;

  // Error handling for missing properties
  if (!Array.isArray(changePenalties) || !Array.isArray(cancelPenalties)) {
    return (
      <Box sx={styles.errorBox}>
        <Typography variant="h6" color="error">
          Error: Invalid Penalty Data
        </Typography>
      </Box>
    );
  }
  const [activeTab, setActiveTab] = useState('changePenalties');

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Set active tab when a button is clicked
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="penalty-modal-title"
      aria-describedby="penalty-modal-description"
    >
      <Box sx={styles.modalBox}>
        <Button onClick={onClose} sx={styles.closeButton}>
          X
        </Button>
        <ButtonGroup variant="contained" aria-label="Penalty button group">
          {['changePenalties', 'cancelPenalties'].map((tab) => (
            <Button
              key={tab}
              onClick={() => handleTabChange(tab)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 400,
                backgroundColor:
                  activeTab === tab ? 'var(--primary)' : 'var(--bgcolor)',
                color: activeTab === tab ? 'var(--white)' : 'var(--primary)',
                '&:hover': {
                  backgroundColor:
                    activeTab === tab ? 'var(--primary)' : 'var(--bgcolor)',
                  color: activeTab === tab ? 'var(--white)' : 'var(--primary)',
                },
              }}
            >
              {tab === 'changePenalties'
                ? 'Change Penalties'
                : 'Cancel Penalties'}
            </Button>
          ))}
        </ButtonGroup>

        <Box>
          {activeTab === 'changePenalties' && (
            <PenaltySection
              title="Change Penalties"
              penalties={changePenalties}
              isOpen={activeTab === 'changePenalties'}
            />
          )}
          {activeTab === 'cancelPenalties' && (
            <PenaltySection
              title="Cancel Penalties"
              penalties={cancelPenalties}
              isOpen={activeTab === 'cancelPenalties'}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

// Styles for the modal using sx prop from Material UI
const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: 'var(--primary)',
  },

  errorBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: 24,
  },
  penaltyItem: {
    padding: '10px',
    border: '1px solid var(--stroke)',
    borderRadius: '5px',
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default PenaltyModal;
