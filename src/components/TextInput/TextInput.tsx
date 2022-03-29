/* eslint-disable react/jsx-props-no-spreading */
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

import styles from './TextInput.module.css';

interface Error {
  message: string;
}

interface Props {
  placeholder: string;
  register: UseFormRegister<Record<string, unknown>>;
  // eslint-disable-next-line react/require-default-props
  error?: Error;
  password: string;
  disabled: boolean;
  defaultValue: string;
  readOnly: boolean;
}

function TextInput({ placeholder, register, error, password, disabled, defaultValue, readOnly }: Props) {
  return (
    <div className={styles.container}>
      <InputBase
        placeholder={placeholder}
        className={!error?.message ? styles.textInput : styles.textInputError}
        error={!!error?.message}
        type={password ? 'password' : 'text'}
        disabled={disabled}
        defaultValue={defaultValue}
        readOnly={readOnly}
        {...register}
      />
      {!!error?.message && (
        <Typography variant="caption" sx={{ color: 'red' }}>
          {error?.message}
        </Typography>
      )}
    </div>
  );
}

export default TextInput;
