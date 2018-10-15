import React from 'react';

const HomeAway = ({onHomeAwayChange, labeli, currentValue}) => {
  return(
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <select id={labeli} onChange={onHomeAwayChange} value={currentValue}>
        <option value='all' key='all'>all</option>
        <option value='home' key='home'>home</option>
        <option value='away' key='away'>away</option>
      </select>
    </div>
  )
}

export default HomeAway;