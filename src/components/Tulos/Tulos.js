import React from 'react';

const Tulos = ({onResultChange, labeli}) => {

  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <input type="number" min="0" onChange={onResultChange}/>
    </div>
  )
}

export default Tulos;