/* eslint-disable react/require-default-props */
import { Typography } from '@mui/material';

interface Props {
  name: string;
  size?: WelcomeSize;
}

export enum WelcomeSize {
  Small = 18,
  Medium = 24,
  Large = 42,
}

const WelcomeHeader = ({ name, size = WelcomeSize.Medium }: Props) => {
  return <Typography fontSize={size} sx={{ margin: 1.5 }}>{`Welcome, ${name}!`}</Typography>;
};

export default WelcomeHeader;
