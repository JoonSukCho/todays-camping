import { IconButton } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';

const TopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const moveTopHandler = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const toggleVisible = () => {
      const currentScrollPos = document.documentElement.scrollTop;

      if (currentScrollPos > 900) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <IconButton
      onClick={moveTopHandler}
      style={{
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? 0.85 : 0,
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        color: '#fff',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <ArrowUpwardIcon />
    </IconButton>
  );
};

export default TopButton;
