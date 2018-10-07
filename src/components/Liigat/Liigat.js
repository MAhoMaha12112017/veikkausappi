import React from 'react';
// import liigalista from './liiga.json';

const Liigat = ({onLeagueChange, labeli, currentValue}) => {
  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <select id={labeli} onChange={onLeagueChange} value={currentValue}>
        <option value="PREMIERLEAGUE">Premier League</option>
        <option value="CHAMPIONSHIP">Championship</option>
      </select>
    </div>
  )
}

export default Liigat;