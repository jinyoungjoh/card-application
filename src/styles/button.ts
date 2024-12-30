import { css } from '@emotion/react'
import { colors } from './colorPalette'

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.blue};
    color: ${colors.white};
  `,
  secondary: css`
    background-color: ${colors.darkGrey};
    color: ${colors.grey};
  `,
  success: css`
    background-color: ${colors.green};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
}

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.lightBlue};
    color: ${colors.blue};
  `,
  secondary: css`
    background-color: ${colors.grey};
    color: ${colors.darkGrey};
  `,
  success: css`
    background-color: ${colors.lightGreen};
    color: ${colors.green};
  `,
  error: css`
    background-color: ${colors.lightRed};
    color: ${colors.red};
  `,
}

export const buttonOutlineMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.blue};
    border: 1px solid ${colors.blue};
  `,
  secondary: css`
    background-color: ${colors.white};
    color: ${colors.darkGrey};
    border: 1px solid ${colors.grey};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.green};
    border: 1px solid ${colors.green};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px solid ${colors.red};
  `,
}

export const buttonSizeMap = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
}

export type ButtonColor = keyof typeof buttonColorMap
export type ButtonSize = keyof typeof buttonSizeMap
