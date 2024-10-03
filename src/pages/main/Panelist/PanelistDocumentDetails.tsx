import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Panelist, useGetAttachmentLazyQuery } from "../../../generated";
import CardComponent from "../../../components/common/CardComponent";
import { ProjectTableStyle } from "../../../theme/styleComponents";
import VisibilityIcon from "@mui/icons-material/Visibility";

export type IPanelistInfo = {
  panelist?: Panelist;
  loading: boolean;
  refreshData: Function;
};

const PanelistDocumentDetails = ({ panelist, refreshData }: IPanelistInfo) => {
  const { attachments = [] } = panelist || {};
  const [getAttachment, { loading }] = useGetAttachmentLazyQuery({
    onError() {},
    onCompleted(data) {
      const { getAttachment } = data || {};
      const { preSignedUrl } = getAttachment || {};
      if (preSignedUrl) {
        window.open(preSignedUrl, "_blank");
      }
    },
  });

  const viewDocumentHandler = async (id: string) => {
    if (id)
      await getAttachment({
        variables: {
          getMedia: {
            id,
          },
        },
      });
  };

  return (
    <CardComponent cardTitle="Document Details">
      <ProjectTableStyle>
        <TableContainer component={Paper} className="paneListInfoTable">
          <Box>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "#edced0" }}>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attachments.map((document, index) => {
                  const { key } = document || {};
                  return (
                    <TableRow key={key}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <IconButton
                            disabled={loading}
                            onClick={() => viewDocumentHandler(key || "")}
                          >
                            <Tooltip title="View" placement="bottom">
                              {loading ? (
                                <CircularProgress size={15} />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </Tooltip>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </ProjectTableStyle>
    </CardComponent>
  );
};

export default PanelistDocumentDetails;
