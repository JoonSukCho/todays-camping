import React from 'react';
import styled from 'styled-components';

const ScrollBtn = styled.span`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;

  & > * {
    display: inline-block;
    line-height: 18px;
    font-size: 13px;
    font-weight: normal;
    color: #7f8c8d;
    color: #ffffff;
    letter-spacing: 2px;
  }
  & > *:hover,
  & > *:focus,
  & > *.active {
    color: #ffffff;
  }
  & > *:hover,
  & > *:focus,
  & > *:active,
  & > *.active {
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
`;

const Mouse = styled.span`
  position: relative;
  display: block;
  width: 35px;
  height: 55px;
  margin: 0 auto 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 23px;
  cursor: pointer;

  @-webkit-keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }
  @-moz-keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }
  @keyframes ani-mouse {
    0% {
      opacity: 1;
      top: 29%;
    }
    15% {
      opacity: 1;
      top: 50%;
    }
    50% {
      opacity: 0;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: 29%;
    }
  }

  & > * {
    position: absolute;
    display: block;
    top: 29%;
    left: 50%;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    background: white;
    border-radius: 50%;
    -webkit-animation: ani-mouse 2.5s linear infinite;
    -moz-animation: ani-mouse 2.5s linear infinite;
    animation: ani-mouse 2.5s linear infinite;
  }
`;

const ScrollGuideIcon = () => {
  return (
    <ScrollBtn>
      <Mouse>
        <span> </span>
      </Mouse>
    </ScrollBtn>
  );
};

export default ScrollGuideIcon;
