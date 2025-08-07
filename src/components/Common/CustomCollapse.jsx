/* eslint-disable react/prop-types */
import { Collapse } from '@mui/material';
import { useEffect, useRef } from 'react';

const CustomCollapse = ({ children, isOpen, onToggle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={containerRef}>
      <Collapse in={isOpen}>{children}</Collapse>
    </div>
  );
};

export default CustomCollapse;
