/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Fade, Tooltip } from '@mui/material';
import ValidIcon from './validIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomTooltip from './CustomTooltip';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { memo, useState } from 'react';

const CustomInput = memo(
  ({
    value,
    name,
    placeholder,
    formik,
    label,
    handleOnChange,
    fontSize,
    padding,
    border,
    type,
    handleShow,
    show,
    width,
    touched,
    minLength,
    maxLength,
    labelColor,
    autoFocus,
    disabled,
  }) => {
    return (
      <Box
        className="custom-input"
        sx={{
          input: {
            padding: padding || '10px 10px',
            fontSize: fontSize || 14,
            border: border || '',
            fontWeight: 400,
            width: '100%',
            textTransform: name === 'email' ? 'lowercase' : '',
            boxSizing: 'border-box',
          },
          label: {
            color: labelColor || '',
          },
        }}
      >
        <label htmlFor={name}>{label}</label>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {name === 'surName' || name === 'givenName' ? (
            <CustomTooltip name={name} value={value}>
              <input
                type={type || 'text'}
                name={name || ''}
                id={name || ''}
                placeholder={placeholder || ''}
                autoComplete="off"
                // {...(formik ? { required: true } : {})}
                onChange={(e) => handleOnChange(e)}
                value={value || ''}
              />
            </CustomTooltip>
          ) : (
            <input
              type={type || 'text'}
              name={name || ''}
              id={name || ''}
              placeholder={placeholder || ''}
              autoFocus={autoFocus ? true : false}
              autoComplete="off"
              min={minLength || '0'}
              // minLength={minLength || '3'}
              // maxLength={maxLength || '1'}
              // {...(formik ? { minLength: minLength } : {})}
              onChange={(e) => handleOnChange(e)}
              value={value || ''}
              disabled={disabled || false}
            />
          )}
          {name === 'password' && (
            <Box
              sx={{
                position: 'absolute',
                right: '0.5%',
                top: '50%',
                pr: 1,
                transform: 'translateY(-50%)',
                height: '60%',
                zIndex: '100',
                color: 'var(--icon-color)',
                cursor: 'pointer',
              }}
            >
              {show ? (
                <VisibilityIcon onClick={() => handleShow()} />
              ) : (
                <VisibilityOffIcon onClick={() => handleShow()} />
              )}
            </Box>
          )}
          {type === 'email' && (
            <Box
              sx={{
                position: 'absolute',
                right: '0.5%',
                top: '55%',
                pr: 1,
                transform: 'translateY(-50%)',
                height: '60%',
                // zIndex: '100',
                color: 'var(--icon-color)',
                cursor: 'pointer',
              }}
            >
              <MailOutlineIcon sx={{ fontSize: 20 }} />
            </Box>
          )}
        </Box>
        {name == 'email' && formik ? (
          <div>
            <ValidIcon msg={formik} fontColor="var(--red)" />
          </div>
        ) : touched && formik ? (
          <div>
            <ValidIcon msg={formik} fontColor="var(--red)" />
          </div>
        ) : (
          ''
        )}
      </Box>
    );
  }
);

export default CustomInput;
