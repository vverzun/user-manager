import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import User from '../User';
import { USERS_PER_PAGE } from '../../constants/pagination';
import style from './style.module.scss';

const List = () => {
  const users = useSelector(state => state.userManager.users);
  const page = useSelector(state => state.userManager.page);

  const memoUsers = useMemo(() => {
    const lastUserIndex = page * USERS_PER_PAGE;
    const firstUserIndex = lastUserIndex - USERS_PER_PAGE;
    const usersOnPage = users.slice(firstUserIndex, lastUserIndex);

    return usersOnPage.map(user => (
      <User
        key={user.id}
        id={user.id}
      />
    ));
  }, [users, page]);

  return (
    <div className={style.container}>
      {memoUsers}
    </div>
  );
};

export default List;
