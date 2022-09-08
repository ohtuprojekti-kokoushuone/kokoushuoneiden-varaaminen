
import React from 'react'
import { useState, useEffect } from 'react'

import Huone from './components/Huone.js'
import huoneService from './services/huoneet'
import { Table } from 'react-bootstrap'

const App = () => {

  const [huoneet, setHuoneet] = useState([])
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    huoneService
    .getAll()
    .then(response => {
      setHuoneet(response.data)
    })
  }, [])

  
  const toggleReservedRoom = id => {
    const huone = huoneet.find(n => n.id === id)
    const changedHuone = { ...huone, vapaa: !huone.vapaa}

    huoneService
    .update(id, changedHuone)
    .then(response => {
      setHuoneet(huoneet.map(huone => huone.id !== id ? huone : response.data))
    })
    
  }

  const huoneetToShow = showAll
    ? huoneet
    : huoneet.filter(huone => huone.vapaa)


  return (
    <div className="container">
      <h1>Huoneiden varausjärjestelmä</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Näytä {showAll ? 'vapaat' : 'kaikki' }
        </button>
      </div> 

      <Table striped>
        <thead>
          <tr>
            <th scope="col">Huoneen numero</th>
            <th scope="col">Henkilömäärä</th>
          </tr>
        </thead>
        <tbody>
          {huoneetToShow.map(huone =>
            <tr key={huone.id}>
              <td>
                {huone.id}
              </td>
              <td>
                {huone.koko}
              </td>
              <td>    
                <Huone            
                  huone={huone}
                  toggleReserved={() => toggleReservedRoom(huone.id)}/>         
              </td>
            </tr>
          )}
        </tbody>
      </Table> 
        
    </div>
  )
}
export default App

/*
ilman taulukkoa oleva toteutus, tällöin pitää muokkaa Huone.js 
<div className="container">
      <h1>Huoneiden varausjärjestelmä</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Näytä {showAll ? 'vapaat' : 'kaikki' }
        </button>
      </div>  
        {huoneetToShow.map(huone =>
          <Huone 
            key={huone.id} 
            huone={huone}
            toggleReserved={() => toggleReservedRoom(huone.id)}/>
          )}
    </div>
*/