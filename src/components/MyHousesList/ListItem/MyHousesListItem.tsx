/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';

interface MyHousesListItemProps {
  primaryText: string;
  secondaryText: string;
  chip?: string;
  archived: boolean;
}

export default function MyHousesListItem({ primaryText, secondaryText, chip, archived }: MyHousesListItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isChip = () => {
    if (chip) {
      if (chip === 'bought') {
        return <Chip label="bought" style={{ color: '#6AB04CDE', backgroundColor: '#F3F9F1' }} />;
      }
      return <Chip label="archived" style={{ color: '#979797' }} />;
    }
    return null;
  };

  const isArchived = () => {
    if (!archived) {
      return (
        <>
          <MenuItem onClick={handleClose}>More info</MenuItem>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Archive</MenuItem>
        </>
      );
    }
    return (
      <>
        <MenuItem onClick={handleClose}>More info</MenuItem>
        <MenuItem onClick={handleClose}>Re-list house</MenuItem>
      </>
    );
  };
  return (
    <List component="div" disablePadding>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar variant="square" />
        </ListItemAvatar>
        <ListItemText
          primary={primaryText}
          secondary={
            <>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                {secondaryText}
              </Typography>
            </>
          }
        />
        {isChip()}
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon style={{ color: 'black' }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {isArchived()}
        </Menu>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
