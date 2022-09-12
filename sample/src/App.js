import React, { useEffect, useState } from "react";
import "./App.css";
import { getTest } from "./requests";

function App() {
  const [reservations, setReservations] = useState([]);
  const [showReservations, setShowReservations] = useState(false);

  useEffect(() => {
    getTest().then((data) => {
      setReservations(data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Kokoushuoneiden varaussovellus</h1>
      <button onClick={() => setShowReservations(!showReservations)}>
        {showReservations ? "piilota" : "näytä"}
      </button>
      {showReservations &&
        reservations.map((r, i) => <h3 key={i}>
          {r.subject}, alku: {r.start}, loppu: {r.end}
          </h3>)}
    </div>
  );
}

export default App;
