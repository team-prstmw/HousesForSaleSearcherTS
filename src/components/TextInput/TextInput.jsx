/* eslint-disable react/jsx-props-no-spreading */
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';

import styles from './TextInput.module.css';

const TextInput = ({ placeholder, register, error, password, disabled, defaultValue, readOnly }) => {
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
};

export default TextInput;
