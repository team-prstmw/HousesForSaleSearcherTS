import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

const EditButtons = ({ onSave, onCancel }) => {
  return (
    <ButtonGroup size="small">
      {onSave && (
        <IconButton onClick={onSave}>
          <CheckIcon color="success" />
        </IconButton>
      )}
      {onCancel && (
        <IconButton onClick={onCancel}>
          <CloseIcon color="error" />
        </IconButton>
      )}
    </ButtonGroup>
  );
};

export default EditButtons;
