import { useState } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  colors,
  styled,
} from "@mui/material";
import {
  PendingIcon,
  ProjectTableStyle,
  StatusBox,
  VerifiedIcon,
} from "../../../theme/styleComponents";
import TableLoader from "../../../components/common/TableLoader";
import {
  Visibility,
  Payment,
  Summarize,
  DeleteForever,
  MoreVertOutlined,
  HowToRegOutlined,
  Scoreboard
} from "@mui/icons-material";
import NoDataFoundComponent from "../../../components/common/NoDataFoundComponent";
import { formatDate, toTitleCase } from "../../../utils";
import {
  Panelist,
  UserStatus,
  useRemovePanelistMutation,
  useResendVerificationEmailMutation,
} from "../../../generated";
import {
  GRAPHQL_QUERY_POLICY,
  PANEL_ROUTE,
  PAYMENT_REQUEST,
} from "../../../constants";
import palette from "../../../theme/palette";
import ConfirmationModal from "../../../components/common/ConfirmationDelete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { resendVerificationEmailHandler } from "../../../utils/project";
import { Alert } from "../../../components/common/Alert";

type IPanelTable = {
  panelist: Panelist[];
  isLoading: boolean;
  refreshTable: Function;
};

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: "15px",
  color: "black",
  marginBottom: "5px",
  display: "flex",
  justifyContent: "space-between",
}));

const PanelTable = ({ panelist, isLoading, refreshTable }: IPanelTable) => {
  const [menuStates, setMenuStates] = useState<{ anchorEl: HTMLElement; open: false }[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<string>("");

  const [removePanelist, { loading: removePanelistLoading }] =
    useRemovePanelistMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
      onCompleted(data) {
        const {
          removePanelist: { response },
        } = data;
        if (response?.status === 200)
          Alert.success(response?.message as string);
      },
    });

  const [resendVerificationEmail, { loading: resendVerificationEmailLoading }] =
    useResendVerificationEmailMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
      onError(error) {
        Alert.error(error?.message);
      },
      onCompleted(data) {
        const {
          resendVerificationEmail: { response },
        } = data;
        if (response?.status === 200)
          Alert.success(response?.message as string);
      },
    });

  const onDeleteClick = (panelId: string) => {
    setOpenDeleteModal(panelId);
  };

  const handleDeletePanelist = async () => {
    await removePanelist({
      variables: {
        removePanelistInput: {
          id: openDeleteModal,
        },
      },
    });
    await refreshTable();
    setOpenDeleteModal("");
  };

  const handleMenuOpen = ({
    e,
    index,
  }: {
    e: React.MouseEvent<HTMLElement>;
    index: number;
  }) => {
    const newMenuStates = [...menuStates] as any;
    newMenuStates[index] = {
      anchorEl: e?.currentTarget,
      open: true,
    };
    setMenuStates(newMenuStates);
  };

  const handleMenuClose = (index: number) => {
    const newMenuStates = [...menuStates] as any;
    newMenuStates[index] = {
      anchorEl: null,
      open: false,
    };
    setMenuStates(newMenuStates);
  };

  const verifyHandler = async (email: string) => {
    await resendVerificationEmail({
      variables: resendVerificationEmailHandler(email),
    });
    await refreshTable();
  };

  return (
    <Box className="table-overflow" pt={4}>
      <ProjectTableStyle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#edced0" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Email Verified</TableCell>
                <TableCell>User status</TableCell>
                <TableCell>Scamalitycs Score</TableCell>
                <TableCell>Fraud Score</TableCell>
                <TableCell>Review Status</TableCell>
                <TableCell>Joined At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={12}>
                    <TableLoader numberOfRows={10} numberOfColumns={12} />
                  </TableCell>
                </TableRow>
              ) : (
                panelist?.map((panel: Panelist, index: number) => {
                  const {
                    primary: { main },
                    warning: { main: warningMain },
                  } = palette;
                  const statusBorderColor =
                    panel?.user?.status === UserStatus.Active
                      ? main
                      : warningMain;
                  const {
                    id,
                    user,
                    gender,
                    country,
                    state,
                    scamalyticsScore,
                    fraudScore,
                    panelistReviewStatus,
                    createdAt,
                  } = panel;
                  const { firstName, lastName, emailVerified, email, status } =
                    user || {};

                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" color={"black"}>
                          <Typography variant="body2">
                            {toTitleCase(`${firstName} ${lastName}`)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {toTitleCase(gender?.toLowerCase() ?? "")}
                      </TableCell>
                      <TableCell>{email || "N/A"}</TableCell>
                      <TableCell>{country}</TableCell>
                      <TableCell>{state}</TableCell>
                      <TableCell>
                        <Box
                          maxWidth="500px"
                          display="flex"
                          alignItems="center"
                        >
                          <Box display="flex" gap="10px" alignItems="center">
                            {emailVerified ? <VerifiedIcon /> : <PendingIcon />}
                            <Typography variant="body2">
                              {emailVerified ? "Verified" : "Pending"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          mr={1}
                          fontSize={16}
                          display="flex"
                          alignItems="center"
                          color={colors.green[700]}
                        >
                          <StatusBox
                            variant="body1"
                            borderColor={statusBorderColor}
                          >
                            {toTitleCase(status?.toLowerCase() || "")}
                          </StatusBox>
                        </Box>
                      </TableCell>
                      <TableCell>{scamalyticsScore}</TableCell>
                      <TableCell>{fraudScore}</TableCell>
                      <TableCell>
                        {toTitleCase(panelistReviewStatus?.toLowerCase() || "")}
                      </TableCell>

                      <TableCell>{formatDate(+createdAt)}</TableCell>
                      <TableCell>
                        <div>
                          <IconButton
                            aria-label="more"
                            aria-controls={
                              menuStates[index]?.open ? "long-menu" : undefined
                            }
                            aria-expanded={
                              menuStates[index]?.open ? "true" : undefined
                            }
                            aria-haspopup="true"
                            onClick={(e) => handleMenuOpen({ e, index })}
                          >
                            <MoreVertOutlined />
                          </IconButton>

                          <Menu
                            MenuListProps={{ "aria-labelledby": "long-button" }}
                            anchorEl={menuStates[index]?.anchorEl}
                            open={menuStates[index]?.open}
                            onClose={() => handleMenuClose(index)}
                          >
                            <MenuItem onClick={() => handleMenuClose(index)}>
                              <CustomLink
                                to={`${PANEL_ROUTE}/${id}`}
                                state={PANEL_ROUTE}
                              >
                                <ListItemIcon>
                                  <Visibility
                                    color="primary"
                                    sx={{ paddingTop: "2px" }}
                                  />
                                </ListItemIcon>
                                View Detail
                              </CustomLink>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuClose(index)}>
                              <CustomLink
                                to={`${PANEL_ROUTE}/${id}${PAYMENT_REQUEST}`}
                                state={`${firstName} ${lastName}`}
                              >
                                <ListItemIcon>
                                  <Payment
                                    color="primary"
                                    sx={{ paddingTop: "2px" }}
                                  />
                                </ListItemIcon>
                                View Payment Request
                              </CustomLink>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuClose(index)}>
                              <CustomLink
                                to={`${PANEL_ROUTE}/${id}/survey-history`}
                                state={`${firstName} ${lastName}`}
                              >
                                <ListItemIcon>
                                  <Summarize
                                    color="primary"
                                    sx={{ paddingTop: "2px" }}
                                  />
                                </ListItemIcon>
                                Survey History
                              </CustomLink>
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuClose(index)}>
                              <CustomLink
                                to={`${PANEL_ROUTE}/${id}/point-history`}
                              >
                                <ListItemIcon>
                                  <Scoreboard
                                    color="primary"
                                    sx={{ paddingTop: "2px" }}
                                  />
                                </ListItemIcon>
                                Point History
                              </CustomLink>
                            </MenuItem>
                            <MenuItem
                              sx={{ minHeight: "40px !important" }}
                              onClick={() => {
                                verifyHandler(email as string);
                                handleMenuClose(index);
                              }}
                              disabled={
                                emailVerified || resendVerificationEmailLoading
                              }
                            >
                              <ListItemIcon>
                                <HowToRegOutlined color="primary" />
                              </ListItemIcon>
                              <Typography color={"#000"} fontSize={15} pt={0.5}>
                                Send Verification Email
                              </Typography>
                            </MenuItem>

                            <MenuItem
                              sx={{ minHeight: "40px !important" }}
                              onClick={() => {
                                onDeleteClick(id);
                                handleMenuClose(index);
                              }}
                            >
                              <ListItemIcon>
                                <DeleteForever color="primary" />
                              </ListItemIcon>
                              <Typography color={"#000"} fontSize={15} pt={0.5}>
                                Remove
                              </Typography>
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ProjectTableStyle>
      {!isLoading && !panelist?.length && (
        <Box display="flex" justifyContent="center" pb={12} pt={5}>
          <NoDataFoundComponent />
        </Box>
      )}
      <ConfirmationModal
        title="Delete Panel?"
        isOpen={!!openDeleteModal}
        isLoading={removePanelistLoading}
        description="Are you sure you want to delete this Panelist?"
        handleDelete={handleDeletePanelist}
        setOpen={setOpenDeleteModal}
      />
    </Box>
  );
};

export default PanelTable;
