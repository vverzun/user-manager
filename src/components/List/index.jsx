import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import style from './style.module.scss';

const List = ({ users }) => {
  const memoUsers = useMemo(() => (
    users.map(user => (
      <User
        key={user.id}
        id={user.id}
      />
    ))
  ), [users]);

  return (
    <div className={style.container}>
      {memoUsers}
    </div>
  );
};

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  })).isRequired
};

export default List;
