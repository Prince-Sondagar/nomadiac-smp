// packages block
import { Box, Typography } from "@mui/material";
import { FC } from "react";
// component block
import { AuthContainer, AuthLayoutContainer } from "../../theme/styleComponents";
// other block
import { LayoutProps } from "../../interfaceTypes";

export const AuthLayout: FC<LayoutProps> = ({ children, title, subTitle }): JSX.Element => (
  <AuthLayoutContainer>
    <Box maxWidth='543px' margin="auto" width='100%'>
      <Box textAlign='center' mr={1}>
        <img src="/images/logo.png" className="logo" alt="logo" width="200px" height='200px' />
      </Box>

      <AuthContainer>
        <Typography variant="h1" marginBottom='10px'>
          {title}
        </Typography>

        {subTitle &&
          <Typography margin='10px 0'>
            {subTitle}
          </Typography>
        }

        {children}
      </AuthContainer>
    </Box>
  </AuthLayoutContainer>
)