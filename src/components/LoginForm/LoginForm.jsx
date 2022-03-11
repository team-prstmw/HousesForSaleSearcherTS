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

import styles from '/src/components/LoginForm/LoginForm.module.css';
import LoginContext from '/src/contexts/LoginContext';
import { loginSchema } from '/src/schemas/authSchemas';
import { RESET_PASSWORD, SIGN_IN_URL } from '/src/URLs';
import { resetPassword, signInSignUp } from '/src/utils/auth';

function LoginForm({ changeStateFn }) {
  const login = useContext(LoginContext);

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
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
    signInSignUp(email, password, SIGN_IN_URL, changeStateFn, login.loggedIn, login.login, login.logout);
  };

  const onReset = () => {
    resetPassword(getValues('email'), RESET_PASSWORD, changeStateFn);
  };
  return (
    <>
      <Box className={styles.form} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={4} className={styles.stack__wrapper}>
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
            LOG IN
          </Button>
        </Stack>
      </Box>
      <Button className={styles.resetPasswordButton} sx={{ fontSize: 12, mt: 1 }} variant="text" onClick={onReset}>
        Reset password
      </Button>
    </>
  );
}

LoginForm.propTypes = {
  changeStateFn: PropTypes.func.isRequired,
};

export default LoginForm;
