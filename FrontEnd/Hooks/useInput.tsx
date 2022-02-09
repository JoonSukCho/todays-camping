import React, { useState, useCallback } from 'react';

const useInput = <T extends unknown>(
  initialValue: T = null,
): [T, (e) => void, (e) => void] => {
  const [value, setValue] = useState<any>(initialValue);

  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
