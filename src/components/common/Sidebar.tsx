// packages block
import { Dispatch, FC, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, List, ListItemIcon, ListItemText, Hidden, ListItemButton } from "@mui/material";

// styles and context block
import { NAV_LIST_ITEMS } from "../../constants";
import { DesktopDrawer, MobileDrawer, SidebarWrap } from "../../theme/styleComponents";
import { MuiMobilePaperComponent } from "../../theme/styleConstants";
import palette from "../../theme/palette";

export interface ISideBar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openCustomDrawer: boolean;
}

const Sidebar: FC<ISideBar> = ({ open, setOpen, openCustomDrawer }): JSX.Element => {
  const { pathname, state } = useLocation();

  const navigate = useNavigate();

  const handleDrawerClose = () => setOpen(!open);

  const Drawer = () => (
    <SidebarWrap>
      <Box display="flex" alignItems="center" justifyContent="space-between" pt={2} height={58} />
      <List>
        {NAV_LIST_ITEMS?.map(({ link: routeLink = "", title, Icon }, index) =>
          <ListItemButton key={index + 2} onClick={() => navigate(routeLink)} selected={(pathname === routeLink) || (state === routeLink)}>
            <ListItemIcon sx={{ color: palette.common.white }}>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        )}
      </List>
    </SidebarWrap>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box boxShadow='5px 0px 5px rgba(0, 0, 0, 0.05)'>
      <Hidden smUp implementation="css">
        <DesktopDrawer
          container={container}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}

          PaperProps={{
            sx: {
              width: '300px',
              background: palette.primary.main
            }
          }}
        >
          <Drawer />
        </DesktopDrawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <MobileDrawer
          variant="permanent"
          anchor="left"
          open={openCustomDrawer}
          PaperProps={{
            sx: MuiMobilePaperComponent
          }}
        >
          <Drawer />
        </MobileDrawer>
      </Hidden>
    </Box>
  );
};

export default Sidebar;
