import { ChangeEvent, useContext, useEffect, useState } from "react";
import PanelTable from "../PanelTable";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import {
  PaginationInput,
  PaginationPayload,
  PanelistReviewStatus,
  PanelistSignupSource,
  UserGender,
  UserStatus,
  useFetchAllPanelistsLazyQuery,
  Panelist,
  UserRole,
} from "../../../../generated";
import Pagination from "../../../../components/pagination/Pagination";

import {
  USState,
  australiaState,
  canadaStates,
  NewZealandStates,
  UKStates,
  GRAPHQL_QUERY_POLICY
} from "../../../../constants";

import { Download } from "@mui/icons-material";
import { exportCsvPanelist } from "../../../../utils/CsvDownload";
import { AuthContext } from "../../../../context";
import { capitalizeFirstLetter, sortStates } from "../../../../utils";
import { stateOptionType } from "../../../../interfaceTypes";

const Leads = () => {
  const [panelistList, setPanelistList] = useState<Panelist[]>([]);
  const [checked, setChecked] = useState(false);
  const context = useContext(AuthContext);
  const { currentUser } = context || {};
  const { roles = [] } = currentUser || {};
  const canExportCsv = roles?.find((roleItem) => {
    const { role } = roleItem || {};
    return role === UserRole.Admin || role === UserRole.SuperAdmin;
  });

  // Date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [exportCsvLoading, setExportCsvLoading] = useState<boolean>(false);

  const handleStartDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setStartDate(value);
  };

  const handleEndDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setEndDate(value);
  };

  // Handle Change for Advance Filters
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [paginationState, setPaginationState] = useState<PaginationInput>({
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState<PaginationPayload>({});
  const [isLoading, setIsLoading] = useState(true);
  const [stateCountry, setStateCountry] = useState<{
    states: string[];
    country: string[];
  }>({ states: [], country: [] });
  const [searchState, setSearchState] = useState<{
    searchQuery: string;
    id: string;
    gender: UserGender | "all";
    state: stateOptionType | { value: "all"; state: "All" };
    country: string;
    status: UserStatus | "all";
    panelistReviewStatus: PanelistReviewStatus | "all";
    signupSource?: PanelistSignupSource | "all";
  }>({
    searchQuery: "",
    gender: "all",
    state: { value: "all", state: "All" },
    country: "all",
    status: "all",
    panelistReviewStatus: "all",
    id: "",
    signupSource: "all",
  });
  const [fetchPanelist, { refetch }] = useFetchAllPanelistsLazyQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted({ fetchAllPanelists }) {
      setIsLoading(true);
      if (fetchAllPanelists) {
        let allUserCountry = stateCountry.country;
        if (!stateCountry.country.length)
          allUserCountry = fetchAllPanelists?.panelists
            ?.map((panelist) => panelist?.country || "")
            .reduce(
              (fc: string[], country) =>
                fc.find((c: string) => c === country) ? fc : [...fc, country],
              []
            );
        setStateCountry({
          states:
            fetchAllPanelists?.panelists
              ?.map((panelist) => panelist?.state || "")
              .reduce(
                (fc: string[], state) =>
                  fc.find((c: string) => c === state) ? fc : [...fc, state],
                []
              ) || [],
          country: allUserCountry,
        });
        const list = fetchAllPanelists?.panelists;
        setPanelistList(list as Panelist[]);
        setIsLoading(false);
        const paginationData = fetchAllPanelists.pagination;
        if (paginationData) setPagination(paginationData);
        else setPagination({});
      } else setPanelistList([]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
  });

  console.log("panelist====>", panelistList);

  const handleUserSearch = async () => {
    fetchPanelist({
      variables: {
        fetchPanelistsInput: {
          paginationOptions: paginationState,
          ...(searchState.searchQuery
            ? { searchQuery: searchState.searchQuery as string }
            : {}),
          ...(searchState.id ? { id: searchState.id as string } : {}),
          ...(searchState.gender !== "all"
            ? { gender: searchState.gender as UserGender }
            : {}),
          ...(searchState.state.value !== "all"
            ? { state: searchState.state.value as string }
            : {}),
          ...(searchState.country !== "all"
            ? { country: searchState.country as string }
            : {}),
          ...(searchState.status !== "all"
            ? { status: searchState.status as UserStatus }
            : {}),
          ...(searchState.panelistReviewStatus !== "all"
            ? {
              panelistReviewStatus:
                searchState.panelistReviewStatus as PanelistReviewStatus,
            }
            : {}),

          ...(searchState.signupSource !== "all"
            ? { signupSource: searchState.signupSource }
            : {}),

          from: startDate ? `${startDate} 00:00` : null,
          to: endDate ? `${endDate} 23:59` : null,
          panelistType: UserRole.MedPanel || ""
        },
      },
    });
  };

  const handleChangeFilterInput = ({
    target,
  }: {
    target: { name: string; value: any };
  }) => {
    setSearchState({ ...searchState, [target.name]: target.value });

    if (target.name === "country") {
      setCountry(target.value);
      setSearchState({
        ...searchState,
        state: { value: "all", state: "All" },
        [target.name]: target.value,
      });
    }
  };

  useEffect(() => {
    handleUserSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationState]);

  const [country, setCountry] = useState("");
  const countries = [
    { country: "United States", value: "United States" },
    { country: "Australia", value: "Australia" },
    { country: "Canada", value: "Canada" },
    { country: "United Kingdom", value: "United Kingdom" },
    { country: "New Zealand", value: "New Zealand" },
  ];

  // States of the selected country
  let selectedCountryStates: stateOptionType[];

  // Getting states of the selected coutry
  switch (country) {
    case "United States":
      selectedCountryStates = sortStates(USState);
      break;

    case "Australia":
      selectedCountryStates = sortStates(australiaState);
      break;
    case "Canada":
      selectedCountryStates = sortStates(canadaStates);
      break;
    case "United Kingdom":
      selectedCountryStates = sortStates(UKStates);
      break;
    case "New Zealand":
      selectedCountryStates = sortStates(NewZealandStates);
      break;
    default:
      selectedCountryStates = sortStates(USState);
  }

  const onDownloadPanelist = async () => {
    setExportCsvLoading(true);
    await exportCsvPanelist(searchState, startDate, endDate);
    setExportCsvLoading(false);
  };

  return (
    <Box className="table-overflow" pt={4}>
      <Box>
        <TextField
          name="searchQuery"
          label="Search"
          placeholder="Search by name and email"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          disabled={isLoading}
          sx={{ mr: 2, width: "280px", mb: "10px" }}
          value={searchState.searchQuery}
          onChange={handleChangeFilterInput}
        />
        <TextField
          name="id"
          label="ID"
          placeholder="Search by ID"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          disabled={isLoading}
          sx={{ mr: 2, width: "280px" }}
          value={searchState.id}
          onChange={handleChangeFilterInput}
        />
        <Tooltip
          title={checked ? "Less Filter" : "Advance Filter"}
          placement="top-start"
        >
          <TuneIcon
            onClick={handleChange}
            sx={{ cursor: "pointer", marginTop: "5px" }}
          />
        </Tooltip>
        <Box
          sx={{
            "& > :not(style)": {
              width: "100%",
            },
          }}
        >
          <Collapse in={checked} sx={{ marginTop: "20px" }}>
            <FormControl
              sx={{
                mr: 1,
                width: "180px",
                mb: "10px",
              }}
            >
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                name="country"
                label="Country"
                defaultValue="all"
                labelId="country-select-label"
                value={searchState.country}
                onChange={handleChangeFilterInput}
              >
                <MenuItem value="all">All</MenuItem>
                {countries.map(({ country, value }) => (
                  <MenuItem key={country} value={value}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mr: 1, width: "180px", mb: "10px" }}>
              <Autocomplete
                defaultValue={{ state: "All", value: "all" }}
                value={searchState.state}
                getOptionLabel={(option) => option.state}
                onChange={(_, value) => {
                  handleChangeFilterInput({
                    target: { name: "state", value: value },
                  });
                }}
                options={[
                  { value: "all", state: "All" },
                  ...selectedCountryStates,
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="State" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl sx={{ mr: 1, width: "180px", mb: "10px" }}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                name="gender"
                label="Gender"
                value={searchState.gender}
                onChange={handleChangeFilterInput}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.keys(UserGender).map((key, i) => (
                  <MenuItem key={i} value={(UserGender as any)[key]}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mr: 1, width: "180px", mb: "10px" }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                name="status"
                label="Status"
                value={searchState.status}
                onChange={handleChangeFilterInput}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.keys(UserStatus).map((key, i) => (
                  <MenuItem key={i} value={(UserStatus as any)[key]}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mr: 1, width: "180px", mb: "10px" }}>
              <InputLabel id="review-status-select-label">
                Review Status
              </InputLabel>
              <Select
                labelId="review-status-select-label"
                name="panelistReviewStatus"
                label="Review Status"
                value={searchState.panelistReviewStatus}
                onChange={handleChangeFilterInput}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.keys(PanelistReviewStatus).map((key, i) => (
                  <MenuItem key={i} value={(PanelistReviewStatus as any)[key]}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mr: 1, width: "180px", mb: "10px" }}>
              <InputLabel id="review-status-select-label">
                Signup Source
              </InputLabel>
              <Select
                labelId="review-status-select-label"
                name="signupSource"
                label="Signup Source"
                value={searchState.signupSource}
                onChange={handleChangeFilterInput}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.keys(PanelistSignupSource).map((key, i) => (
                  <MenuItem key={i} value={(PanelistSignupSource as any)[key]}>
                    {capitalizeFirstLetter(key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2, display: "contents", mb: "10px" }}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ paddingLeft: "2px" }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ paddingLeft: "4px" }}
              />
            </Box>
          </Collapse>
        </Box>
        <Button
          onClick={handleUserSearch}
          variant="contained"
          sx={{ mt: checked ? 1 : 0 }}
        >
          Search
        </Button>
        {canExportCsv && (
          <Tooltip title="Export CSV" sx={{ mr: 2 }} placement="top-start">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                padding: "6px",
                fontSize: "14px",
                ml: 2,
                marginTop: "3px",
              }}
              onClick={onDownloadPanelist}
              disabled={exportCsvLoading}
              endIcon={
                exportCsvLoading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              <Download />
            </Button>
          </Tooltip>
        )}
      </Box>
      <Box>
        <PanelTable
          panelist={panelistList}
          isLoading={isLoading}
          refreshTable={refetch}
        />
      </Box>
      {panelistList?.length ? (
        <Pagination
          pagination={pagination}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Leads;
