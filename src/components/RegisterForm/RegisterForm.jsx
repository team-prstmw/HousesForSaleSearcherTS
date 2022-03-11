import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '/src/components/RegisterForm/RegisterForm.module.css';
import LoginContext from '/src/contexts/LoginContext';
import { registerSchema } from '/src/schemas/authSchemas';
import { SIGN_UP_URL } from '/src/URLs';
import { signInSignUp } from '/src/utils/auth';

function RegisterForm({ changeStateFn }) {
  const login = useContext(LoginContext);
  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = ({ email, password }) => {
    signInSignUp(email, password, SIGN_UP_URL, changeStateFn, login.loggedIn, login.login, login.logout);
  };

  return (
    <Box className={styles.registerForm__wrapper} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4} className={styles.stack__wrapper}>
        <TextField
          id="outlined-textarea-name"
          error={!!errors?.name}
          helperText={errors?.name && errors?.name.message}
          label="Name"
          placeholder="Name"
          autoComplete="Name"
          required
          className={styles.textField}
          {...register('name')}
        />

        <TextField
          id="outlined-textarea-email"
          error={!!errors?.email}
          helperText={errors?.email && errors?.email.message}
          label="E-mail"
          placeholder="E-mail"
          required
          type="email"
          autoComplete="email"
          className={styles.textField}
          {...register('email')}
        />

        <FormControl variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password" error={!!errors?.password}>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            placeholder="Password"
            error={!!errors?.password}
            className={styles.textField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...register('password')}
          />
          {errors?.password ? (
            <FormHelperText error>{errors?.password && errors?.password.message}</FormHelperText>
          ) : (
            <FormHelperText id="component-helper-text">At least 6 characters</FormHelperText>
          )}
        </FormControl>
        <Button color="primary" type="submit" variant="contained" className={styles.registerButton}>
          REGISTER
        </Button>
      </Stack>
    </Box>
  );
}

RegisterForm.propTypes = {
  changeStateFn: PropTypes.func.isRequired,
};

export default RegisterForm;
