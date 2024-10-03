import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NoDataFoundComponent from "../../../components/common/NoDataFoundComponent";
import {
  PaginationInput,
  PaginationPayload,
  PointHistory,
  useFetchPanelistPointHistoryQuery,
} from "../../../generated";
import { useState } from "react";
import { GRAPHQL_QUERY_POLICY } from "../../../constants";
import Pagination from "../../../components/pagination/Pagination";
import { Maybe } from "yup";
import TableLoader from "../../../components/common/TableLoader";
import { formatDate } from "../../../utils";
import { fetchPointHistoryHandler } from "./../../../utils/surveyHandler";
import { useParams } from "react-router-dom";
import { ProjectTableStyle } from "../../../theme/styleComponents";

const PanelistPointHistory = () => {
  const { id } = useParams();
  const [paginationState, setPaginationState] = useState<PaginationInput>({
    limit: 10,
    page: 1,
  });
  const [pagination, setPagination] = useState<Maybe<PaginationPayload>>({});
  const [pointHistoryList, setPointHistoryList] = useState<PointHistory[]>([]);

  const { loading } = useFetchPanelistPointHistoryQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    variables: fetchPointHistoryHandler(id || "", paginationState),
    onCompleted({ fetchPanelistPointHistory }) {
      const list = fetchPanelistPointHistory?.pointHistory;
      setPointHistoryList(list as PointHistory[]);
      const paginationData = fetchPanelistPointHistory?.pagination;
      if (paginationData) setPagination(paginationData);
      else setPagination(pagination);
    },
  });

  return (
    <>
      <Box>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={600}>
              Point History
            </Typography>
          }
        />
        <ProjectTableStyle>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "#edced0" }}>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Points</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Demanded At</TableCell>
                  <TableCell align="center">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <TableLoader numberOfRows={10} numberOfColumns={5} />
                    </TableCell>
                  </TableRow>
                ) : (
                  pointHistoryList?.map((pointHistory, index) => {
                    const { id, points, details, updatedAt, createdAt } =
                      pointHistory || {};
                    return (
                      <TableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{points}</TableCell>
                        <TableCell align="center">{details}</TableCell>
                        <TableCell align="center">
                          {formatDate(+updatedAt)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(+createdAt)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ProjectTableStyle>
        {!loading && !pointHistoryList?.length && (
          <Box display="flex" justifyContent="center" pb={12} pt={5}>
            <NoDataFoundComponent />
          </Box>
        )}
      </Box>
      {pointHistoryList.length > 5 ? (
        <Box mb={-4}>
          <Pagination
            pagination={pagination as PaginationPayload}
            paginationState={paginationState as PaginationInput}
            setPaginationState={setPaginationState}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default PanelistPointHistory;
