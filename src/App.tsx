import React from 'react';
import './App.css';

// users endpoint:     https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users
// company endpoint:   https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies

function App() {
  return (
    <div>

        <div className='grid-container'>

            <div className='grid-item'>
              <img src='https://cdn.fakercloud.com/avatars/guiiipontes_128.jpg' width='64' height='64' alt='pista' />
              <p>Raoul17</p>
            </div>

            <div className='grid-item'>
              <img src='https://cdn.fakercloud.com/avatars/lu4sh1i_128.jpg' width='64' height='64' alt='pista' />
              <p>Delilah57</p>
            </div>

            <div className='grid-item'>
              <img src='https://cdn.fakercloud.com/avatars/boxmodel_128.jpg' width='64' height='64' alt='pista' />
              <p>Sydni.Johnson</p>
            </div>

            <div className='grid-item'>
              <img src='https://cdn.fakercloud.com/avatars/g3d_128.jpg' width='64' height='64' alt='pista' />
              <p>Garnet83</p>
            </div>

            <div className='grid-item'>
              <img src='https://cdn.fakercloud.com/avatars/mikemai2awesome_128.jpg' width='64' height='64' alt='pista' />
              <p>Ruth.Robel12</p>
            </div>
        </div>

    </div>
  );
}

export default App;
