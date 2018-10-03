import React from 'react';
// import joukkuelista from './joukkueet.json';

const Joukkueet = ({onTeamChange, labeli, teams}) => {
  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <select id={labeli} onChange={onTeamChange}>
        {teams.map((team) => {
          return <option value={team.abbr} key={team.abbr}>{team.name}</option>;
        })}
      </select>
      
    </div>
  )
}

export default Joukkueet;

