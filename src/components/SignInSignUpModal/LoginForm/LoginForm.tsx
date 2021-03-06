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
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginContext from 'src/contexts/LoginContext';
import { RegisterLoginFormsProps } from 'src/models/profile';
import { loginSchema } from 'src/schemas/authSchemas';
import { RESET_PASSWORD } from 'src/URLs';

import styles from '/src/components/SignInSignUpModal/LoginForm/LoginForm.module.css';
import { signIn } from '@/api/auth/signIn';

import { resetPassword } from '../../../api/auth';
import LoginFormFields, { OnSubmitProps } from '../../../schemas/loginRegisterFormSchemas';

function LoginForm({ manageRequestMessage }: RegisterLoginFormsProps) {
  const login = useContext(LoginContext);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormFields> = ({ email, password }: OnSubmitProps) => {
    signIn({ email, password }, manageRequestMessage, login.login);
    // signInSignUp(email, password, SIGN_IN_URL, manageRequestMessage, login.loggedIn, login.login, login.logout);
  };

  const onReset = () => {
    resetPassword(getValues('email'), RESET_PASSWORD, manageRequestMessage);
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

export default LoginForm;
