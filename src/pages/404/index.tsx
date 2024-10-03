// package import
import { FC } from 'react';
import { Link } from 'react-router-dom';
// other imports
import { Box, Container, Typography, Button } from '@mui/material';
import { ErrorBox, ErrorText } from '../../theme/styleComponents';
import { FOUR_O_FOUR, PAGE_NOT_FOUND, LOOKS_LIKE_AN_EMPTY_SPACE, USER_ROUTE } from '../../constants';

const PageNotFound: FC = (): JSX.Element => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' height='100vh'>
        <ErrorText color="primary" align='center'>{FOUR_O_FOUR}</ErrorText>

        <ErrorBox>
          <Typography color="primary" component="h1" variant="h1" align='center' fontSize='68px'>
            {PAGE_NOT_FOUND}
          </Typography>

          <Box maxWidth={500} pt={1} pb={4} px='20px'>
            <Typography variant='body2' align='center'>
              {LOOKS_LIKE_AN_EMPTY_SPACE}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" component={Link} to={USER_ROUTE}>
            Back
          </Button>
        </ErrorBox>
      </Box>
    </Container>
  )
}
export default PageNotFound;