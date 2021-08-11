import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { User } from './User';
import { UserCard } from './UserCard';
import { UserList } from './UserList';
import { UserService } from './UserService';

// users endpoint:     https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users
// company endpoint:   https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies

function App() {
  const userService = React.useMemo(() => new UserService(), []);
  const { 
    userNameSearch, 
    onSearch,
    newAvatarUrl,
    newUserName,
    onAddUser, 
    items,
    search,
    onNewUserNameChange,
    onNewAvatarChange,
    onDelete
  } = userService;

  return (
    <div>
      <input placeholder='Search...' value={userNameSearch} onChange={onSearch}></input>
      <div>
        <input placeholder='Avatar Url' value={newAvatarUrl} onChange={onNewAvatarChange}></input>
        <input placeholder='User Name' value={newUserName} onChange={onNewUserNameChange}></input>
        <button onClick={onAddUser}>Add</button>
      </div>
      <UserList userList={items} onDelete={onDelete} search={search} />
    </div>
  );
}

export default observer(App);
