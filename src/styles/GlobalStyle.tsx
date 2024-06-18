import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
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

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Black.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Black.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-ExtraBold.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-ExtraBold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Bold.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Bold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-SemiBold.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-SemiBold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Medium.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Medium.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Regular.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Regular.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Light.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Light.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-ExtraLight.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-ExtraLight.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src:
      url('../../public/fonts/Pretendard-Thin.subset.woff2') format('woff2'),
      url('../../public/fonts/Pretendard-Thin.subset.woff') format('woff');
  }
`

export const GlobalStyle = () => <Global styles={style} />