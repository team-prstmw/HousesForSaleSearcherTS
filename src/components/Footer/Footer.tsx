import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link } from '@mui/material';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <Box component="div" className={styles.footerContainer}>
      <Link className={styles.footerText} href="https://github.com/team-prstmw" underline="none" display="inherit">
        You can follow us on Github:
        <GitHubIcon className={styles.footerImage} />
      </Link>
    </Box>
  );
}

export default Footer;
