import React from 'react';
// import liigalista from './liiga.json';

const Liigat = ({onLeagueChange, labeli}) => {
  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <select id={labeli} onChange={onLeagueChange}>
        <option value="PREMIERLEAGUE">Premier League</option>
        <option value="CHAMPIONSHIP">Championship</option>
      </select>
    </div>
  )
}

export default Liigat;