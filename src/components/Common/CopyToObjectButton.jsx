/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Tooltip } from '@mui/material';

const CopyToObjectButton = ({ children, fontSize }) => {
  const textRef = useRef(null);
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyClick = () => {
    if (!textRef.current) return;

    // Extract all <p> elements inside the hidden div
    const paragraphs = textRef.current.querySelectorAll('p');
    const textToCopy = Array.from(paragraphs)
      .map((paragraph) => paragraph.textContent)
      .join('\n'); // Join text with newline characters for each <p>

    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000); // Reset copied state after 2 seconds
    });
  };
  return (
    <div>
      {/* Hidden div to render the text to be copied */}
      <div
        ref={textRef}
        style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}
      >
        {children}
      </div>

      <Tooltip title={copiedText ? 'Copied' : 'Click to copy flight details'}>
        <ContentCopyOutlinedIcon
          sx={{
            color: copiedText ? 'var(--dark-green)' : 'var(--secondary)',
            border: copiedText
              ? '1px solid var(--dark-green)'
              : '1px solid var(--secondary)',
            p: 0.4,
            borderRadius: '50%',
            fontSize: fontSize || 21,
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onClick={handleCopyClick}
        />
      </Tooltip>
    </div>
  );
};

export default CopyToObjectButton;
