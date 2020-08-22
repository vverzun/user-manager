import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { number } from 'prop-types';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, DeleteForever, Edit } from '@material-ui/icons';
import { openModal } from '../../containers/Modal/actions';
import { UPDATE } from '../../constants/modal';
import style from './style.module.scss';

const User = ({ id }) => {
  const {
    name,
    surname,
    desc
  } = useSelector(state => state.userManager.usersOnPage.find(userOnPage => (
    userOnPage.id === id
  )));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleMenuOpen = useCallback(event => setAnchorEl(event.currentTarget), []);
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);

  const handleUserDelete = useCallback(() => {
    console.log('delete');
    handleMenuClose();
  }, []);
  const handleUserEdit = useCallback(() => {
    dispatch(openModal(UPDATE, { name, surname, desc }));
    handleMenuClose();
  }, []);

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
          {`${name} ${surname}`}
        </Typography>
        <Typography noWrap>
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

User.propTypes = {
  id: number.isRequired
};

export default User;
