import { DRAWER_WIDTH } from "../constants"
import palette from "./palette"
export const menuPaperStyles = { sx: { minWidth: "200px" } }
export const displayNone = { sx: { display: 'none' } }
export const cursorPointer = { cursor: 'pointer' }

export const forgotPasswordButton = {
  display: 'block',
  marginTop: '110px',

  'a': {
    color: palette.common.white,
    display: 'block'
  }
}

export const paginationStyles = {
  '& li:not(:last-child, :first-of-type) button': {
    backgroundColor: palette.common.white,
    color: palette.common.carpetGray,
    border: `1px solid ${palette.common.white}`,
  },

  '& li button.Mui-selected': {
    backgroundColor: palette.common.mussoliniWhite,
    border: `1px solid ${palette.common.zipper}`,
    borderColor: palette.common.zipper,
    color: palette.primary.main,

    '&:hover': {
      backgroundColor: palette.common.mussoliniWhite,
    }
  },
}

export const MuiMobilePaperComponent = {
  width: DRAWER_WIDTH,

  "@media (max-width:1280px)": {
    display: "none",
  },

  background: palette.primary.main
}