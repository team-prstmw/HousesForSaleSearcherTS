/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import EditButtons from 'src/components/ProfilePage/EditButtons/EditButtons';
import FormRow from 'src/components/ProfilePage/FormRow/FormRow';
import TextInput from 'src/components/ProfilePage/TextInput/TextInput';
import { useApiGet, useApiPatch } from 'src/hooks/useApi';
import { profilePageSchema } from 'src/schemas/authSchemas';
import { ProfilePageInterface } from 'src/schemas/ProfilePageInterface';

import styles from './AccountSettingsView.module.css';

enum Fields {
  Name = 'name',
  Password = 'password',
  Email = 'email',
}

interface FormDatas {
  nameEditable: boolean;
  passwordEditable: boolean;
  tempImage: string | File;
  image?: File;
  namePrev?: string;
  passwordPrev?: string;
}

type FieldsType = keyof Pick<ProfilePageInterface, `${Fields.Name}` | `${Fields.Password}`>;

function AccountSettingsView() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormDatas>({ nameEditable: false, passwordEditable: false, tempImage: '' });
  const [img, setImg] = useState<string>('');
  const theme = useTheme();

  const { data }: { data: UserData } = useApiGet({ path: `/users/625badec139559b0e43dc45e` });
  const { mutateAsync } = useApiPatch({ path: '/users/625badec139559b0e43dc45e' });

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProfilePageInterface>({
    mode: 'onBlur',
    resolver: yupResolver(profilePageSchema),
  });

  useEffect(() => {
    setValue('name', data.name);
    setValue('email', data.email);
    setImg(data.avatar);
  }, [data, setValue]);

  const avatarUrl = () => {
    if (img && typeof img === 'string') {
      return `http://localhost:4000/${data.avatar}`;
    }

    return '';
  };
  const setEditable = (field: FieldsType) =>
    setFormData((prevState) => ({ ...prevState, [`${field}Editable`]: !prevState[`${field}Editable`] }));

  const onChangeName = () => {
    setEditable(Fields.Name);
    setFormData((prevState) => ({ ...prevState, namePrev: getValues(Fields.Name) as string }));
    mutateAsync({ data: { name: getValues(Fields.Name) } }).then(() => {
      queryClient.invalidateQueries('/users/625badec139559b0e43dc45e');
    });
  };

  const onChangePassword = () => {
    setEditable(Fields.Password);
    setFormData((prevState) => ({ ...prevState, passwordPrev: getValues(Fields.Password) as string }));
    // SEND REQUEST
  };

  const onCancelChange = (field: FieldsType) => {
    const fieldPrev: keyof Pick<FormDatas, `${Fields.Name}Prev` | `${Fields.Password}Prev`> = `${field}Prev`;
    const fieldPrevValue = formData[fieldPrev];

    if (fieldPrevValue) {
      setValue(field, fieldPrevValue);
    }
    setEditable(field);
  };

  const onAddAvatar = (image?: File) => {
    if (image) {
      const formDatas = new FormData();
      formDatas.append('avatar', image, image.name);
      mutateAsync({ data: formDatas }).then(() => {
        queryClient.invalidateQueries('/users/625badec139559b0e43dc45e');
      });
      setFormData((prevState) => ({ ...prevState, tempImage: image }));
    }
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
          {`Welcome${data.name ? `, ${data.name}` : ''}!`}
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
                {...{ error: errors?.name }}
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
            input={
              <TextInput placeholder="mail@mail.com" disabled register={register(Fields.Email)} error={errors?.email} />
            }
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
