import { useEffect } from 'react';

// This is an example version that you could retrieve from an API or from your build process.
const CURRENT_VERSION = '1.0.0';

const CacheBuster = ({ children }) => {
  useEffect(() => {
    const cachedVersion = localStorage.getItem('app_version');

    if (cachedVersion === CURRENT_VERSION) {
      return; // Version matches, no need to reload
    }

    // Version is different, so let's force a reload
    if (cachedVersion) {
      window.location.reload(true); // True forces a hard reload
    }

    // Update the version in localStorage
    localStorage.setItem('app_version', CURRENT_VERSION);
  }, []);

  return children;
};

export default CacheBuster;
