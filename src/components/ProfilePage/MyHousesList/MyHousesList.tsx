/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import styles from './MyHousesList.module.css';

interface MyHousesListProps {
  title: string;
  children: React.ReactChild;
}

function MyHousesList({ title, children }: MyHousesListProps) {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List className={styles.listContainer}>
      <ListItemButton className={styles.listButton} onClick={handleClick}>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle1', fontWeight: '600', color: '#22a6b3' }}
          primary={title}
        />
        {open ? <ExpandLess style={{ color: '#22a6b3' }} /> : <ExpandMore style={{ color: '#22a6b3' }} />}
      </ListItemButton>
      <Collapse className={styles.listCollapse} in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}

export default MyHousesList;
