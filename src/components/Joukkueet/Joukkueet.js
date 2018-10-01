import React from 'react';
// import joukkuelista from './joukkueet.json';

const Joukkueet = ({onTeamChange, labeli}) => {
  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <select id={labeli} onChange={onTeamChange}>
        <option value="ARS">Arsenal</option>
        <option value="BOU">Bournemouth</option>
        <option value="BHA">Brighton & Howe</option>
        <option value="BUR">Burnley</option>
        <option value="CHE">Chelsea</option>
        <option value="CRY">Chrystal Palace</option>
        <option value="EVE">Everton</option>
        <option value="HUD">Huddersfield Town</option>
        <option value="LEI">Leicester</option>
        <option value="LIV">Liverpool</option>
        <option value="MCI">Manchester City</option>
        <option value="MUN">Manchester United</option>
        <option value="NEW">Newcastle United</option>
        <option value="SOU">Southampton</option>
        <option value="STK">Stoke City</option>
        <option value="SWA">Swansea</option>
        <option value="TOT">Tottenham</option>
        <option value="WAT">Watford</option>
        <option value="WBA">West Brom</option>
        <option value="WHU">West Ham</option>
      </select>
    </div>
  )
}

export default Joukkueet;