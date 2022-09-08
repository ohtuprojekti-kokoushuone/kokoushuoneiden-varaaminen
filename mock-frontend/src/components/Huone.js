import React from 'react'

const Huone = ({ huone, toggleReserved}) => {
  const label = huone.vapaa
    ? 'varaa' : 'vapauta'

  return (
    <div className='huone'>
      
      <button onClick={toggleReserved}>{label}</button>
    </div>
  )

}

export default Huone

 // {huone.id} huoneen koko {huone.koko} hlö