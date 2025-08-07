/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import ValidIcon from '../Common/validIcon';

const FileUpload = ({ field, formik, values, pRef, sizeError, later }) => {
  const reference = useRef(pRef);
  const removeFile = () => {
    const { setFieldValue } = formik;
    setFieldValue(`${field}Error`, '');
    setFieldValue(`${field}`, null);
  };

  const handleButtonClick = (fieldName) => {
    fieldName.current.click();
  };

  const handleFileChange = (field, event) => {
    const { setFieldValue } = formik;
    const file = event.target.files[0];

    if (file) {
      const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
      if (file.size > maxSizeInBytes) {
        // File exceeds the maximum size limit
        setFieldValue(
          `size${field}`,
          'The file size is too large ( maximum limit 2MB).'
        );
        setFieldValue(`${field}`, null);
        return;
      } else {
        setFieldValue(`${field}`, event.currentTarget.files[0]);
        setFieldValue(`${field}Error`, '');
        setFieldValue(`size${field}`, '');
      }
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: '97.2%',
          sm: '98%',
          md: '98%',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'var(--gray)',
          p: 0.6,
          borderRadius: '5px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {!values ? (
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'space-between',
            }}
          >
            <Box
              onClick={() => handleButtonClick(reference)}
              sx={{
                width: 'fit-content',

                py: 0.4,
                px: 2,
                display: 'flex',
                bgcolor: 'var(--bgcolor)',
                borderRadius: '5px',
              }}
            >
              <div className="custom-file-input-container">
                <input
                  name={field}
                  id={field}
                  type="file"
                  ref={reference}
                  onChange={(e) => handleFileChange(field, e)}
                  accept="image/*,application/pdf"
                />
              </div>
              <Typography
                sx={{
                  mt: 0.2,
                  fontSize: { xs: 14, md: 16 },
                  color: 'var(--icon-color)',
                }}
              >
                Browse&nbsp;&nbsp;
              </Typography>
              <FileUploadOutlinedIcon
                sx={{
                  color: 'var(--icon-color)',
                }}
              />
            </Box>
            {later && (
              <Box mt={0.6}>
                <div className="custom-checkbox">
                  <label
                    htmlFor={`${field}1`}
                    style={{ color: 'var(--secondary)' }}
                  >
                    Upload Later
                  </label>
                  <input
                    name={`${field}1`}
                    type="checkbox"
                    id={`${field}1`}
                    // value={tradeValue}
                    style={{
                      width: '17px',
                    }}
                    // accept="image/*,application/pdf"
                  />
                </div>
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              px={1}
            >
              <Typography
                sx={{
                  color: 'var(--secondary)',
                  fontSize: 14,
                }}
                noWrap
              >
                {values?.name || 'Image'}
              </Typography>
              <Box display={'flex'}>
                <Box onClick={() => handleButtonClick(reference)}>
                  <CameraAltIcon
                    sx={{
                      color: 'var(--icon-color)',
                      mt: 0.4,
                    }}
                  />
                  <div className="custom-file-input-container">
                    <input
                      name={field}
                      id={field}
                      type="file"
                      ref={reference}
                      onChange={(e) => handleFileChange(field, e)}
                      accept="image/*,application/pdf"
                    />
                  </div>
                </Box>
                <Box onClick={() => removeFile()}>
                  <CloseIcon
                    sx={{
                      color: 'var(--icon-color)',
                      mt: 0.4,
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
      {sizeError ? (
        <Box>
          <ValidIcon msg={sizeError} fontColor="var(--red)" />
          <a
            style={{ fontSize: '12px', color: 'var(--primary)' }}
            href="https://tinypng.com"
            target="_blank"
            rel="noreferrer"
          >
            Compress image with this link https://tinypng.com.
          </a>
        </Box>
      ) : null}
    </Box>
  );
};

export default FileUpload;
