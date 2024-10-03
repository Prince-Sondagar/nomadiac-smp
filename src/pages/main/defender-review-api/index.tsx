import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
//components
import { Alert } from '../../../components/common/Alert';
import { AuthContainer, AuthLayoutContainer } from '../../../theme/styleComponents';
//other block
import { defenderReviewAPI } from '../../../utils';
import { LOGIN_ROUTE } from '../../../constants';

const DefenderReviewApi: FC = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const panelistId = searchParam.get("panelistId") || "";
  const projectId = searchParam.get("projectId") || "";
  const mode = searchParam.get("mode") || "";
  const supplierQuotaGroupId = searchParam.get("supplierQuotaGroupId") || "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event?.preventDefault();
      if (text) {
        setLoading(true)
        const result = await defenderReviewAPI(text, panelistId);
        const { score: { composite_score = 0, } = {} } = result || {}
        navigate(`/survey/verify?projectId=${projectId}&supplierQuotaGroupId=${supplierQuotaGroupId}&panelistId=${panelistId}${mode ? "&mode=test" : ""}&dataQualityScore=${composite_score}`)
        setLoading(false)
      } else {
        Alert.error('Please Type Something.')
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target: { value = "" } } = event;
    setText(value)
  };

  useEffect(() => {
    if (!projectId || !panelistId || !supplierQuotaGroupId) {
      navigate(LOGIN_ROUTE)
    }
  }, [panelistId, projectId, supplierQuotaGroupId, navigate]);

  return (
    <AuthLayoutContainer>
      <Box maxWidth='543px' margin="auto" width='100%'>
        <AuthContainer>
          <Typography variant="h6" marginBottom='10px'>
            Why do you take surveys?
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label=""
              value={text}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
              }}
              disabled={loading}
              endIcon={
                loading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              Continue
            </Button>
          </form>
        </AuthContainer>
      </Box>
    </AuthLayoutContainer>
  )
}

export default DefenderReviewApi