import React from 'react';
// import './Navigation.css';
import footballicon from '../../icons8-soccer-ball-48.png';

const Navigation = ({onUseChange}) => {
  return(
    <div>
      <img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/>
      <nav style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => onUseChange('search')}>Haku</button>
        <button onClick={() => onUseChange('save')}>Syöttö</button>
      </nav>
    </div>
  );
}

export default Navigation;