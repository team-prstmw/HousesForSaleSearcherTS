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
import { LoginProps, RegisterLoginFormsProps } from 'src/models/profile';
import { registerSchema } from 'src/schemas/authSchemas';

import styles from '/src/components/SignInSignUpModal/RegisterForm/RegisterForm.module.css';

import { signUp } from '../../../api/auth/signUp';
import { RegisterFormFields } from '../../../schemas/loginRegisterFormSchemas';

interface IFormInput {
  name: string;
  password: string;
  email: string;
  phone: string;
}

function RegisterForm({ manageRequestMessage }: RegisterLoginFormsProps) {
  const login: LoginProps = useContext(LoginContext);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
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

  const onSubmit: SubmitHandler<IFormInput> = ({ name, email, password, phone }: RegisterFormFields) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signUp({ name, email, password, phone }, manageRequestMessage, login.login);
  };

  return (
    <Box className={styles.registerForm__wrapper} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4} className={styles.stack__wrapper}>
        <TextField
          id="outlined-textarea-name"
          error={!!errors?.name}
          helperText={!!errors?.name && errors?.name.message}
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
          helperText={!!errors?.email && errors?.email.message}
          label="E-mail"
          placeholder="E-mail"
          required
          type="email"
          autoComplete="email"
          className={styles.textField}
          {...register('email')}
        />
        <TextField
          id="outlined-textarea-phone"
          error={!!errors?.phone}
          helperText={!!errors?.phone && errors?.phone.message}
          label="Phone Number"
          placeholder="Phone Number"
          required
          type="tel"
          autoComplete="Phone Number"
          className={styles.textField}
          {...register('phone')}
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

export default RegisterForm;
