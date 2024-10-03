import { Backdrop, CircularProgress } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { defenderAPISearch } from '../../../utils/defenderApi';
import { ValidateSurveyPayload } from '../../../interfaceTypes';
import { PAGE_NOT_FOUND_ROUTE } from '../../../constants';

const SurveyVerifyComponent: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const PanelistID = searchParam.get("panelistId") || "";
  const projectId = searchParam.get("projectId") || "";
  const mode = searchParam.get("mode") || "";
  const supplierQuotaGroupId = searchParam.get("supplierQuotaGroupId") || "";
  const dataQualityScore = searchParam.get('dataQualityScore');

  const fetchDefenderScoreAndSubmit = async () => {
    try {
      const defenderApiScore: number | undefined = mode !== "test" ? await defenderAPISearch({ PanelistID }) : 0;
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/survey/verify?projectId=${projectId}&supplierQuotaGroupId=${supplierQuotaGroupId}&panelistId=${PanelistID}&defenderApiScore=${defenderApiScore}&dataQualityScore=${dataQualityScore || 0}`, { method: "GET" });
      const data: ValidateSurveyPayload = await response.json();
      const { local, url = "" } = data || {};
      if (local && url)
        navigate(url);
      else if (url)
        window.location.href = url;
    } catch (error) {
      console.log(error)
      navigate(PAGE_NOT_FOUND_ROUTE)
    }
  }

  useEffect(() => {
    if (PanelistID) {
      fetchDefenderScoreAndSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default SurveyVerifyComponent;