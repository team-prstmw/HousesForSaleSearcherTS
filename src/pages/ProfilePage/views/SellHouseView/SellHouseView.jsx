import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';

import AddHouseForm from '@/components/AddHouseForm/AddHouseForm';

import styles from './SellHouseView.module.css';

const SellHouseView = () => {
  const theme = useTheme();
  return (
    <Container component={Paper} maxWidth={false} className={styles.shpContainer}>
      <div className={styles.shpContent}>
        <span className={styles.shpHeader}>
          <Typography
            variant="h3"
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '2.2rem',
              },
            }}
            mb={2}
          >
            Sell House Form
          </Typography>
        </span>
        <AddHouseForm />
      </div>
    </Container>
  );
};

export default SellHouseView;
