import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import mapError from '../../utils/services/mapError';
import ActionAlert from '../ActionAlert/ActionAlert';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import RegisterLoginHeader from '../RegisterLoginHeader/RegisterLoginHeader';
import styles from './RegisterLoginModal.module.css';

const SignInButton = styled(Button)((theme) => ({
  color: theme.palette.primary.muted,
  lineHeight: '16px',
  border: `2px solid ${theme.palette.primary.muted}`,
  letterSpacing: 1.25,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: theme.palette.primary.muted,
  },
}));

function RegisterLoginModal(): any {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [state, setState] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setState('');
    setOpen(false);
  };

  const changeState = (stateToChange: string): void => {
    setState(mapError(stateToChange));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState('');
    setChecked(event.target.checked);
  };
  return (
    <>
      <SignInButton
        onClick={handleOpen}
        sx={{
          marginRight: { xs: '0.8rem', md: '3rem', lg: '3.75rem' },
          width: { xs: '80px', md: '105px', lg: '130px' },
          height: { xs: '35px', md: '45px', lg: '55px' },
          fontSize: { xs: '14px', md: '17px', lg: '20px' },
          padding: { xs: '0px', md: '5px 7px', lg: '10px 14px' },
        }}
      >
        Sign in
      </SignInButton>
      <Modal
        className={styles.registerLoginModal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box
          className={styles.registerLoginModal__wrapper}
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <IconButton aria-label="Close" className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <RegisterLoginHeader checked={checked} onChange={handleChange} onClick={handleClose} />
          {checked ? (
            <RegisterForm manageRequestMessage={changeState} />
          ) : (
            <LoginForm manageRequestMessage={() => changeState} />
          )}
          {state === 'Success' ? (
            <ActionAlert severity="success" onCloseAlertInfo={setState} children={state} />
          ) : state ? (
            <ActionAlert severity="error" onCloseAlertInfo={setState} children={state} />
          ) : null}
        </Box>
      </Modal>
    </>
  );
}

export default RegisterLoginModal;
