import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { RegisterLoginHeaderProps } from 'src/models/profile';

import styles from '/src/components/SignInSignUpModal/RegisterLoginHeader/RegisterLoginHeader.module.css';

function RegisterLoginHeader({ checked, onChange, onClick }: RegisterLoginHeaderProps): JSX.Element {
  return (
    <Box className={styles.registerLoginHeader__Wrapper}>
      <Typography
        id="modal-modal-title"
        variant="h2"
        component="h2"
        sx={{ fontFamily: 'Zilla Slab', color: '#30336BBF' }}
      >
        Welcome!
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography>Log in</Typography>
        <Switch checked={checked} onChange={onChange} inputProps={{ 'aria-label': 'Login Register Switch' }} />
        <Typography>Register</Typography>
      </Stack>
    </Box>
  );
}

export default RegisterLoginHeader;
