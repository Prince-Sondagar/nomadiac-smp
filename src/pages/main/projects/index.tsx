import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { PROJECT_CREATE_ROUTE, GRAPHQL_QUERY_POLICY } from '../../../constants';
import ProjectTable from './ProjectTable';
import { PaginationInput, PaginationPayload, Project, useFetchAllProjectsLazyQuery } from '../../../generated';

const Projects: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<any>({ searchQuery: "" })
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationInput>({ limit: 5, page: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationPayload>({});

  const [fetchAllProjects, { refetch }] = useFetchAllProjectsLazyQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted({ fetchAllProjects }) {
      if (fetchAllProjects) {
        const list: Array<Project | any> = fetchAllProjects.projects;
        setProjectList(list || []);
        setIsLoading(false);
        const paginationData = fetchAllProjects.pagination;
        if (paginationData) setPagination(paginationData);
        else setPagination({});
      };
    }
  });

  const handleProjectSearch = () => {
    setIsLoading(true);
    fetchAllProjects({
      variables: {
        projectInput: {
          paginationOptions: paginationState,
          ...(searchValue?.searchQuery ? { searchQuery: searchValue?.searchQuery } : {})
        }
      }
    })
  }

  useEffect(() => {
    handleProjectSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationState])


  const handleChangeSearchInput = ({ target, }: {
    target: { name: string; value: any };
  }) => {
    setSearchValue({ ...searchValue, [target.name]: target.value })
  }

  const onSearchProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (searchValue.searchQuery === "") return;
    handleProjectSearch();
  }

  return (
    <>
      <Box component={"form"} onSubmit={onSearchProject} sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          name="searchQuery"
          label="Search"
          placeholder="Search Project"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          disabled={isLoading}
          sx={{ mr: 2, width: "280px", mb: '10px' }}
          value={searchValue.searchQuery}
          onChange={handleChangeSearchInput}
        />
        <Button variant="contained" onClick={() => navigate(PROJECT_CREATE_ROUTE)}>+ New Project</Button>
      </Box>
      <ProjectTable
        projectList={projectList}
        paginationState={paginationState}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        setPaginationState={setPaginationState}
        refetch={refetch} />
    </>
  )
}

export default Projects;