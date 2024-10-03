import { FC } from 'react';
import { Box, Typography, Skeleton } from "@mui/material";

interface Props {
  title: string;
  stats?: string;
  loading: boolean;
}

const Card: FC<Props> = ({ title, stats, loading }): JSX.Element => {

  return (
    <Box sx={{
      filter: ' drop-shadow(0px - 2px 4px rgba(0, 0, 0, 0.05)) drop - shadow(0px 2px 4px rgba(0, 0, 0, 0.05))',
      borderRadius: 4,
      minHeight: 116,
      display: "flex",
      justifyContent: "center",
      background: "#771117"
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="block">
          <Typography variant='h6' display={"flex"} justifyContent={"left"} color="white">
            {title}
          </Typography>
          <Box pt={1.2} fontSize={"1.5rem"} display={"flex"} justifyContent={"center"} color={"white"}>
            {loading ? <Skeleton variant='text' width={100} /> : stats}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Card;