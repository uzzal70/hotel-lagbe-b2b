/* eslint-disable react/prop-types */
import React from 'react';
import gif from '../assets/gif';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

// Class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '89vh',
          }}
        >
          <Box
            textAlign="center"
            sx={{
              img: {
                height: '40vh',
                borderRadius: 2,
              },
            }}
          >
            <img src={gif.wolf} alt="Error" />
            <Typography variant="body1" color="error" mt={2}>
              {this.state.error?.message ||
                'Something went wrong. Please try again later.'}
            </Typography>
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={2}
            >
              <Button
                variant="contained"
                onClick={() => this.props.navigate('/dashboard')}
                size="small"
                sx={{
                  bgcolor: 'var(--primary)',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                  },
                  textTransform: 'capitalize',
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                }}
              >
                Reload Page
              </Button>
            </Stack>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Wrapper to inject navigate + location + key reset
const ErrorWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname} navigate={navigate}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorWrapper;
