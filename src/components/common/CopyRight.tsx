// packages block
import { Box, Typography, Link } from "@mui/material";

const CopyRight = () => {

  return (
    <Box pt={4} display="flex" textAlign="center" justifyContent="center" alignItems="center">

      <Typography variant="body2" display="flex" color="textSecondary" align="center">
        Copyright &copy;
        <Link color="inherit" href="/" target="_blank">
          Suppliers Manager
        </Link>
        &nbsp;
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box >
  );
};

export default CopyRight;
