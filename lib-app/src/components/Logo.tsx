import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }: any) {
  const navigate = useNavigate();
  return <Box component="img" src="/assets/logo.png" onClick={() => navigate('/')} sx={{ width: 50, height: 50, ...sx }} style={{zIndex: 999}} />;
}
