import { createTheme } from '@mui/material';
import palette from './palette'
import typography from './typography'
import components from './components'

const customTheme = createTheme({
  palette,
  typography,
  components,
});

export default customTheme;
