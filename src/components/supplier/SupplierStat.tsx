import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Maybe, QuotaGroup, SubmissionStats } from '../../generated';
import { ProjectTableStyle } from '../../theme/styleComponents';
import TableLoader from '../common/TableLoader';


type ISupplierStat = {
	stats: Array<SubmissionStats>;
	loading: boolean;
	quotaGroupList: Maybe<Maybe<QuotaGroup>[]>;
}

const countStatListFunc = (statList: Array<SubmissionStats>) => statList?.reduce((newObj: any, stat: SubmissionStats) => {
	return {
		...newObj,
		...stat.initializedResponses ? { initializedResponses: (newObj.initializedResponses ?? 0) + +stat.initializedResponses } : {},
		...stat.completedResponses ? { completedResponses: (newObj.completedResponses ?? 0) + +stat.completedResponses } : {},
		...stat.terminatedResponses ? { terminatedResponses: (newObj.terminatedResponses ?? 0) + +stat.terminatedResponses } : {},
		...stat.quotaResponses ? { quotaResponses: (newObj.quotaResponses ?? 0) + +stat.quotaResponses } : {},
		...stat.securityTerminateResponses ? { securityTerminateResponses: (newObj.securityTerminateResponses ?? 0) + +stat.securityTerminateResponses } : {},
		...stat.completeCap ? { completeCap: (newObj.completeCap ?? 0) + +stat.completeCap } : {},
		...stat.supplierCompleteCapLeft ? { supplierCompleteCapLeft: (newObj.supplierCompleteCapLeft ?? 0) + +stat.supplierCompleteCapLeft } : {},
	}
}, {}) ?? {};

const SupplierStat = ({ stats, loading, quotaGroupList }: ISupplierStat) => {
	const countStatList = countStatListFunc(stats);
	return (
		<ProjectTableStyle>
			<TableContainer component={Paper} sx={{ mt: 3 }}>
				<Typography p={3} fontWeight={"bold"} fontSize={18}>{`Supplier : ${stats?.length}`}</Typography>
				{!stats?.length ?
					<Typography fontSize={"18px"} pb={3} px={3}>There is no data available</Typography> :
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead sx={{ backgroundColor: "#edced0" }}>
							<TableRow>
								<TableCell align='center'>Quota</TableCell>
								<TableCell align='center'>Company Name</TableCell>
								<TableCell align='center'>Initialized</TableCell>
								<TableCell align='center'>Complete</TableCell>
								<TableCell align='center'>Terminate</TableCell>
								<TableCell align='center'>Quota</TableCell>
								<TableCell align='center'>Security</TableCell>
								<TableCell align='center'>Complete Cap</TableCell>
								<TableCell align='center'>Complete Left Cap</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={10}>
										<TableLoader numberOfRows={10} numberOfColumns={1} />
									</TableCell>
								</TableRow>
							) :
								(quotaGroupList?.map((quotaGroup) => {
									const statList = stats?.filter((item) => item?.quotaGroupId === quotaGroup?.id);
									const countStatList: SubmissionStats = countStatListFunc(statList);

									return (
										<React.Fragment key={quotaGroup?.id}>
											<TableRow>
												<TableCell component="th" scope='row' align='center' rowSpan={statList?.length + 2} >{quotaGroup?.name}</TableCell>
											</TableRow>
											{statList?.map((stat, index) => {
												console.log("stat?.companyName", stat?.companyName);

												return (
													<TableRow key={index}>
														<TableCell align='center'>{stat?.companyName}</TableCell>
														<TableCell align='center'>{stat?.initializedResponses}</TableCell>
														<TableCell align='center'>{stat?.completedResponses}</TableCell>
														<TableCell align='center'>{stat?.terminatedResponses}</TableCell>
														<TableCell align='center'>{stat?.quotaResponses}</TableCell>
														<TableCell align='center'>{stat?.securityTerminateResponses}</TableCell>
														<TableCell align='center'>{stat?.completeCap}</TableCell>
														<TableCell align='center'>{stat?.supplierCompleteCapLeft}</TableCell>
													</TableRow>
												)
											})}
											<TableRow key={statList?.length + 1}>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>Total</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.initializedResponses}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.completedResponses}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.terminatedResponses}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.quotaResponses}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.securityTerminateResponses}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.completeCap}</TableCell>
												<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.supplierCompleteCapLeft}</TableCell>
											</TableRow>
										</React.Fragment>
									)
								}))}
							{quotaGroupList?.length ? (
								<TableRow key={quotaGroupList?.length + 1}>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>Total</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}></TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.initializedResponses}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.completedResponses}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.terminatedResponses}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.quotaResponses}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.securityTerminateResponses}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.completeCap}</TableCell>
									<TableCell align='center' sx={{ fontWeight: "bold !important" }}>{countStatList?.supplierCompleteCapLeft}</TableCell>
								</TableRow>
							) : ""}
						</TableBody>
					</Table>
				}
			</TableContainer>
		</ProjectTableStyle >
	)
}

export default SupplierStat;