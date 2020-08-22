import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import User from '../User';
import style from './style.module.scss';

const List = () => {
  const usersOnPage = useSelector(state => state.userManager.usersOnPage);

  const memoUsers = useMemo(() => (
    usersOnPage.map(user => (
      <User
        key={user.id}
        id={user.id}
      />
    ))
  ), [usersOnPage]);

  return (
    <div className={style.container}>
      {memoUsers}
    </div>
  );
};

export default List;
