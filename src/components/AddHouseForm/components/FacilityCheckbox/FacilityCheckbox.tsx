import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function FacilityCheckbox({ label }: { label: string | number }) {
  return <FormControlLabel sx={{ minWidth: '50%', margin: 0 }} control={<Checkbox />} label={label} />;
}

export default FacilityCheckbox;
