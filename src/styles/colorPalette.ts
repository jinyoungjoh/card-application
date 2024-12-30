import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f04452;
    --light-red: #fde7e9;
    --blue: #3182f6;
    --light-blue: #deebfe;
    --green: #02a262;
    --light-green: #def3eb;
    --grey: #f2f4f6;
    --dark-grey: #4e5968;
    --white: #ffffff;
    --black: #191f28;
  }
`
export const colors = {
  red: 'var(--red)',
  lightRed: 'var(--light-red)',
  blue: 'var(--blue)',
  lightBlue: 'var(--light-blue)',
  green: 'var(--green)',
  lightGreen: 'var(--light-green)',
  grey: 'var(--grey)',
  darkGrey: 'var(--dark-grey)',
  white: 'var(--white)',
  black: 'var(--black)',
}

export type Colors = keyof typeof colors
