/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Tooltip } from '@mui/material';
const CopyToClipboardButton = ({ textToCopy, fontSize }) => {
  const textRef = useRef(null);
  const [copiedText, setCopiedText] = useState('');
  const handleCopyClick = () => {
    const textToCopy = textRef.current.value;

    if (copiedText === textToCopy) {
      // If the text is already copied, clear the copied state
      setCopiedText('');
    } else {
      // If not copied, set the copied state
      setCopiedText(textToCopy);

      // Select the text
      textRef.current.select();

      // Copy to the clipboard
      document.execCommand('copy');

      // Deselect the text
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={textToCopy}
        ref={textRef}
        readOnly
        style={{ position: 'absolute', left: '-9999px' }}
      />
      <Tooltip title={copiedText ? 'Copied' : 'Copy to Text'}>
        <ContentCopyOutlinedIcon
          sx={{
            color: copiedText ? 'var(--primary)' : 'var(--secondary)',
            border: copiedText
              ? '1px solid var(--primary)'
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

export default CopyToClipboardButton;
