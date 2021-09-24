import React from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { countState, inputState } from './atom';
import countStateSelector from './selector';

// 파일을 Atoms 폴더에 ??atom.ts console.log();로 구분하면 좋을것같다.

const RecoilCounter = () => {
  //
  const [counter, setCounter] = useRecoilState(countState);
  const currentCount = useRecoilValue(countState); // read only
  const counterHandler = useSetRecoilState(countState); // 전역 state 변경
  const resetCounter = useResetRecoilState(countState); // set default

  const currentInput = useRecoilValue(inputState);
  const inputHandlerState = useSetRecoilState(inputState);
  const resultValue = useRecoilValue(countStateSelector);

  const plusCount = () => {
    counterHandler((pre) => pre + 1);
  };

  const minusCount = () => {
    counterHandler((pre) => pre - 1);
  };

  const inputHandler = (e) => {
    const target = e.target.value;
    inputHandlerState(target);
  };

  const submitCount = () => {
    counterHandler((pre) => pre + Number(currentInput));
  };

  return (
    <div>
      <p>{currentCount}</p>

      <button onClick={plusCount} type="button">
        +
      </button>
      <button onClick={minusCount} type="button">
        -
      </button>
      <button onClick={resetCounter} type="button">
        reset
      </button>

      <hr />

      <input type="text" onChange={inputHandler} />
      <button type="button" onClick={submitCount}>
        값 더하기
      </button>
      <p>{resultValue}</p>
    </div>
  );
};

export default RecoilCounter;
