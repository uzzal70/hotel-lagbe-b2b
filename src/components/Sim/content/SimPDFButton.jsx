import { PDFDownloadLink } from '@react-pdf/renderer';
import SimPDFDesing from './SimPDFDesing';
import { Box, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { baseUrl } from '../../../../baseurl';
import { useEffect, useState } from 'react';
import getAuthToken from '../../Common/getAuthToken';

function useEsimQRCode(eSimListId) {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getAuthToken(); // make sure this returns the token string

  useEffect(() => {
    if (!eSimListId) return;
    let active = true;
    setLoading(true);
    setError(null);
    setQrUrl(null);
    fetch(
      `${baseUrl}/core/mobileDataSim/getEsimQRCode?eSimListId=${eSimListId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.startsWith('image/')) {
          throw new Error(`Unexpected content type: ${contentType}`);
        }
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        const objectUrl = URL.createObjectURL(blob);
        setQrUrl(objectUrl);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      if (qrUrl) URL.revokeObjectURL(qrUrl);
    };
  }, [eSimListId, token]); // include token in dependency array in case it changes

  return { qrUrl, loading, error };
}

const SimPDFButton = ({ data, paxData, agentData }) => {
  const { qrUrl, loading, error } = useEsimQRCode(paxData?.eSimListId);
  if (loading)
    return (
      <CircularProgress
        sx={{
          color: 'var(--primary)',
        }}
        size={30}
      />
    );
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!qrUrl) return null;
  return (
    <div>
      <PDFDownloadLink
        document={
          <SimPDFDesing
            paxData={paxData}
            data={data}
            agentData={agentData}
            qrImage={qrUrl}
          />
        }
        fileName={`Sim pdf`}
      >
        {({ blob, fileName, loading, error }) => (
          <Box>
            {loading ? (
              <Box
                component="a"
                href={fileName}
                target="_blank"
                sx={{
                  border: '1px solid #028CFF',
                  borderRadius: 1.5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: { xs: 18, sm: 30 },
                  height: { xs: 18, sm: 30 },
                }}
              >
                <DownloadIcon
                  sx={{
                    color: '#028CFF',
                    fontSize: { xs: 12, sm: 15 },
                  }}
                />
              </Box>
            ) : (
              <>
                {blob && (
                  <Box
                    sx={{
                      border: '1px solid #028CFF',
                      borderRadius: 1.5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { xs: 18, sm: 30 },
                      height: { xs: 18, sm: 30 },
                    }}
                  >
                    <Box sx={{ cursor: 'pointer' }}>
                      <DownloadIcon
                        sx={{
                          color: '#028CFF',
                          fontSize: { xs: 12, sm: 15 },
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </>
            )}
            {error && `Error occurred: ${error.message}`}
          </Box>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default SimPDFButton;
