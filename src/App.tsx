import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import './App.css';
import { CompanyCardList } from './components/CompanyCardList';
import { UserCardList } from './components/UserCardList';
import { RootStore } from './stores/RootStore';

// users endpoint:     https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users
// company endpoint:   https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies

function App() {
  const rootStore = React.useMemo(() => new RootStore(), []);
  const { userStore, companyStore } = rootStore;
  const [page, setPage] = React.useState('user');

  return (
    <div>
      <div>
        <Button variant="contained" color="primary" onClick={() => setPage('user')}> 
          Users {userStore.filteredItems.length} 
        </Button>
        <Button variant="contained" color="primary" onClick={() => setPage('company')}> 
          Company {companyStore.filteredItems.length} 
        </Button>
      </div>
      {page === 'user' && <UserCardList store={userStore} />}
      {page === 'company' && <CompanyCardList store={companyStore} />}
    </div>
  );
}

export default observer(App);
