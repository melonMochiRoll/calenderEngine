import React from 'react';
import { Global, css } from '@emotion/react';
import Black2 from '../../public/fonts/Pretendard-Black.subset.woff2';
import Black from '../../public/fonts/Pretendard-Black.subset.woff';
import ExtraBold2 from '../../public/fonts/Pretendard-ExtraBold.subset.woff2';
import ExtraBold from '../../public/fonts/Pretendard-ExtraBold.subset.woff';
import Bold2 from '../../public/fonts/Pretendard-Bold.subset.woff2';
import Bold from '../../public/fonts/Pretendard-Bold.subset.woff';
import SemiBold2 from '../../public/fonts/Pretendard-SemiBold.subset.woff2';
import SemiBold from '../../public/fonts/Pretendard-SemiBold.subset.woff';
import Medium2 from '../../public/fonts/Pretendard-Medium.subset.woff2';
import Medium from '../../public/fonts/Pretendard-Medium.subset.woff';
import Regular2 from '../../public/fonts/Pretendard-Regular.subset.woff2';
import Regular from '../../public/fonts/Pretendard-Regular.subset.woff';
import Light2 from '../../public/fonts/Pretendard-Light.subset.woff2';
import Light from '../../public/fonts/Pretendard-Light.subset.woff';
import ExtraLight2 from '../../public/fonts/Pretendard-ExtraLight.subset.woff2';
import ExtraLight from '../../public/fonts/Pretendard-ExtraLight.subset.woff';
import Thin2 from '../../public/fonts/Pretendard-Thin.subset.woff2';
import Thin from '../../public/fonts/Pretendard-Thin.subset.woff';

const style = css`
  :root {
    --black: #1f2128;
    --dark-gray: #242731;
    --light-gray: #2f323b;
    --pink: #bf94FF;
    --purple: #6c5dd3;
    --white: #efeff1;
    --red: #f94449;
    --blue: #63bcff;
    --naver-green: #03c75a;
    --google-blue: #4286f5;
    --gray-0: #f8f9fa;
    --gray-1: #f1f3f5;
    --gray-2: #e9ecef;
    --gray-3: #dee2e6;
    --gray-4: #ced4da;
    --gray-5: #adb5bd;
    --gray-6: #868e96;
    --gray-7: #495057;
    --gray-8: #343a40;
    --gray-9: #212529;
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
      url(${Black2}) format('woff2'),
      url(${Black}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src:
      url(${ExtraBold2}) format('woff2'),
      url(${ExtraBold}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src:
      url(${Bold2}) format('woff2'),
      url(${Bold}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src:
      url(${SemiBold2}) format('woff2'),
      url(${SemiBold}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src:
      url(${Medium2}) format('woff2'),
      url(${Medium}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src:
      url(${Regular2}) format('woff2'),
      url(${Regular}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src:
      url(${Light2}) format('woff2'),
      url(${Light}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src:
      url(${ExtraLight2}) format('woff2'),
      url(${ExtraLight}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src:
      url(${Thin2}) format('woff2'),
      url(${Thin}) format('woff');
  }
`

export const GlobalStyle = () => <Global styles={style} />