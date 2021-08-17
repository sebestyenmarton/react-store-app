import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import './App.scss';
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
    <div className='page' >
      <div className='header'>
        <div className="title">
          <h1 className="title1">Your Companies</h1>
          <h1 className="title2">And Users list</h1>
        </div>
        <div className="nav">
          <Button size="large" onClick={() => setPage('user')}> 
            Users Page {userStore.filteredItems.length} 
          </Button>
          <Button size="large" onClick={() => setPage('company')}> 
            Companies Page {companyStore.filteredItems.length} 
          </Button>
        </div>
      </div>
      {page === 'user' && <UserCardList store={userStore} />}
      {page === 'company' && <CompanyCardList store={companyStore} />}
    </div>
  );
}

export default observer(App);
