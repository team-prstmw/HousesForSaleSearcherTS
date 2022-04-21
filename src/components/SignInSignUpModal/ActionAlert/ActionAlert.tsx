import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface LabeledValue {
  severity: 'success' | 'error';
  onCloseAlertInfo(state: string): void;
  children: string;
}

export default function ActionAlert({ severity, onCloseAlertInfo, children }: LabeledValue) {
  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      <Alert
        severity={severity}
        onClose={() => {
          onCloseAlertInfo('');
        }}
      >
        {children}
      </Alert>
    </Stack>
  );
}
