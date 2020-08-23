import React, { useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Spinner from '../../components/Spinner';
import List from '../../components/List';
import ErrorAlert from '../../components/ErrorAlert';
import { loadUsers, changePage } from './actions';
import { USERS_PER_PAGE } from '../../constants/pagination';
import style from './style.module.scss';

const Manager = () => {
  const usersTotalAmount = useSelector(state => state.userManager.users.length);
  const isLoading = useSelector(state => state.userManager.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handlePageChange = useCallback((e, page) => {
    dispatch(changePage(page));
  }, []);

  const pagesQuantity = useMemo(() => (
    Math.ceil(usersTotalAmount / USERS_PER_PAGE)
  ), [usersTotalAmount]);

  return (
    <div className={style.container}>
      {isLoading
        ? <Spinner />
        : <List />}
      <Pagination
        className={style.pagination}
        size="large"
        count={pagesQuantity}
        onChange={handlePageChange}
      />
      <ErrorAlert />
    </div>
  );
};

export default Manager;
