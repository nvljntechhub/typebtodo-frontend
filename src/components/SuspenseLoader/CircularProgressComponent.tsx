import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress } from '@mui/material';

function CircularProgressComponent(props: { size: number, thickness: number }) {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box>
      <CircularProgress
        size={props.size}
        disableShrink
        thickness={props.thickness}
      />
    </Box>
  );
}

export default CircularProgressComponent;
