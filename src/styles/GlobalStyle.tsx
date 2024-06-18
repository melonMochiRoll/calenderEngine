import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

  :root {
    --black: #1f2128;
    --dark-gray: #242731;
    --light-gray: #2f323b;
    --pink: #bf94FF;
    --purple: #6c5dd3;
    --white: #efeff1;
  }
  
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard';
  }

  a {
    text-decoration: none;
  }
`

export const GlobalStyle = () => <Global styles={style} />