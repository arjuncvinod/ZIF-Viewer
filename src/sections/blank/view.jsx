import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import OpenSeadragonViewer from 'src/components/ZIF-Viewer/OpenSeadragonViewer';
// ----------------------------------------------------------------------

export function BlankView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 5,
          width: 1,
          height: "80vh",
          overflow: 'hidden',
          borderRadius: 2,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}>
       <OpenSeadragonViewer />                                                                       
      </Box>
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* <Typography variant="h4"> {title} </Typography> */}
      {renderContent()}
    </DashboardContent>
  );
}
