import React from 'react';
// import './Navigation.css';

const Navigation = ({handleModeChange, onClickTable}) => {
  return(
    <div>
      <nav style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => handleModeChange('search')}>Haku</button>
        <button onClick={() => handleModeChange('save')}>Syöttö</button>
        <button onClick={() => onClickTable()} type="button">Sarjataulukko</button>
      </nav>
    </div>
  );
}

export default Navigation;