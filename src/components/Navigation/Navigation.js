import React from 'react';
// import './Navigation.css';

const Navigation = ({onUseChange, onClickTable}) => {
  return(
    <div>
      <nav style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => onUseChange('search')}>Haku</button>
        <button onClick={() => onUseChange('save')}>Syöttö</button>
        <button onClick={() => onClickTable()} type="button">Sarjataulukko</button>
      </nav>
    </div>
  );
}

export default Navigation;