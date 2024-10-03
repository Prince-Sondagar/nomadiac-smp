import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Download, Edit } from "@mui/icons-material";
import { ProjectTableStyle } from "../../theme/styleComponents";
import TableLoader from "../common/TableLoader";
import ConfirmationModal from "../common/ConfirmationDelete";
import {
  Maybe,
  PaginationInput,
  PaginationPayload,
  QuotaGroup,
  Supplier,
  SurveyResult,
  useRemoveSurveyResultsMutation,
} from "../../generated";
import { GRAPHQL_QUERY_POLICY } from "../../constants";
import { removeSurveyResultHandler } from "../../utils/project";
import { useSnackbar } from "notistack";
import { capitalizeFirstLetter } from "../../utils";
import EditSupplierResult from "./EditSupplierResult";
import { exportCsv } from "../../utils/CsvDownload";
import Pagination from "../pagination/Pagination";

type ISupplierStat = {
  stats: Array<SurveyResult>;
  loading: boolean;
  refreshTable: Function;
  filterSelection: {
    selectedSupplier: string | 0;
    selectedQuotaGroup: string | 0;
  };
  supplierList: Array<Supplier>;
  quotaGroupList: Maybe<Maybe<QuotaGroup>[]>;
  pagination: PaginationPayload;
  paginationState: PaginationInput;
  setPaginationState: Dispatch<SetStateAction<PaginationInput>>;
};

const SurveyResultTable = ({
  stats,
  loading,
  refreshTable,
  filterSelection,
  supplierList,
  quotaGroupList,
  pagination,
  paginationState,
  setPaginationState,
}: ISupplierStat) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [openDeleteModal, setOpenDeleteModal] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("idle");
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<Array<string>>([]);

  const [removeSurveyResults, { loading: removeLoading }] =
    useRemoveSurveyResultsMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
    });

  const DeleteResultHandler = async () => {
    if (openDeleteModal) {
      await removeSurveyResults({
        variables: removeSurveyResultHandler(openDeleteModal),
      });
      await refreshTable();
      setOpenDeleteModal("");
      enqueueSnackbar("Project Result Deleted Successfully!");
    }
  };

  const download = () => {
    setStatus("loading");
    const selectedSupplier =
      typeof filterSelection?.selectedSupplier === "number"
        ? undefined
        : filterSelection?.selectedSupplier;
    const selectedQuotaGroup =
      typeof filterSelection?.selectedQuotaGroup === "number"
        ? undefined
        : filterSelection?.selectedQuotaGroup;
    exportCsv(id, selectedSupplier, selectedQuotaGroup);
    setStatus("success");
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(stats.map((li: SurveyResult) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheckAll(false);
      setIsCheck(isCheck.filter((item: string) => item !== id));
    }
  };

  return (
    <ProjectTableStyle>
      {!stats?.length ? (
        <Box boxShadow={"0px 0px 10px #ddd"} p={3} mt={3} borderRadius={"4px"}>
          <Typography fontSize={"18px"}>
            There is no results available
          </Typography>
        </Box>
      ) : (
        <>
          <Box py={3}>
            <Box style={{ display: "flex" }}>
              {/* <Typography ml={1} fontWeight={"bold"} fontSize={18}>{`Supplier : `}</Typography> */}
              {/* <Typography ml={1} fontWeight={"bold"} fontSize={18}>{!loading && pagination?.totalCount}</Typography> */}
            </Box>
            <Grid container alignItems={"end"}>
              <Grid item xs={12} textAlign={"right"} mt={{ xs: 3, md: 0 }}>
                <Tooltip title="Edit Results">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      whiteSpace: "nowrap",
                      padding: "6px",
                      fontSize: "14px",
                    }}
                    onClick={() => setOpenEditModal(true)}
                    disabled={status === "loading" || !isCheck.length}
                    endIcon={
                      status === "loading" && (
                        <CircularProgress size={20} color="inherit" />
                      )
                    }
                  >
                    <Edit />
                  </Button>
                </Tooltip>
                <Tooltip title="Export CSV">
                  <span>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        whiteSpace: "nowrap",
                        padding: "6px",
                        fontSize: "14px",
                        ml: 2,
                      }}
                      onClick={() => download()}
                      disabled={status === "loading"}
                      endIcon={
                        status === "loading" && (
                          <CircularProgress size={20} color="inherit" />
                        )
                      }
                    >
                      <Download />
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#edced0" }}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      name="selectAll"
                      id="selectAll"
                      onClick={() => handleSelectAll()}
                      checked={isCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center">Company Name</TableCell>
                  <TableCell align="center">Quota Group</TableCell>
                  <TableCell align="center">Panelist Id</TableCell>
                  <TableCell align="center">Result</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <TableLoader numberOfRows={10} numberOfColumns={1} />
                    </TableCell>
                  </TableRow>
                ) : (
                  stats?.map((stat: SurveyResult) => {
                    const supplier = supplierList.find(
                      (qs: Supplier) =>
                        qs?.id === stat?.supplierQuotaGroup?.supplierId
                    );
                    const id = stat?.id;
                    const quotagroup =
                      quotaGroupList &&
                      quotaGroupList?.find((sd) =>
                        sd?.supplierQuotaGroup?.find(
                          (xs) => xs.id === stat?.supplierQuotaGroupId
                        )
                      );

                    return (
                      <TableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            key={id}
                            name={"name"}
                            id={id}
                            checked={isCheck?.includes(id)}
                            onClick={(e) => handleClick(e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {supplier?.companyName}
                        </TableCell>
                        <TableCell align="center">{quotagroup?.name}</TableCell>
                        <TableCell align="center">{stat?.panelistId}</TableCell>
                        <TableCell align="center">
                          {capitalizeFirstLetter(stat?.surveyResultStatus)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            fullWidth
                            variant="contained"
                            style={{ width: "max-content" }}
                            onClick={() => setOpenDeleteModal(stat?.id)}
                          >
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {stats.length ? (
              <Pagination
                pagination={pagination}
                paginationState={paginationState}
                setPaginationState={setPaginationState}
              />
            ) : (
              ""
            )}
          </TableContainer>
        </>
      )}

      <EditSupplierResult
        isOpen={openEditModal}
        setOpen={setOpenEditModal}
        result={isCheck}
        refreshTable={refreshTable}
        setIsCheck={setIsCheck}
        setIsCheckAll={setIsCheckAll}
      />
      <ConfirmationModal
        title="Delete Result?"
        isOpen={!!openDeleteModal}
        description="Are you sure you want to delete this result?"
        handleDelete={DeleteResultHandler}
        setOpen={setOpenDeleteModal}
        isLoading={removeLoading}
      />
    </ProjectTableStyle>
  );
};

export default SurveyResultTable;
