/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ImageImport from '../../assets/ImageImport';
const CustomTooltip = ({ children, name, value }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {!value && isTooltipVisible && (
        <div
          style={{
            position: 'absolute',
            top: '100%', // Position below the input
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            padding: '10px 10px 0px 10px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <img
            src={
              name === 'firstName' ? ImageImport.givenName : ImageImport.surName
            }
            alt="Passport"
            style={{ maxWidth: 250, maxHeight: 150 }}
          />
        </div>
      )}

      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
    </div>
  );
};

export default CustomTooltip;
