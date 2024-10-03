// packages block
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, Menu, MenuItem, Toolbar, Button, Avatar } from "@mui/material";
//components block
import { AuthContext } from "../../context";
//others block
import { mapEnums, removeToken, toTitleCase } from "../../utils";
import { LOGIN_ROUTE } from "../../constants";
import { BrandTitle, CustomAppBar, CustomMenuButton, UserInfoBox } from "../../theme/styleComponents";
import { HeaderPropsType } from "../../interfaceTypes";

const Header: FC<HeaderPropsType> = ({ setToggle, openCustomDrawer }) => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, setIsLoggedIn } = useContext(AuthContext);
  const { firstName, lastName, roles } = currentUser || {};
  const { role = "" } = (roles || [])[0] || {}
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutButton = async () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate(LOGIN_ROUTE);
  };

  const fullName = `${firstName || ""} ${lastName || ""}`
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id="header-profile-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem component={Link} to={USER_PROFILE_ROUTE} onClick={handleMenuClose}>
        Profile
      </MenuItem> */}

      <MenuItem onClick={handleLogoutButton}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box display="flex">
      <CustomAppBar position="absolute" color="default" appbarshift={openCustomDrawer} >
        <Toolbar>
          <CustomMenuButton className="herobutton" edge="start" color="inherit" onClick={() => setToggle && setToggle((state) => !state)}>
            <MenuIcon />
          </CustomMenuButton>

          <Avatar src="/images/logo.png" alt="logo" variant="rounded" sx={{ mr: 1, width: 100, height: 60 }} />

          <BrandTitle variant="h6" color="inherit" noWrap />

          <Box display="flex" alignItems="center" justifyContent="center">

            <Button onClick={handleProfileMenuOpen}>
              <Box className="header-account-button" display="flex" color="black" alignItems="center">
                <Avatar sx={{ width: 30, height: 30 }}>{mapEnums(role || undefined)}</Avatar>
                <UserInfoBox ml={1} minWidth={100} color="black">{toTitleCase(fullName || "")}</UserInfoBox>
              </Box>
            </Button>

            {renderMenu}
          </Box>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
};

export default Header;
