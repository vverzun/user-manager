import React, { useState, useCallback } from 'react';
import { Pagination } from '@material-ui/lab';
import List from '../../components/List';
import data from '../../data.json';
import { USERS_PER_PAGE } from '../../constants/pagination';
import style from './style.module.scss';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const changePage = useCallback((e, page) => {
    setCurrentPage(page);
  }, []);

  const numberOfUsersOnPage = Math.ceil(data.length / USERS_PER_PAGE);

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={style.container}>
      <List users={currentUsers} />
      <Pagination
        className={style.pagination}
        size="large"
        count={numberOfUsersOnPage}
        onChange={changePage}
      />
    </div>
  );
};

export default Home;
