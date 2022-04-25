/* eslint-disable react/require-default-props */
import Avatar from '@mui/material/Avatar';

import getInitials from '../../utils/getInitials';

interface Props {
  name: string;
  image?: string;
  size?: AvatarSize;
}

export enum AvatarSize {
  Small = 40,
  Medium = 64,
  Large = 100,
}

const UserAvatar = ({ name, image, size = AvatarSize.Medium }: Props) => {
  return (
    <Avatar sx={{ bgcolor: '#30336b', width: size, height: size, fontSize: size / 2, margin: 8 / size }} src={image}>
      {getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;
