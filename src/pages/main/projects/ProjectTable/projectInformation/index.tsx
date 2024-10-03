import { useState } from 'react';
import { Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import GeneralInfo from './GeneralInfo';
import { Project } from '../../../../../generated';

type IProjectInformation = {
  onProjectUpdate: (name: string, value: string) => Promise<void>;
  project: Project;
}

const ProjectInformation = ({ onProjectUpdate, project }: IProjectInformation) => {
  const [TabInfo] = useState('general-project-information');

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} className="projectInfoTab">
      <TabContext value={TabInfo}>
        <GeneralInfo onProjectUpdate={onProjectUpdate} project={project} />
      </TabContext>
    </Box>
  )
}

export default ProjectInformation;