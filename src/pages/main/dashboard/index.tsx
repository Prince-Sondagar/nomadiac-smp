import { FC, useState } from 'react';
import { Card as MuiCard, Box, Grid, Skeleton } from '@mui/material';
import { useFetchCpiStatsQuery, FetchCpiStatsQuery, useFetchDashboardDataQuery, FetchDashboardDataQuery } from '../../../generated';
import { GRAPHQL_QUERY_POLICY } from '../../../constants/index';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import { formatDate } from '../../../utils';
import Card from '../../../components/card';

const fetchOptionForCountByCountryGraph = (data: FetchDashboardDataQuery['fetchDashboardData']) => {
  const CountByCountryGraphDataCount = data.panelistsCountByCountryGraphData
    ? data.panelistsCountByCountryGraphData.map((item: any) => parseInt(item.count))
    : [];
  const CountByCountryGraphDataCounry = data.panelistsCountByCountryGraphData
    ? data.panelistsCountByCountryGraphData.map((item: any) => item.country ?? 'N/A')
    : [];

  const CountByCountryGraphDataOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Panelists Count by Country',
    },
    xAxis: {
      categories: CountByCountryGraphDataCounry,
      title: {
        text: 'Country',
      },
    },
    yAxis: {
      title: {
        text: 'Count',
      },
      allowDecimals: false,
    },
    series: [
      {
        name: 'Count',
        data: CountByCountryGraphDataCount,
      },
    ],
  }

  return CountByCountryGraphDataOptions;
};

const fetchOptionForPanelistsCountByDay = (data: FetchDashboardDataQuery['fetchDashboardData']) => {
  const CountByDayGraphDataDay = data.panelistsCountByDayGraphData ? data.panelistsCountByDayGraphData.map((item: any) => formatDate(item.day)) : [];

  const CountByDayGraphCount = data.panelistsCountByDayGraphData ? data.panelistsCountByDayGraphData.map((item: any) => parseInt(item.count)) : [];

  return {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Panelists Count by Day',
    },
    xAxis: {
      categories: CountByDayGraphDataDay,
      title: {
        text: 'Day',
      },
    },
    yAxis: {
      title: {
        text: 'Count',
      },
      allowDecimals: false,
    },
    series: [
      {
        name: 'Count',
        data: CountByDayGraphCount,
      },
    ],
  }
};

const Dashboard: FC = (): JSX.Element => {
  const [cardData, setCardData] = useState<FetchCpiStatsQuery | any>({ revenue: 0, netProfit: 0 });
  const [graphData, setGraphData] = useState<FetchDashboardDataQuery['fetchDashboardData']>({ panelistsCountByDayGraphData: [], panelistsCountByCountryGraphData: [], activePanelists: 0 });
  const { revenue = 0, netProfit = 0 } = cardData || {}
  const { activePanelists } = graphData || {};

  const { loading: activePanelistsLoading } = useFetchDashboardDataQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(dashboardData) {
      const list = dashboardData.fetchDashboardData;
      setGraphData({
        activePanelists: list.activePanelists,
        panelistsCountByCountryGraphData: list.panelistsCountByCountryGraphData,
        panelistsCountByDayGraphData: list.panelistsCountByDayGraphData
      });
    }
  });

  const { loading: cpiLoading } = useFetchCpiStatsQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(cpiData) {
      const list = cpiData?.fetchCpiStats;
      setCardData({ revenue: list.revenue || 0, netProfit: list.netProfit || 0 });
    }
  });

  return (
    <Box>
      <Grid container display={"flex"} justifyContent={"center"} spacing={2}>
        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Card title={"Active Panelist"} stats={String(activePanelists || 0)} loading={activePanelistsLoading} />
        </Grid>

        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Card title={"Revenue"} stats={`${revenue || 0}$`} loading={cpiLoading} />
        </Grid>

        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Card title={"Net Profit"} stats={`${netProfit || 0}$`} loading={cpiLoading} />
        </Grid>
      </Grid>

      <Grid container justifyContent={"space-around"} xs={12} mt={3}>
        <Grid xs={11} sm={10} md={5} item justifyContent="center" mt={3}>
          <MuiCard sx={{ boxShadow: 2, p: 3 }}>
            {activePanelistsLoading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> :
              <HighchartsReact highcharts={Highcharts} options={fetchOptionForCountByCountryGraph(graphData)} />}
          </MuiCard>
        </Grid>

        <Grid xs={11} sm={10} md={5} item justifyContent="center" mt={3}>
          <MuiCard sx={{ boxShadow: 2, p: 3 }}>
            {activePanelistsLoading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
              : <HighchartsReact highcharts={Highcharts} options={fetchOptionForPanelistsCountByDay(graphData)} />}
          </MuiCard>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard;