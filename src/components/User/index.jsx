import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { number } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import { openModal } from '../../containers/Modal/actions';
import { UPDATE, CONFIRM } from '../../constants/modal';
import style from './style.module.scss';

const User = ({ id }) => {
  const { name, surname, desc } = useSelector(state => (
    state.userManager.users.find(user => user.id === id)
  ));

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleMenuOpen = useCallback(event => setAnchorEl(event.currentTarget), []);
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);

  const handleDeleteItemSelect = useCallback(() => {
    dispatch(openModal(CONFIRM, { id }));
    handleMenuClose();
  }, []);
  const handleEditItemSelect = useCallback(() => {
    dispatch(openModal(UPDATE, { id, user: { name, surname, desc } }));
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
          open={isMenuOpened}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditItemSelect}>
            <Typography className={style.popoverItem}>
              <Edit />
              Edit
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleDeleteItemSelect}>
            <Typography className={style.popoverItem}>
              <DeleteForever />
              Delete
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
