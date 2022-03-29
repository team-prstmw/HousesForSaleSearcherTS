/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfilePageSchemaInterface } from 'src/schemas/authSchemas';

import EditButtons from '/src/components/EditButtons/EditButtons';
import FormRow from '/src/components/FormRow/FormRow';
import TextInput from '/src/components/TextInput/TextInput';
import { profilePageSchema } from '/src/schemas/authSchemas';

import styles from './AccountSettingsView.module.css';

enum Fields {
  Name = 'name',
  Password = 'password',
}

interface FormData {
  nameEditable: boolean;
  passwordEditable: boolean;
  tempImage: string | File;
  image?: File;
  namePrev?: string;
  passwordPrev?: string;
  email?: string;
}

function AccountSettingsView() {
  const [formData, setFormData] = useState<FormData>({ nameEditable: false, passwordEditable: false, tempImage: '' });
  const theme = useTheme();

  const {
    register,
    getValues,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    formState: { errors },
  } = useForm<ProfilePageSchemaInterface>({
    mode: 'onBlur',
    resolver: yupResolver(profilePageSchema),
  });

  const avatarUrl = () => {
    if (formData?.image && typeof formData?.image === 'string') {
      return formData.image;
    }

    if (formData?.tempImage instanceof File) {
      return URL.createObjectURL(formData.tempImage);
    }
    return '';
  };

  const setEditable = (field: Fields) =>
    setFormData((prevState) => ({ ...prevState, [`${field}Editable`]: !prevState[`${field}Editable`] }));

  const onChangeName = () => {
    setEditable(Fields.Name);
    setFormData((prevState) => ({ ...prevState, namePrev: getValues(Fields.Name) as string }));
    // SEND REQUEST
  };

  const onChangePassword = () => {
    setEditable(Fields.Password);
    setFormData((prevState) => ({ ...prevState, passwordPrev: getValues(Fields.Password) as string }));
    // SEND REQUEST
  };

  const onCancelChange = (field: Fields) => {
    const fieldPrev = `${field}Prev`;

    if (formData[fieldPrev as keyof FormData]) {
      setValue(field, formData[fieldPrev as keyof FormData] as never);
      setEditable(field);
    } else {
      setEditable(field);
    }
  };

  const onAddAvatar = (image: File | undefined) => {
    if (image) {
      setFormData((prevState) => ({ ...prevState, tempImage: image }));
    }
    // SEND REQUEST
  };

  const getInitials = () => {
    let name = getValues(Fields.Name) as string | undefined;

    if (!name) {
      return;
    }

    name = name[0].toUpperCase();

    // eslint-disable-next-line consistent-return
    return name;
  };
  return (
    <div className={styles.container}>
      <span className={styles.headerContent}>
        <Typography
          variant="h3"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '2.2rem',
            },
            textAlign: 'center',
          }}
          mb={2}
        >
          {`Welcome${getValues(Fields.Name) ? `, ${getValues(Fields.Name) as string}` : ''}!`}
        </Typography>
      </span>
      <div className={styles.avatarContainer}>
        <Avatar sx={{ bgcolor: '#30336b', width: 100, height: 100, fontSize: 36, margin: 2 }} src={avatarUrl()}>
          {getInitials()}
        </Avatar>
        <input
          style={{ display: 'none' }}
          id="images-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onAddAvatar(e.target?.files?.[0])}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="images-upload">
          <Button variant="text" component="span" startIcon={<EditIcon />}>
            EDIT PHOTO
          </Button>
        </label>
      </div>
      <main className="main">
        <Box component="form">
          <FormRow
            label={<Typography variant="h6">Name</Typography>}
            input={
              <TextInput
                placeholder="Name"
                readOnly={!formData.nameEditable}
                register={register(Fields.Name)}
                error={errors?.name}
              />
            }
            action={
              formData.nameEditable ? (
                <EditButtons onCancel={() => onCancelChange(Fields.Name)} onSave={onChangeName} />
              ) : (
                <Button onClick={() => setEditable(Fields.Name)}>Edit</Button>
              )
            }
          />
          <FormRow
            label={<Typography variant="h6">E-mail</Typography>}
            input={<TextInput placeholder="mail@mail.com" disabled error={errors?.email} />}
          />
          <FormRow
            label={<Typography variant="h6">Password</Typography>}
            input={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextInput
                  placeholder="************"
                  password
                  defaultValue={null}
                  readOnly={!formData.passwordEditable}
                  register={register(Fields.Password)}
                  error={errors?.password}
                />
              </div>
            }
            action={
              formData.passwordEditable ? (
                <EditButtons onCancel={() => onCancelChange(Fields.Password)} onSave={onChangePassword} />
              ) : (
                <Button onClick={() => setEditable(Fields.Password)}>Edit</Button>
              )
            }
          />
        </Box>
      </main>
    </div>
  );
}

export default AccountSettingsView;