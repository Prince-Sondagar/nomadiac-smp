import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import TableLoader from "../../../components/common/TableLoader";
import { ProjectTableStyle } from "../../../theme/styleComponents";
import Pagination from "../../../components/pagination/Pagination";
import NoDataFoundComponent from "../../../components/common/NoDataFoundComponent";
import { mapEnums } from "../../../utils";
import { Maybe, PaginationPayload, SurveyResult, useFetchSurveyResultsLazyQuery, } from "../../../generated";
import { GRAPHQL_QUERY_POLICY } from "../../../constants";

const PanelistSurveyResult = () => {
  const { id } = useParams();
  const [surveyResults, setSurveyResult] = useState<Array<Maybe<SurveyResult>>>([]);
  const [pagination, setPagination] = useState<PaginationPayload>({});
  const [paginationState, setPaginationState] = useState({ limit: 25, page: 1 });

  const [fetchSurveyResults, { loading: resultLoading }] = useFetchSurveyResultsLazyQuery({
    ...GRAPHQL_QUERY_POLICY as any,
    onError() { },

    onCompleted(data) {
      const { fetchSurveyResults: { pagination, results } } = data
      setSurveyResult(results);
      const { page = 1, limit = 25, totalCount, totalPages } = pagination || {}
      setPagination({ page, limit, totalCount, totalPages });
    },
  });

  useEffect(() => {
    fetchSurveyResults({
      variables: {
        projectResult: {
          panelistId: id,
          paginationOptions: paginationState,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSurveyResults, paginationState]);

  return (
    <Box>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            Survey History
          </Typography>
        }
      />
      <ProjectTableStyle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#edced0" }}>
              <TableRow>
                <TableCell align="center">Survey ID</TableCell>
                <TableCell align="center">CPI</TableCell>
                <TableCell align="center">Survey Source</TableCell>
                <TableCell align="center">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultLoading ? (
                <TableRow>
                  <TableCell colSpan={10}>
                    <TableLoader numberOfRows={10} numberOfColumns={4} />
                  </TableCell>
                </TableRow>
              ) : (
                surveyResults?.map((surveyResult) => {
                  const { cpi, surveySource, surveyResultStatus, surveyId, transactionId } = surveyResult || {}
                  return (
                    <TableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {surveyId || transactionId || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {cpi || "N/A"}
                      </TableCell>
                      <TableCell align="center">{mapEnums(surveySource)}</TableCell>
                      <TableCell align="center">
                        {mapEnums(surveyResultStatus)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          {surveyResults.length ? (
            <Pagination
              pagination={pagination}
              paginationState={paginationState}
              setPaginationState={setPaginationState}
            />
          ) : (
            ""
          )}
        </TableContainer>
      </ProjectTableStyle>
      {!resultLoading && !surveyResults.length && (
        <Box display="flex" justifyContent="center" pb={12} pt={5}>
          <NoDataFoundComponent />
        </Box>
      )}
    </Box>
  );
};

export default PanelistSurveyResult;
