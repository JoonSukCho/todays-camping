import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

type _tUseModal = [boolean, () => void, () => void];

const useModal = (): _tUseModal => {
  const [openFlag, setOpenFlag] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    const htmlDom = document.querySelector('html');
    const bodyDom = document.querySelector('body');

    // https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
    bodyDom.addEventListener('pointermove', (e) => {
      e.preventDefault();
    });
    // htmlDom.style.height = '100%';
    // htmlDom.style.overflow = 'hidden';
    // bodyDom.style.height = '100%';
    // bodyDom.style.overflow = 'hidden';

    // const offsetY = window.pageYOffset;
    // htmlDom.style.top = `${-offsetY}px`;
    // bodyDom.style.top = `${-offsetY}px`;
    // bodyDom.style.position = 'fixed';

    setOpenFlag(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenFlag(false);
  }, []);

  return [openFlag, handleOpenModal, handleCloseModal];
};

export default useModal;
