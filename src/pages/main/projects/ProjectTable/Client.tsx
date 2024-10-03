import { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, FormControl, Grid, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { GRAPHQL_QUERY_POLICY } from "../../../../constants";
import { Company, Project, useFetchAllCompaniesQuery } from "../../../../generated";
import { useSnackbar } from "notistack";

type IClient = {
  project: Project;
  onProjectUpdate: (name: string, value: string) => Promise<void>;
  projectUpdateLoading: boolean;
}

const Client = ({ project, onProjectUpdate, projectUpdateLoading }: IClient) => {
  const [clientList, setClientList] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const { data: fetchAllCompanies, loading: fetchCompanyLoading } = useFetchAllCompaniesQuery({
    ...GRAPHQL_QUERY_POLICY, variables: {
      "companiesInput": {
        "paginationOptions": { "limit": 100, "page": 1 }
      }
    }
  });

  useEffect(() => {
    const list = fetchAllCompanies?.fetchAllCompanies?.companies;
    setClientList(list as Array<Company>);
  }, [fetchAllCompanies]);


  const handleChange = async ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    onProjectUpdate(name, value);
    enqueueSnackbar("project updated successfully");
  };

  const loading = fetchCompanyLoading || projectUpdateLoading;
  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box aria-disabled={loading ? true : false} >
        <Grid container mb={4}>
          <Grid item xs={4}>
            <Box mr={1.5}>
              <Typography color={"#000"} mb={0.5}>
                Client Code
              </Typography>
              <TextField fullWidth variant="outlined" name="code" defaultValue={project?.code} onBlur={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box ml={1.5}>
              <Typography color={"#000"} mb={0.5}>
                Client
              </Typography>
              <FormControl fullWidth>
                <Select name="clientId" value={project?.clientId ?? ""} onChange={handleChange}>
                  {clientList?.map((client: Company, index: number) => (
                    <MenuItem key={index} value={client?.id}>
                      {client?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        {/* <Typography variant="h5" mb={2} color={"#000"} fontWeight={"bold"}>
        Client Contacts
        </Typography>
        <Grid container mb={4}>
        <Grid item xs={4}>
        <Box mr={1.5}>
        <Typography color={"#000"} mb={0.5}>
        Lead Client Contact
        </Typography>
        <FormControl fullWidth>
        <Select
        name="clientCompany"
        value={clientContact}
        onChange={handleChange}
        >
        {clientContactList?.map((client, index) => (
          <MenuItem key={index} value={client?.value}>
          {client?.name}
          </MenuItem>
          ))}
          </Select>
          </FormControl>
          </Box>
          </Grid>
        </Grid> */}
        {/* <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link href="">Send Email To Client</Link>
          <Button variant="contained" disabled={loading ? true : false} >Create New Contact</Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Client;
