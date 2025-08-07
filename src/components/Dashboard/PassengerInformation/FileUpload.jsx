/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import ValidIcon from '../../Common/validIcon';

const FileUpload = ({
  field,
  formik,
  type,
  values,
  error,
  index,
  pRef,
  // handleFileChange,
  sizeError,
}) => {
  const reference = useRef(pRef);
  const removeFile = () => {
    const { setFieldValue } = formik;
    setFieldValue(`${type}[${index}].${field}Error`, '');
    setFieldValue(`${type}[${index}].${field}`, null);
  };

  const handleButtonClick = (fieldName) => {
    fieldName.current.click();
  };

  const handleFileChange = (type, index, field, event) => {
    const { setFieldValue } = formik;
    const file = event.target.files[0];

    if (file) {
      const maxSizeInBytes = 3 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        // File exceeds the maximum size limit
        setFieldValue(
          `${type}[${index}].${field}Error`,
          'The file size is too large ( maximum limit 3MB).'
        );
        setFieldValue(`${type}[${index}].${field}`, null);
        return;
      } else {
        setFieldValue(
          `${type}[${index}].${field}`,
          event.currentTarget.files[0]
        );
        setFieldValue(`${type}[${index}].${field}Error`, '');
      }
    }
  };

  return (
    <div>
      {/* <label>
        {`${field} copy`}
        <input
          type="file"
          name={field}
          // value={values || null}
          onChange={(e) => handleFileChange(type, index, field, e)}
        />
      </label>
      {sizeError ? (
        <div>
          <ValidIcon msg={sizeError} fontColor="var(--red)" />
        </div>
      ) : null} */}
      <Typography
        sx={{
          color: 'var(--icon-color)',
          fontSize: '12px',
          fontWeight: 400,
          textTransform: 'capitalize',
        }}
      >
        {`${field} copy`} ( Optional )
      </Typography>
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <Grid
          container
          sx={{
            bgcolor: 'var(--gray)',
            p: 0.6,
            borderRadius: '5px',
            alignItems: 'center',
          }}
        >
          {!values ? (
            <Grid item xs={4}>
              <Box
                sx={{
                  width: 'fit-content',
                  bgcolor: 'var(--bgcolor)',
                  py: 0.4,
                  px: 2,
                  borderRadius: '5px',
                  display: 'flex',
                  cursor: 'pointer',
                }}
                onClick={() => handleButtonClick(reference)}
              >
                <div className="custom-file-input-container">
                  <input
                    name={field}
                    id={field}
                    type="file"
                    // required
                    ref={reference}
                    onChange={(e) => handleFileChange(type, index, field, e)}
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
            </Grid>
          ) : (
            <Grid item xs={12}>
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
                        onChange={(e) =>
                          handleFileChange(type, index, field, e)
                        }
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
            </Grid>
          )}
        </Grid>
        {sizeError ? (
          <div>
            <ValidIcon msg={sizeError} fontColor="var(--red)" />
            <a
              style={{ fontSize: '12px', color: 'var(--primary)' }}
              href="https://tinypng.com"
              target="_blank"
              rel="noreferrer"
            >
              Compress image with this link https://tinypng.com.
            </a>
          </div>
        ) : null}
      </Box>
    </div>
  );
};

export default FileUpload;
