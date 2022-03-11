import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import styles from './ChangeView.module.scss';

const ChangerButton = styled(Button)(({ theme }) => ({
  flexDirection: 'column',
  width: '83px',
  height: '56px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '0px',
  borderRight: 'none',
  '&:hover': {
    backgroundColor: 'none !important',
  },
  '&:focus': {
    backgroundColor: 'none',
  },
}));

function ChangeView({ toggleView, setToggleView }) {
  return (
    <Box component="div" className={styles.buttonContainer}>
      <ButtonGroup variant="contained">
        <ChangerButton
          onClick={() => {
            if (!toggleView) {
              setToggleView(true);
            }
          }}
        >
          <MapIcon />
          <p>Map</p>
        </ChangerButton>
        <ChangerButton
          onClick={() => {
            if (toggleView) {
              setToggleView(false);
            }
          }}
        >
          <SearchIcon />
          <p>Search</p>
        </ChangerButton>
      </ButtonGroup>
    </Box>
  );
}

export default ChangeView;
