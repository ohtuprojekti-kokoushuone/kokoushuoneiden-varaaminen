import React from 'react'
import { useState, useEffect } from 'react'

const Huone = ({ huone, toggleReserved}) => {
  const label = huone.vapaa
    ? 'varaa' : 'varattu'


  return (
    <div className='huone'>
      <button type="button" class="btn btn-outline-primary" onClick={toggleReserved}>{label}</button>
    </div>
  )

}

export default Huone

