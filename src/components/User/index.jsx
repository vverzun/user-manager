import React, { useState, useCallback } from 'react';
import { number } from 'prop-types';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, DeleteForever, Edit } from '@material-ui/icons';
import style from './style.module.scss';

import data from '../../data.json';

const User = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback(event => setAnchorEl(event.currentTarget), []);
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);

  const handleUserDelete = useCallback(() => {
    console.log('delete');
    handleMenuClose();
  }, []);
  const handleUserEdit = useCallback(() => {
    console.log('edit');
    handleMenuClose();
  }, []);

  const user = data.find(item => item.id === id);

  return (
    <Card className={style.container}>
      <CardContent className={style.content}>
        <IconButton
          className={style.menu}
          size="small"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleUserDelete}>
            <Typography className={style.popoverItem}>
              <DeleteForever />
              Delete
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleUserEdit}>
            <Typography className={style.popoverItem}>
              <Edit />
              Edit
            </Typography>
          </MenuItem>
        </Menu>
        <Typography noWrap className={style.title}>
          {`${user.name} ${user.surname}`}
        </Typography>
        <Typography noWrap>
          {user.desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

User.propTypes = {
  id: number.isRequired
};

export default User;
