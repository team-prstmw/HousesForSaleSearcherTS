/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { FieldError } from 'react-hook-form';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

import styles from './TextInput.module.css';

interface Props {
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  password?: boolean;
  disabled?: boolean;
  defaultValue?: string | null;
  readOnly?: boolean;
}

function TextInput({ placeholder, register, error, password, disabled, defaultValue, readOnly }: Props) {
  return (
    <div className={styles.container}>
      <InputBase
        placeholder={placeholder}
        className={!error?.message ? styles.textInput : styles.textInputError}
        type={password ? 'password' : 'text'}
        disabled={!!disabled}
        defaultValue={defaultValue}
        readOnly={readOnly}
        error={!!error?.message}
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
