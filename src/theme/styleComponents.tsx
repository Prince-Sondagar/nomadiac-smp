// packages block
import { AppBar, Box, Drawer, IconButton, Typography, styled as MuiStyled } from "@mui/material";
import { styled } from "@mui/material/styles";
//others block
import palette from "./palette";
import { CustomAppBarPropsType, StatusBoxProps } from "../interfaceTypes";
import { DRAWER_WIDTH } from "../constants";
import { Link } from "react-router-dom";

export const AuthLayoutContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: 'center',
  justifyContent: "center",
  backgroundColor: palette.common.zenWhite
}));

export const AuthContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '50px',
  marginTop: '40px',
  borderRadius: '4px',
}));

export const ErrorBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: '50%',
  left: '50%',
  width: '100%',
  transform: `translate(-50%, -50%)`,
}));

export const ErrorText = styled(Typography)(() => ({
  fontSize: '30rem',
  fontWeight: '600',
  opacity: '0.1'
}));

export const AppBarSpacer = styled(Box)(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const CustomAppBar = styled(AppBar)<CustomAppBarPropsType>(({ theme, appbarshift }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  background: `${palette.common.white}!important`,
  marginLeft: "50px",
  paddingLeft: 85,

  "@media (max-width:1280px)": {
    width: '100%',
    margin: 0,
    borderRadius: 0,
    paddingLeft: 24,
  },

  ...(appbarshift ? {
    "&.MuiAppBar-root": {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      backgroundColor: palette.common.white,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingLeft: 24,
      // [theme.breakpoints.down("md")]: {
      "@media (max-width:1280px)": {
        width: '100%',
        margin: 0,
        borderRadius: 0
      },
    }
  } : {})
}));

export const CustomMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none !important",
  // [theme.breakpoints.down("md")]: {
  "@media (max-width:1280px)": {
    display: "flex  !important",
  }
}));

export const BrandTitle = styled(Typography)(() => ({
  flexGrow: 1,
  fontSize: 20,
  letterSpacing: 1,
  "@media (max-width:990px)": {
    fontSize: '1rem !important'
  }
}));

export const UserInfoBox = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'normal',
  "@media (max-width:600px)": {
    display: 'none'
  }
}));

export const DesktopDrawer = styled(Drawer)(() => ({
  width: DRAWER_WIDTH,
}));

export const MobileDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,

  "@media (max-width:1280px)": {
    display: "none",
  },

  whiteSpace: "nowrap",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const VerifiedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.70772 9.2935C7.31719 8.90298 6.68403 8.90298 6.2935 9.2935C5.90298 9.68403 5.90298 10.3172 6.2935 10.7077L7.70772 9.2935ZM9.00061 12.0006L8.2935 12.7077C8.68403 13.0982 9.31719 13.0982 9.70772 12.7077L9.00061 12.0006ZM13.7077 8.70772C14.0982 8.31719 14.0982 7.68403 13.7077 7.2935C13.3172 6.90298 12.684 6.90298 12.2935 7.2935L13.7077 8.70772ZM5.83535 2.69766L5.7558 1.70083L5.83535 2.69766ZM7.78193 1.89136L7.13331 1.13024L7.78193 1.89136ZM2.69766 5.83535L1.70083 5.7558L2.69766 5.83535ZM1.89136 7.78193L1.13024 7.13331L1.89136 7.78193ZM1.89136 12.2193L1.13024 12.8679L1.89136 12.2193ZM2.69766 14.1659L1.70083 14.2454L2.69766 14.1659ZM5.83535 17.3036L5.9149 16.3067L5.83535 17.3036ZM7.78193 18.1099L8.43055 17.3487L7.78193 18.1099ZM12.2193 18.1099L11.5707 17.3487L12.2193 18.1099ZM14.1659 17.3036L14.2454 18.3004L14.1659 17.3036ZM17.3036 14.1659L18.3004 14.2454L17.3036 14.1659ZM18.1099 12.2193L17.3487 11.5707L18.1099 12.2193ZM18.1099 7.78193L17.3487 8.43055L18.1099 7.78193ZM17.3036 5.83535L16.3067 5.9149L17.3036 5.83535ZM14.1659 2.69766L14.2454 1.70083L14.1659 2.69766ZM12.2193 1.89136L12.8679 1.13024L12.2193 1.89136ZM6.2935 10.7077L8.2935 12.7077L9.70772 11.2935L7.70772 9.2935L6.2935 10.7077ZM9.70772 12.7077L13.7077 8.70772L12.2935 7.2935L8.2935 11.2935L9.70772 12.7077ZM5.9149 3.69449C6.8422 3.62049 7.72252 3.25585 8.43055 2.65247L7.13331 1.13024C6.74561 1.46064 6.26357 1.66031 5.7558 1.70083L5.9149 3.69449ZM3.69449 5.9149C3.78905 4.72997 4.72997 3.78905 5.9149 3.69449L5.7558 1.70083C3.59186 1.87351 1.87351 3.59186 1.70083 5.7558L3.69449 5.9149ZM2.65247 8.43055C3.25585 7.72252 3.62049 6.8422 3.69449 5.9149L1.70083 5.7558C1.66031 6.26357 1.46064 6.74561 1.13024 7.13331L2.65247 8.43055ZM2.65247 11.5707C1.88147 10.6659 1.88147 9.33528 2.65247 8.43055L1.13024 7.13331C-0.277789 8.78556 -0.277789 11.2157 1.13024 12.8679L2.65247 11.5707ZM3.69449 14.0863C3.62049 13.159 3.25585 12.2787 2.65247 11.5707L1.13024 12.8679C1.46064 13.2556 1.66031 13.7377 1.70083 14.2454L3.69449 14.0863ZM5.9149 16.3067C4.72997 16.2122 3.78905 15.2712 3.69449 14.0863L1.70083 14.2454C1.87351 16.4094 3.59186 18.1277 5.7558 18.3004L5.9149 16.3067ZM8.43055 17.3487C7.72252 16.7454 6.8422 16.3807 5.9149 16.3067L5.7558 18.3004C6.26357 18.3409 6.74561 18.5406 7.13331 18.871L8.43055 17.3487ZM11.5707 17.3487C10.6659 18.1198 9.33527 18.1198 8.43055 17.3487L7.13331 18.871C8.78556 20.279 11.2157 20.279 12.8679 18.871L11.5707 17.3487ZM14.0863 16.3067C13.159 16.3807 12.2787 16.7454 11.5707 17.3487L12.8679 18.871C13.2556 18.5406 13.7377 18.3409 14.2454 18.3004L14.0863 16.3067ZM16.3067 14.0863C16.2122 15.2712 15.2712 16.2122 14.0863 16.3067L14.2454 18.3004C16.4094 18.1277 18.1277 16.4094 18.3004 14.2454L16.3067 14.0863ZM17.3487 11.5707C16.7454 12.2787 16.3807 13.159 16.3067 14.0863L18.3004 14.2454C18.3409 13.7377 18.5406 13.2556 18.871 12.8679L17.3487 11.5707ZM17.3487 8.43055C18.1198 9.33527 18.1198 10.6659 17.3487 11.5707L18.871 12.8679C20.279 11.2157 20.279 8.78556 18.871 7.13331L17.3487 8.43055ZM16.3067 5.9149C16.3807 6.8422 16.7454 7.72252 17.3487 8.43055L18.871 7.13331C18.5406 6.74561 18.3409 6.26357 18.3004 5.7558L16.3067 5.9149ZM14.0863 3.69449C15.2712 3.78905 16.2122 4.72997 16.3067 5.9149L18.3004 5.7558C18.1277 3.59186 16.4094 1.87351 14.2454 1.70083L14.0863 3.69449ZM11.5707 2.65247C12.2787 3.25585 13.159 3.62049 14.0863 3.69449L14.2454 1.70083C13.7377 1.66031 13.2556 1.46064 12.8679 1.13024L11.5707 2.65247ZM12.8679 1.13024C11.2157 -0.277789 8.78556 -0.277789 7.13331 1.13024L8.43055 2.65247C9.33528 1.88147 10.6659 1.88147 11.5707 2.65247L12.8679 1.13024Z" fill="#388277" />
  </svg>
)

export const PendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StatusBox = styled(Typography)<StatusBoxProps>(({ borderColor }) => ({
  display: 'inline-block',
  fontWeight: '100',
  border: `1px solid ${borderColor}`,
  borderRadius: '30px',
  padding: '2px 11px',
}));

export const SidebarWrap = styled(Box)(() => ({
  ".MuiListItemText-root span": {
    color: "#fff"
  }
}));

export const ProjectWizardWrap = styled(Box)(() => ({
  boxShadow: '0px 1px 10px #ddd',
  borderRadius: '10px',
  padding: "24px",
  ".MuiStepper-root": {
    margin: '0 8px',
    "@media (max-width:767px)": {
      display: "block"
    },
    ".MuiStepConnector-root": {
      display: "none"
    },
    ".MuiStep-root": {
      width: '33.33%',
      padding: '15px 8px',
      "@media (max-width:767px)": {
        width: '100%',
        marginBottom: "3px"
      },
      'button': {
        padding: '14px 16px',

      },
      '.MuiStepLabel-label.Mui-active': {
        color: "#fff",
        fontWeight: '600'
      },
      ".MuiStepLabel-iconContainer.Mui-active svg": {
        color: "#fff",
        ".MuiStepIcon-text": {
          fill: '#771117',
          fontWeight: 'bold'
        }
      }
    }
  }
}));

export const ProjectTableStyle = styled(Box)(() => ({
  ".MuiTableContainer-root": {
    boxShadow: '0px 1px 10px #ddd',
    ".tableCollapse": {
      ".MuiTableRow-root ": {
        "&:hover": {
          backgroundColor: '#f8efef',
          cursor: 'auto'
        }
      },
    },
    "th": {
      fontWeight: 600,
      padding: "12px 8px",
      color: "#000",
      fontSize: "14px"
    },
    "td": {
      padding: '12px 8px',
      fontSize: "14px"
    },
    "tbody .MuiTableRow-root ": {
      "&:hover": {
        backgroundColor: '#f8efef',
        // cursor: 'n-resize'
      }
    },
    ".btnAction": {
      backgroundColor: "#f5e2e3",
      margin: "0 4px",
      minWidth: "50px",
      padding: 0
    },
    ".MuiTabs-root": {
      "button": {
        fontSize: '12px'
      },
      "button.Mui-selected": {
        fontWeight: 'bold'
      }
    },
    ".MuiTabPanel-root": {
      backgroundColor: "#ffff",
      marginTop: '16px',
      position: 'relative',
      '.MuiBackdrop-root': {
        position: 'absolute'
      }
    },
    ".projectInfoTab": {
      ".MuiTabPanel-root": {
        backgroundColor: "#f2f2f2"
      },
    }
  },
  ".paneListInfoTable": {
    "tbody tr td:nth-of-type(2)": {
      width: '50%'
    }
  }
}));

export const HeroMain = styled(Box)(() => ({
  display: "flex",
  width: "calc(100% - 300px)",
  "@media (max-width:1280px)": {
    width: "100%",
  }
}));

export const CustomReactLink = MuiStyled(Link)(({ theme }) => ({
  fontSize: "15px",
  color: "black",
  marginBottom: "5px",
  display: "flex",
  justifyContent: "space-between",
}));