import { Box, SelectChangeEvent, Tab } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Others from "../user/Other/index";
import Client from "./Client";
import {
  Maybe,
  PaginationInput,
  PaginationPayload,
  Role,
  useFetchAllUsersQuery,
  User,
  UserRole,
  UserStatus,
  useSearchUserLazyQuery,
} from "../../../generated";
import {
  GRAPHQL_QUERY_POLICY,
  ROLE_EVENT,
  STATUS_EVENT,
} from "../../../constants";
import SupplierPanel from "./Supplier";

const tabListData = [
  { value: "client", label: "Clients" },
  { value: "supplier", label: "Suppliers" },
  { value: "others", label: "Users" },
];

const Users = () => {
  const [value, setValue] = useState<string>("client");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [paginationState, setPaginationState] = useState<PaginationInput>({
    limit: 10,
    page: 1,
  });
  const [pagination, setPagination] = useState<PaginationPayload>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setRole("");
    setSearchQuery("");
    setUsers([]);
    setStatus("");
    setPaginationState({ ...paginationState, page: 1 });
    setPagination({});
  };

  const { loading: fetchAllUsersLoading, refetch } = useFetchAllUsersQuery({
    ...GRAPHQL_QUERY_POLICY,

    variables: {
      usersInput: {
        status: status ? (status as Maybe<UserStatus>) : undefined,
        roles: role
          ? ([role] as Maybe<UserRole[]>)
          : [UserRole.Admin, UserRole.SuperAdmin, UserRole.Manager],
        paginationOptions: {
          page: paginationState?.page,
          limit: paginationState?.limit,
        },
      },
    },

    onError() {
      setUsers([]);
    },

    onCompleted(data) {
      const { fetchAllUsers } = data || {};

      if (fetchAllUsers) {
        const { users, pagination } = fetchAllUsers;

        if (!searchQuery) {
          if (pagination) {
            setPagination(pagination);
          }
          const others = users?.filter((user) =>
            user?.roles?.find(
              (item: Maybe<Role>) => item?.role !== UserRole.Client
            )
          );
          setUsers(others as Array<User>);
        }
      }
    },
  });

  const [searchUser, { loading: searchLoading }] = useSearchUserLazyQuery({
    ...GRAPHQL_QUERY_POLICY,

    variables: undefined,

    onError() {
      setUsers([]);
    },
    onCompleted(data) {
      const {
        searchUser: { response, users },
      } = data;
      if (response) {
        const { status } = response;

        if (status && status === 200 && users) {
          if (pagination) {
            setPagination(pagination);
          }
          setUsers(users as Array<User>);
        }
      }
    },
  });

  const handleReset = () => {
    setSearchQuery("");
    handleResetSelect();
    refetch();
  };

  const handleResetSelect = () => {
    setRole("");
    setStatus("");
  };

  const handleUserSearch = () => {
    searchUser({
      variables: {
        searchUserInput: {
          searchTerm: searchQuery.trim(),
        },
      },
    });
    handleResetSelect();
  };

  const handleSelectorChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value, name },
    } = event;
    if (name === ROLE_EVENT) {
      setRole(value);
    }
    if (name === STATUS_EVENT) {
      setStatus(value);
    }
    setSearchQuery("");
    setPaginationState({ ...paginationState, page: 1 });
  };

  const isLoading = fetchAllUsersLoading || searchLoading;

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange}>
            {tabListData.map((tab, index) => (
              <Tab
                key={index}
                sx={{ textTransform: "capitalize" }}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel value="client" sx={{ px: 0 }}>
          <Client />
        </TabPanel>
        <TabPanel value="supplier" sx={{ px: 0 }}>
          <SupplierPanel />
        </TabPanel>
        <TabPanel value="others" sx={{ px: 0 }}>
          <Others
            users={users}
            refetch={refetch}
            isLoading={isLoading}
            handleUserSearch={handleUserSearch}
            handleReset={handleReset}
            handleSelectorChange={handleSelectorChange}
            open={open}
            setOpen={setOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            role={role}
            status={status}
            pagination={pagination}
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Users;
