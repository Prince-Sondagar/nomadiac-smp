import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoDataFoundComponent from '../../../components/common/NoDataFoundComponent';
import ViewDataLoader from '../../../components/common/ViewDataLoader';
import PanelUserInfo from "./PanelUserInfo";
import PanelistInfo from "./PanelistInfo";
import PanelistDocumentDetails from './PanelistDocumentDetails';
import PanelistSurveyResult from './PanelistSurveyResult';
import PanelSubmissionTable from "./PanelSubmissionTable";
import PanelistPointHistory from './PanelistPointHistory';
import { Panelist, User, UserRole, useFetchPanelistQuery } from '../../../generated';
import { ParamsType } from '../../../interfaceTypes';
import { GRAPHQL_QUERY_POLICY } from '../../../constants';

const PanelDetails = () => {
  const { id } = useParams<ParamsType>();
  const [panelist, setPanelist] = useState<Panelist | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { roles = [] } = user || {}
  const isMedPanel = roles?.find((roleItem) => {
    const { role } = roleItem || {}
    return role === UserRole.MedPanel
  })

  const { loading: isLoading, refetch } = useFetchPanelistQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: {
      fetchPanelistInput: {
        id: id as string
      }
    },

    onError() { },
    onCompleted(data) {
      const { fetchPanelist } = data;
      const { panelist } = fetchPanelist || {};
      panelist && setPanelist(panelist as Panelist);
      panelist && setUser(panelist?.user as User);
    },
  });

  return (
    <>
      {panelist && !isLoading && id &&
        <>
          <PanelUserInfo user={user} panelist={panelist} refreshData={refetch} />
          <PanelistInfo panelist={panelist} refreshData={refetch} loading={isLoading} />
          {isMedPanel && (
            <PanelistDocumentDetails panelist={panelist} refreshData={refetch} loading={isLoading} />
          )}

          <PanelistPointHistory />
          <PanelistSurveyResult />
          <PanelSubmissionTable panelist={panelist} />
        </>
      }
      {isLoading && <ViewDataLoader rows={2} columns={4} hasMedia={false} />}

      {id && !isLoading && !panelist && <NoDataFoundComponent />}

    </>
  )
}

export default PanelDetails;