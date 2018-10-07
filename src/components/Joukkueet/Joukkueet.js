import React from 'react';
import teamList from './joukkuelista.js';

const Joukkueet = (props) => {
  
    const {labeli, onTeamChange, currentValue, league} = props;
    const filteredTeams = teamList.filter(team => team.league === league);
    
    return (
      <div>
        <label htmlFor={labeli}>{labeli}</label>
        <select id={labeli} onChange={onTeamChange} value={currentValue}>
          {filteredTeams.map((team) => {
            return <option value={team.abbr} key={team.abbr}>{team.name}</option>;
          })}
        </select>
      </div>
    )
}

export default Joukkueet;

