import { useEffect } from 'react';

export const usePreventAutoZoom = () => {
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isSafari && isIos) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);
};
