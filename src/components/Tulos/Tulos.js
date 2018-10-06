import React from 'react';

const Tulos = ({onResultChange, labeli, currentValue}) => {

  return (
    <div>
      <label htmlFor={labeli}>{labeli}</label>
      <input type="number" min="0" onChange={onResultChange} value={currentValue} />
    </div>
  )
}

export default Tulos;