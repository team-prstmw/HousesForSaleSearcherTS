/* eslint-disable react/jsx-props-no-spreading */
import styles from './FormRow.module.css';

const FormRow = ({ label, input, action, register }) => {
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
};

export default FormRow;
