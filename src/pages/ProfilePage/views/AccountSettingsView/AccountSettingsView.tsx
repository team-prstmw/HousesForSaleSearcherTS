/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import EditButtons from 'src/components/ProfilePage/EditButtons/EditButtons';
import FormRow from 'src/components/ProfilePage/FormRow/FormRow';
import TextInput from 'src/components/ProfilePage/TextInput/TextInput';
import UserAvatar, { AvatarSize } from 'src/components/UserAvatar/UserAvatar';
import WelcomeHeader, { WelcomeSize } from 'src/components/WelcomeHeader/WelcomeHeader';
import { useApiGet, useApiPatch } from 'src/hooks/useApi';
import { profilePageSchema } from 'src/schemas/authSchemas';
import { ProfilePageInterface } from 'src/schemas/ProfilePageInterface';

import styles from './AccountSettingsView.module.css';

const HOST_URL = import.meta.env.VITE_HOST_URL as string;

enum Fields {
  Name = 'name',
  Password = 'password',
  Email = 'email',
}

interface UserFormData {
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
  const [img, setImg] = useState<string>('');
  const [formData, setFormData] = useState<UserFormData>({
    nameEditable: false,
    passwordEditable: false,
    tempImage: '',
  });
  const [user, setUser] = useState<UserData>([]);

  const { data, isLoading }: { data: UserData } = useApiGet({ path: `/users`, auth: true });

  const { mutateAsync } = useApiPatch({ path: '/users', auth: true });

  useEffect(() => {
    if (!isLoading) {
      const dataData = data;
      setUser(dataData);
    }
  }, [data, isLoading]);

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
    setValue('name', user.name);
    setValue('email', user.email);
    setImg(user.avatar);
  }, [setValue, user.avatar, user.email, user.name]);

  const avatarUrl = () => {
    if (img && typeof img === 'string') {
      return `${HOST_URL}${user.avatar}`;
    }

    return '';
  };
  const setEditable = (field: FieldsType) =>
    setFormData((prevState) => ({ ...prevState, [`${field}Editable`]: !prevState[`${field}Editable`] }));

  const onChangeName = () => {
    setEditable(Fields.Name);
    setFormData((prevState) => ({ ...prevState, namePrev: getValues(Fields.Name) as string }));
    mutateAsync({ data: { name: getValues(Fields.Name) } }).then(() => {
      queryClient.invalidateQueries('/users');
    });
  };

  const onChangePassword = () => {
    setEditable(Fields.Password);
    setFormData((prevState) => ({ ...prevState, passwordPrev: getValues(Fields.Password) as string }));
    // SEND REQUEST
  };

  const onCancelChange = (field: FieldsType) => {
    const fieldPrev: keyof Pick<UserFormData, `${Fields.Name}Prev` | `${Fields.Password}Prev`> = `${field}Prev`;
    const fieldPrevValue = formData[fieldPrev];

    if (fieldPrevValue) {
      setValue(field, fieldPrevValue);
    }
    setEditable(field);
  };
  const onAddAvatar = (image?: File) => {
    if (image) {
      const formDatas = new FormData();
      formDatas.append('images', image, image.name);
      mutateAsync({ data: formDatas }).then(() => {
        queryClient.invalidateQueries('/users');
      });
      setFormData((prevState) => ({ ...prevState, tempImage: image }));
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.headerContent}>
        <Box sx={{ textAlign: 'center', mb: 0.5 }}>
          <WelcomeHeader size={WelcomeSize.Large} name={user.name} />
        </Box>
      </span>
      <div className={styles.avatarContainer}>
        <UserAvatar name={getValues(Fields.Name)} image={avatarUrl()} size={AvatarSize.Large} />
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
