import { useEffect, useState } from "react";
import { Box, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography, } from "@mui/material";
import { Project, ProjectLifecycle, ProjectSecurity } from "../../../../../generated";

const methodologyList = [
  { value: "ONLINE", name: "Online" },
  { value: "CATI", name: "CATI" },
  { value: "FACETOFACE", name: "Face-to-Face" },
];

type IGeneralInfo = {
  onProjectUpdate: (name: string, value: string) => void;
  project: Project;
}

const GeneralInfo = ({ onProjectUpdate, project }: IGeneralInfo) => {
  const [projectChecked, setProjectchecked] = useState(true);
  const [projectSecurityChecked, setProjectSecurityChecked] = useState(true);
  const [dataQuality, setDataQuality] = useState<boolean>(false);
  const { dataQuality: projectDataQuality } = project || {}

  useEffect(() => {
    if (project.lifecycle === ProjectLifecycle.Open) {
      setProjectchecked(true);
    } else setProjectchecked(false);
  }, [project]);

  useEffect(() => {
    if (project.security === ProjectSecurity.Low) {
      setProjectSecurityChecked(false);
    } else setProjectSecurityChecked(true);
  }, [project]);

  useEffect(() => {
    if (projectDataQuality) {
      setDataQuality(true)
    }
  }, [projectDataQuality]);

  const handleChange = ({ target: { name, value } }: SelectChangeEvent) => {
    onProjectUpdate(name, value);
  };

  // Handle Lifecycle Change 
  const handleLifecycleChange = ({ target: { name, checked } }: { target: { name: string, checked: boolean } }) => {
    const value = checked ? "OPEN" : "CLOSES";
    onProjectUpdate(name, value);
  };

  // Handle Project Security 
  const handleProjectSecurityChange = ({ target: { name, checked } }: { target: { name: string, checked: boolean } }) => {
    const value = !checked ? "LOW" : "HIGH";
    onProjectUpdate(name, value);
  };

  const handleDataQualityChange = () => {
    onProjectUpdate("dataQuality", `${!dataQuality}`);
    setDataQuality(!dataQuality);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <Typography color={"#000"} mb={0.5}>
              Methodology
            </Typography>
            <FormControl fullWidth>
              <Select
                name="methodology"
                value={project?.methodology || ""}
                onChange={handleChange}
              >
                {methodologyList?.map((method: { name: string, value: string }, key: number) => (
                  <MenuItem key={key} value={method.value}>
                    {method.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item mt={3}>
          <Typography color={"#000"} mb={0.5}>Project Status</Typography>
          <Box mt={2} mb={4}>
            <Switch
              checked={projectChecked}
              onChange={handleLifecycleChange}
              color="primary"
              name="lifecycle"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {project?.lifecycle === ProjectLifecycle.Closes ? "CLOSED" : project?.lifecycle}
          </Box>
        </Grid>
        <Grid mt={3} item>
          <Typography color={"#000"} mb={0.5}>Project Security</Typography>
          <Box mt={2} mb={4}>
            <Switch
              checked={projectSecurityChecked}
              onChange={handleProjectSecurityChange}
              color="primary"
              name="security"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {project?.security === ProjectSecurity.Low ? "LOW" : project?.security}
          </Box>
        </Grid>

        <Grid item mt={3}>
          <Typography color={"#000"} mb={0.5}>Data Quality Check</Typography>
          <Box mt={2} mb={4}>
            <Switch
              checked={dataQuality}
              onChange={handleDataQualityChange}
              color="primary"
              name="lifecycle"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {dataQuality ? "ON" : "OFF"}
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Typography color={"#000"} mb={0.5}>
          Project Information (Financials / Description / Special Requirements)
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter additional project information"
          name="description"
          defaultValue={project?.description}
          onBlur={({ target: { name, value } }) => onProjectUpdate(name, value)}
          multiline
          rows={2}
          minRows={1}
          sx={{ height: "73px" }}
        />
      </Box>
    </Box>
  );
};

export default GeneralInfo;
