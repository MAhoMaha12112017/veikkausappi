import React from 'react';

const MatchResults = ({results}) => {
  return (
    <div>
      <h3>Match Results</h3>
      <ul>
      {results.map((result) => {
        return (
          <li key={result.id}>Kierros {result.round}. {result.hometeamabbr} - {result.awayteamabbr}: {result.awaygoals} - {result.homegoals} xG: {result.homexg} - {result.awayxg} </li>
        );
      })}
      </ul>
    </div>
  )
}

export default MatchResults;
