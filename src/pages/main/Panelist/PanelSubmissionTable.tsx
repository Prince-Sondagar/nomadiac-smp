import { ProjectTableStyle } from '../../../theme/styleComponents';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Panelist } from '../../../generated';


type IPanelSubmissiontable = {
  panelist: Panelist;
}

const PanelSubmissiontable = ({ panelist }: IPanelSubmissiontable) => {
  const { signupSurveyResponse = [] } = panelist || {};

  return (
    <ProjectTableStyle>
      <TableContainer component={Paper} className='paneListInfoTable'>
        <Box>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#edced0" }}>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signupSurveyResponse.map((signupSurveyResponseItem, index) => {
                const { id, answer = "", question } = signupSurveyResponseItem || {}
                return (
                  <TableRow key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{question}</TableCell>
                    <TableCell>
                      <Box display={'flex'} flexWrap={"wrap"}>
                        {answer || "N/A"}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </ProjectTableStyle >
  )
}

export default PanelSubmissiontable;