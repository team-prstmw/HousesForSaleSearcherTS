/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

import styles from './FormRow.module.css';

interface Props {
  label: string | React.ReactElement;
  input: string | number | JSX.Element;
  action?: React.ReactElement;
  register?: UseFormRegister<Record<string, unknown>>;
}

function FormRow({ label, input, action, register }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.rowLabel}>{label}</div>
      <span className={styles.rowInputContainer}>
        <div className={styles.rowInput} {...register}>
          {input}
        </div>
        <div className={styles.rowAction}>{action}</div>
      </span>
    </div>
  );
}

export default FormRow;
