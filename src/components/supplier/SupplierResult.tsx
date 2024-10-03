import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { GRAPHQL_QUERY_POLICY } from "../../constants";
import {
  PaginationInput,
  PaginationPayload,
  Project,
  SubmissionStats,
  Supplier,
  SurveyResult,
  useFetchAllProjectsQuery,
  useFetchAllSuppliersQuery,
  useFetchProjectStatsQuery,
  useFetchSurveyResultsQuery,
} from "../../generated";
import { fetchSurveyResultsHandler } from "../../utils/project";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Statitics from "./Statitics";

const tabListData = [{ value: "statistics", label: "Statistics" }];

const SupplierResult = () => {
  const [filterSelection, setFilterSelection] = useState<{
    selectedSupplier: string | 0;
    selectedQuotaGroup: string | 0;
  }>({ selectedSupplier: 0, selectedQuotaGroup: 0 });
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [paginationState, setPaginationState] = useState<PaginationInput>({
    limit: 25,
    page: 1,
  });
  const [pagination, setPagination] = useState<PaginationPayload>({});
  const [surveyResult, setSurveyResult] = useState<SurveyResult[]>([]);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [stats, setStats] = useState<Array<SubmissionStats>>([]);
  const [value, setValue] = useState<string>("statistics");
  const [project, setProject] = useState<Project | any>({});

  const { loading: resultLoading, refetch: refetchAllSurveyResult } =
    useFetchSurveyResultsQuery({
      ...GRAPHQL_QUERY_POLICY,
      variables: fetchSurveyResultsHandler(
        id as string,
        filterSelection,
        paginationState
      ),
      onError() {
        enqueueSnackbar("Something is wrong, couldn't fetch result");
      },
      onCompleted(data) {
        if (
          data?.fetchSurveyResults &&
          Array.isArray(data?.fetchSurveyResults?.results)
        ) {
          setSurveyResult(data?.fetchSurveyResults?.results as SurveyResult[]);
          setPagination(
            data?.fetchSurveyResults?.pagination as PaginationPayload
          );
        }
      },
    });

  const { data: fetchProject } = useFetchAllProjectsQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: {
      projectInput: {
        paginationOptions: { limit: 100, page: 1 },
      },
    },
  });

  const { loading: statLoading } = useFetchProjectStatsQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: { project: { id: id as string } },

    onCompleted(data) {
      if (data) {
        const {
          fetchProjectStats: { stats },
        } = data;
        if (stats) setStats(stats as Array<SubmissionStats>);
      }
    },
  });

  useFetchAllSuppliersQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    variables: {
      suppliersInput: {
        paginationOptions: {
          page: 1,
          limit: 100,
        },
      },
    },
    onCompleted(data) {
      if (
        data?.fetchAllSuppliers &&
        Array.isArray(data?.fetchAllSuppliers?.suppliers)
      )
        setSupplierList(data?.fetchAllSuppliers?.suppliers as Supplier[]);
    },
  });

  useEffect(() => {
    if (fetchProject) {
      const list: Array<Project | any> =
        fetchProject?.fetchAllProjects.projects;
      const project = list?.find((item) => item?.id === id);
      setProject(project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProject]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            {tabListData?.map((tab, index) => (
              <Tab key={index} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>

        {/* <TabPanel value="supplier" sx={{ px: 0 }}>

          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl fullWidth>
              <Select name="panelist" value={createEditSupplier?.selectedUser || ""} onChange={({ target }) => setCreateEditSupplier({ ...createEditSupplier, selectedUser: target?.value })}>
                {nonUserSupplierList?.map((user: User) => <MenuItem key={user?.id} value={user.id}>{user.firstName}</MenuItem>)}
              </Select>
            </FormControl>
            <Button variant='contained' color="primary" sx={{ whiteSpace: 'nowrap', padding: "6px", fontSize: '14px', ml: 2 }} onClick={() => setCreateEditSupplier({ ...createEditSupplier, isOpen: true })} disabled={status === 'loading' || !createEditSupplier.selectedUser} endIcon={status === 'loading' && <CircularProgress size={20} color="inherit" />}>
              Add Supplier
            </Button>
          </Box>

          {projectSuppliers && <SupplierTable projectId={project?.id} refreshPanelList={refetchAllProjects} projectSuppliers={projectSuppliers} refreshList={refetchAllSurveyResult} setselectEditSupplier={setselectEditSupplier} createEditSupplier={createEditSupplier} setCreateEditSupplier={setCreateEditSupplier} />}

        </TabPanel> */}

        <TabPanel value="statistics" sx={{ px: 0 }}>
          <Statitics
            stats={stats}
            resultLoading={resultLoading}
            statLoading={statLoading}
            filterSelection={filterSelection}
            setFilterSelection={setFilterSelection}
            results={surveyResult}
            setResults={setSurveyResult}
            refetchResult={refetchAllSurveyResult}
            pagination={pagination}
            paginationState={paginationState}
            setPaginationState={setPaginationState}
            supplierList={supplierList}
            project={project}
          />
        </TabPanel>
      </TabContext>

      {/* <AddSupplierDetails
        createEditSupplier={createEditSupplier}
        onClose={setCreateEditSupplier}
        // refreshList={refetchAllProjects}
        // refreshPanelList={refreshSupplierList}
        project={project}
        quotaInputList={undefined}
        setQuotaInputList={undefined}
      /> */}
    </>
  );
};

export default SupplierResult;
