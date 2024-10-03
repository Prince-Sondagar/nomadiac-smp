import palette from '../palette'

const {
  common: { carpetGray, steelFog, tornGray, white, mussoliniWhite, timberWolf },
  primary: { main: primaryMain }
} = palette

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        WebkitFontSmoothing: 'auto',
      },

      "*": {
        boxSizing: 'border-box',

        '&::-webkit-scrollbar': {
          width: '7px',
          height: '4px'
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
          borderRadius: '20px',
        },

        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: timberWolf,
          },
        }
      },

      "a:active": {
        textDecoration: 'none'
      },

      "a": {
        textDecoration: 'none'
      },

      body: {
        "& .SnackbarContainer-top": {
          top: '70px !important'
        }
      }
    }
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        input: {
          lineHeight: '1.5',
          color: carpetGray,
          fontSize: '14px',
          boxSizing: 'border-box',
          fontWeight: '400',
          borderRadius: "4px",
          height: '100%',

          '&:hover': {
            borderColor: 'transparent',
          },
        },
      }
    }
  },

  MuiInputBase: {
    styleOverrides: {
      multiline: {
        height: '180px !important',
        alignItems: 'flex-start'
      }
    }
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        height: '40px',
        fontSize: '14px',
        color: carpetGray,
        fontWeight: '400',
        borderColor: carpetGray,
        borderRadius: '6px',

        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: steelFog,
          },

        },

        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: '1px',
            borderColor: primaryMain,
          }
        }
      },

      notchedOutline: {
        borderColor: steelFog,
      }
    }
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '14px',
        fontWeight: '400',
        color: steelFog,
      }
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: '16px',
        fontWeight: '600',
        height: '40px',
        borderRadius: '4px',
        paddingInline: '20px',
        textTransform: 'none' as const,
        borderColor: tornGray,
      },
    }
  },

  MuiTable: {
    styleOverrides: {
      root: {
        fontSize: '16px',

        th: {
          fontWeight: '500',
          color: steelFog,
          boxShadow: 'none',
          padding: 'unset',
          borderBottom: `1px solid ${palette.common.tornGray}`,
          paddingBottom: '8px'
        },

        td: {
          paddingInline: 'unset',
          fontWeight: '400',
          borderBottomColor: tornGray,
          paddingTop: '5px',
          paddingBottom: '5px'
        }
      }
    }
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        border: `1px solid ${tornGray}`,
        boxShadow: "1px 6px 24px rgba(0, 0, 0, 0.07) !important",
        borderRadius: '3px',
      },

      list: {
        padding: '12px'
      }
    }
  },

  MuiTablePagination: {
    styleOverrides: {
      root: {
        padding: 0,
        borderBottom: 0,
      },

      toolBar: {
        paddingLeft: 0
      },

      select: {
        backgroundColor: white,
      }
    }
  },

  MuiPagination: {
    styleOverrides: {
      root: {
        paddingRight: '20px',
      }
    }
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        padding: "4px 12px",
        fontSize: '14px',
        color: carpetGray,
        lineHeight: '27px',
        borderRadius: '4px',

        "&:hover": {
          background: mussoliniWhite
        }
      }
    }
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderBottom: '3px solid rgba(205, 214, 218, 0.25)',
        borderRadius: '0px !important',
        paddingBlock: '5px',

        '&:before': {
          display: 'none'
        }
      },

      MuiAccordionSummaryContent: {
        margin: '50px 0'
      }
    }
  },

  FormControlLabel: {
    styleOverrides: {
      root: {
        fontSize: '20px',
        color: 'red',
        border: '1px solid red',
        marginBottom: '40px',
      }
    }
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: palette.common.tornGray,
      }
    }
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        color: `${palette.common.white} !important`,
        transition: 'all .3s ease-in',

        "&.MuiListItem-root .MuiListItemText-primary": {
          color: `${palette.common.white} !important`,
        },

        "&.MuiListItem-root .MuiListItemIcon-root": {
          color: `${palette.common.white} !important`,
        },

        "&.MuiListItem-root:hover": {
          color: `${palette.common.white} !important`,
          backgroundColor: palette.common.mainLight
        },

        "&.MuiListItem-root:hover .MuiListItemIcon-root": {
          color: `${palette.common.white} !important`,
        },

        "&.Mui-selected .MuiListItemIcon-root": {
          color: `${palette.common.white} !important`,
        },

        "&.Mui-selected": {
          backgroundColor: palette.common.mainLight
        },

        "&.Mui-selected:hover": {
          backgroundColor: palette.common.mainLight
        }
      },
    }
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        transition: 'all .3s ease-in',
      }
    }
  },
}

export default components;