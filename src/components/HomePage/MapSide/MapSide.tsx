/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/extensions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, styled, TextField, Typography } from '@mui/material';

import GoogleMapComp from '/src/components/Map/GoogleMapComp';

import styles from './MapSide.module.scss';

const ButtonSearch = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.muted,
  lineHeight: '16px',
  height: '54px',
  letterSpacing: '1.25px',
  borderColor: '#0000001F',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.bgDark,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.bgDark,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line react/prop-types
function MapHouses({ houses }): any {
  return (
    <Box component="div" className={styles.mapContainer}>
      <Box component="form">
        <TextField
          label="Location"
          className={styles.location}
          InputProps={{
            endAdornment: <LocationOnIcon className={styles.icoLocat} />,
          }}
        />
        <ButtonSearch
          sx={{
            width: { xs: '100%', sm: '250px', md: '100%', lg: '250px', xl: '362px' },
            fontSize: { xs: '14px', md: '16px', lg: '18px' },
            marginBottom: { xs: '10px' },
          }}
          variant="outlined"
          onClick={() => {}}
        >
          <Typography className={styles.searchBy}>SEARCH BY</Typography>
        </ButtonSearch>
      </Box>
      <GoogleMapComp className="googleMapComp" houses={houses} />
    </Box>
  );
}

export default MapHouses;
