import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  SurveyResult,
  PaginationPayload,
  SubmissionStats,
  PaginationInput,
  Supplier,
  Project,
  QuotaGroup,
  Maybe,
  useUpdateSurveyResultWithIdReConciliationMutation,
} from "../../generated";
import SupplierStat from "./SupplierStat";
import SurveyResultTable from "./SurveyResultTable";
import { updateSupplierResultWithIdReconsiliatinHandler } from "../../utils/project";
import { useSnackbar } from "notistack";
import { GRAPHQL_QUERY_POLICY } from "../../constants";

type IStatitics = {
  stats: Array<SubmissionStats>;
  resultLoading: boolean;
  statLoading: boolean;
  filterSelection: {
    selectedSupplier: string | 0;
    selectedQuotaGroup: string | 0;
  };
  setFilterSelection: Dispatch<
    SetStateAction<{
      selectedSupplier: string | 0;
      selectedQuotaGroup: string | 0;
    }>
  >;
  results: Array<SurveyResult>;
  pagination: PaginationPayload;
  paginationState: PaginationInput;
  setPaginationState: Dispatch<SetStateAction<PaginationInput>>;
  supplierList: Array<Supplier>;
  refetchResult: Function;
  project: Project;
  setResults: Dispatch<SetStateAction<SurveyResult[]>>;
};

const Statitics = ({
  stats,
  resultLoading,
  statLoading,
  filterSelection,
  setFilterSelection,
  results,
  pagination,
  paginationState,
  setPaginationState,
  supplierList,
  refetchResult,
  project,
}: IStatitics) => {
  const [quotaGroupList, setquotaGroupList] = useState<
    Maybe<Maybe<QuotaGroup>[]>
  >([]);
  const [groupSupplierList, setGroupSupplierList] = useState<Supplier[]>([]);
  const [inputValue, setInputValue] = useState<{
    supplierId: string;
    supplierResult: string;
  }>({ supplierId: "", supplierResult: "" });
  const { enqueueSnackbar } = useSnackbar();

  const [updateSurveyResultWithId, { loading: updateResultLoading }] =
    useUpdateSurveyResultWithIdReConciliationMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
    });

  useEffect(() => {
    if (project) setquotaGroupList(project?.quotaGroup || []);
  }, [project]);

  useEffect(() => {
    if (filterSelection?.selectedQuotaGroup) {
      const list = quotaGroupList
        ?.find((item) => item?.id === filterSelection?.selectedQuotaGroup)
        ?.supplierQuotaGroup?.map(({ supplier }) => supplier);
      setGroupSupplierList(list as Supplier[]);
    } else setGroupSupplierList(supplierList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelection?.selectedQuotaGroup]);

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newsupplierId = inputValue?.supplierId?.split(",");
    const newsupplierResult = inputValue?.supplierResult
      ?.toUpperCase()
      .split(",");
    setInputValue({ supplierId: "", supplierResult: "" });
    if (newsupplierId.length === newsupplierResult.length) {
      await updateSurveyResultWithId({
        variables: updateSupplierResultWithIdReconsiliatinHandler({
          newsupplierId,
          newsupplierResult,
        }),
      });
      await refetchResult();
    } else {
      enqueueSnackbar(
        "There should be supplierId and Supplier Result be equal length"
      );
    }
  };

  return (
    <>
      <SupplierStat
        stats={stats}
        loading={statLoading}
        quotaGroupList={quotaGroupList}
      />
      <Box mt={5}>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6}>
            <Typography color={"#000"} mb={0.5}>
              Select Quota Group
            </Typography>
            <FormControl fullWidth>
              <Select
                name="Quota Group"
                value={filterSelection?.selectedQuotaGroup}
                onChange={({ target: { value } }) =>
                  setFilterSelection({
                    ...filterSelection,
                    selectedQuotaGroup: value,
                    selectedSupplier: 0,
                  })
                }
              >
                <MenuItem key={-1} value={0}>
                  {"None"}
                </MenuItem>
                {quotaGroupList?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color={"#000"} mb={0.5}>
              Select Supplier
            </Typography>
            <FormControl fullWidth>
              <Select
                name="supplier"
                value={filterSelection?.selectedSupplier}
                onChange={({ target: { value } }) =>
                  setFilterSelection({
                    ...filterSelection,
                    selectedSupplier: value,
                  })
                }
              >
                <MenuItem key={-1} value={0}>
                  {"None"}
                </MenuItem>
                {groupSupplierList?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <SurveyResultTable
        loading={resultLoading}
        stats={results}
        refreshTable={refetchResult}
        filterSelection={filterSelection}
        supplierList={supplierList}
        quotaGroupList={quotaGroupList}
        pagination={pagination}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
      />

      {results.length ? (
        <Grid item xs={12} mt={2} md={9}>
          <Grid container spacing={2} alignItems={"end"}>
            <Grid item xs={12} md={6}>
              <Typography color={"#000"} fontWeight={600} mb={1}>
                Supplier Ids
              </Typography>
              <TextField
                name="supplierId"
                multiline
                value={inputValue.supplierId}
                fullWidth
                onChange={({ target: { name, value } }) =>
                  handleInputChange({ name, value })
                }
              />
            </Grid>
            <Grid item xs={9} md={6}>
              <Typography color={"#000"} fontWeight={600} mb={1}>
                Supplier Results
              </Typography>
              <TextField
                name="supplierResult"
                multiline
                value={inputValue.supplierResult}
                fullWidth
                onChange={({ target: { name, value } }) =>
                  handleInputChange({ name, value })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={3} mt={2} textAlign={{ xs: "right", md: "left" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                whiteSpace: "nowrap",
                padding: "6px",
                fontSize: "14px",
                minWidth: { sm: "120px" },
              }}
              onClick={submitHandler}
              disabled={
                !(inputValue.supplierId && inputValue.supplierResult) ||
                updateResultLoading
              }
              endIcon={
                updateResultLoading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
};

export default Statitics;
