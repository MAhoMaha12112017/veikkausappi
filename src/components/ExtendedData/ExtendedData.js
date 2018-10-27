import React from 'react';

const ExtendedData = ({selectedTeam, homeaway, extendedResults}) => {
  return(
    <div>
      <h3>{selectedTeam} - {homeaway} games</h3>
      <ul>
        <li>HomeGoals: {extendedResults.HomeGoals} </li>
        <li>AwayGoals: {extendedResults.AwayGoals} </li>
        <li>HomeXG: {extendedResults.HomeXG} </li>
        <li>AwayXG: {extendedResults.AwayXG} </li>
        <li>avgHomeGoals: {extendedResults.avgHomeGoals} </li>
        <li>avgAwayGoals: {extendedResults.avgAwayGoals} </li>
        <li>avgHomeXG: {extendedResults.avgHomeXG} </li>
        <li>avgAwayXG: {extendedResults.avgAwayXG} </li>
        <li>draws: {extendedResults.draws} </li>
        <li>losses: {extendedResults.losses} </li>
        <li>wins: {extendedResults.wins} </li>
      </ul>
    </div>
  )
}

export default ExtendedData;