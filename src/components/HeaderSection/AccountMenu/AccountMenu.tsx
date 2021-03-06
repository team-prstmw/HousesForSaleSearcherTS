import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WelcomeHeader from 'src/components/WelcomeHeader/WelcomeHeader';
import LoginContext from 'src/contexts/LoginContext';

import { signOut } from '@/api/auth/signOut';

import UserAvatar, { AvatarSize } from '../../UserAvatar/UserAvatar';

export default function AccountMenu() {
  const login = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = login;
  const HOST_URL = import.meta.env.VITE_HOST_URL as string;

  const avatarUrl = () => {
    if (user.avatar && typeof user.avatar === 'string') {
      return `${HOST_URL}${user.avatar}`;
    }

    return '';
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: '3rem' }}>
        <Tooltip title="Account menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatar name={user.name} image={avatarUrl()} size={AvatarSize.Small} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            minWidth: '15rem',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <WelcomeHeader name="Name" />
        <Divider />
        <MenuItem component={Link} to="/user">
          ACCOUNT SETTINGS
        </MenuItem>
        <MenuItem component={Link} to="/user/favourites">
          FAVORITES
        </MenuItem>

        <MenuItem component={Link} to="/user/my-houses">
          MY HOUSES
        </MenuItem>
        <MenuItem component={Link} to="/user/sell-house">
          SELL HOUSE +
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            signOut(login.logout());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          LOGOUT
        </MenuItem>
      </Menu>
    </>
  );
}
