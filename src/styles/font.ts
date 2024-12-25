import { css } from '@emotion/react'

export const font = css`
  /* Regular 폰트 */
  @font-face {
    font-family: 'Pretendard';
    src:
      url('/assets/fonts/Pretendard-Regular-subset.woff2') format('woff2'),
      url('/assets/fonts/Pretendard-Regular-subset.woff') format('woff');
    font-weight: normal; /* 400 */
    font-style: normal;
  }

  /* Medium 폰트 */
  @font-face {
    font-family: 'Pretendard';
    src:
      url('/assets/fonts/Pretendard-Medium-subset.woff2') format('woff2'),
      url('/assets/fonts/Pretendard-Medium-subset.woff') format('woff');
    font-weight: 500; /* Medium */
    font-style: normal;
  }

  /* SemiBold 폰트 */
  @font-face {
    font-family: 'Pretendard';
    src:
      url('/assets/fonts/Pretendard-SemiBold-subset.woff2') format('woff2'),
      url('/assets/fonts/Pretendard-SemiBold-subset.woff') format('woff');
    font-weight: 600; /* SemiBold */
    font-style: normal;
  }

  /* Bold 폰트 */
  @font-face {
    font-family: 'Pretendard';
    src:
      url('/assets/fonts/Pretendard-Bold-subset.woff2') format('woff2'),
      url('/assets/fonts/Pretendard-Bold-subset.woff') format('woff');
    font-weight: bold; /* 700 */
    font-style: normal;
  }
`
