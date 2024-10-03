import { useState, useEffect } from 'react';
import { Box, Grid, Tab, TextField, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProjectInformation from './projectInformation';
import LandingPage from './LandingPage';
import ProjectTeam from './ProjectTeam';
import Client from './Client';
import { Project, ProjectUser, User, useUpdateProjectMutation } from '../../../../generated';
import { updateProjectHandler } from '../../../../utils/project';
import QuotaPage from './QuotaPage';

const tabListData = [
  { value: "project-information", label: "Project Information" },
  { value: "landing-pages", label: "Landing Pages" },
  { value: "quota", label: "Quota" },
  { value: "project-team", label: "Project Team" },
  { value: "client", label: "Client" },
];

type ITableCollapse = {
  panelist: Array<User>;
  projectUsers: Array<ProjectUser>;
  project: Project;
  refreshList: Function;
  refreshPanelList: Function;
}

const TableCollapse = ({ panelist, projectUsers, project, refreshPanelList, refreshList }: ITableCollapse) => {
  const [value, setValue] = useState('project-information');
  const [selectEditSupplier, setselectEditSupplier] = useState<any>({});
  const [updateProject, { loading: projectUpdateLoading }] = useUpdateProjectMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const parsing = () => {
    const data = JSON.parse(selectEditSupplier.additionalFields);
    setselectEditSupplier(data);
  };

  useEffect(() => {
    if (selectEditSupplier.id) {
      parsing();
    }
    // eslint-disable-next-line
  }, [selectEditSupplier]);

  const onProjectUpdate = async (name: string, value: string) => {
    if (name === 'dataQuality') {
      await updateProject({ variables: updateProjectHandler({ ...project, dataQuality: value === 'true' ? true : false }) });
    };

    if (value?.length && name !== 'dataQuality') {
      await updateProject({ variables: updateProjectHandler({ ...project, [name]: value }) });
    }

    await refreshList();
  }

  const ontitleUpdate = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    onProjectUpdate(name, value);
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box bgcolor={"#f2f2f2"} p={3} border={"1px solid #ddd"}>
          <Grid container mb={3}>
            <Grid item xs={4}>
              <Typography variant='h5' mb={0.5}>Project Name:</Typography>
              <TextField fullWidth variant="outlined" name='title' defaultValue={project.title} onBlur={ontitleUpdate} placeholder="test project for client" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h5' mb={0.5} mx={3}>Project Email:</Typography>
              <Typography mx={3}>{project.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h5' mb={0.5}>Project Code:</Typography>
              <Typography>{project.code}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {tabListData.map((tab, index) => <Tab key={index} label={tab.label} value={tab.value} />)}
                </TabList>
              </Box>
              <TabPanel value="project-information"><ProjectInformation onProjectUpdate={onProjectUpdate} project={project} /></TabPanel>
              <TabPanel value="landing-pages"><LandingPage projectId={project.id} /></TabPanel>
              <TabPanel value="quota"><QuotaPage projectId={project.id} refreshList={refreshList} project={project} /></TabPanel>
              <TabPanel value="project-team"><ProjectTeam project={project} onProjectUpdate={onProjectUpdate} /></TabPanel>
              <TabPanel value="client"><Client project={project} onProjectUpdate={onProjectUpdate} projectUpdateLoading={projectUpdateLoading} /></TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default TableCollapse;