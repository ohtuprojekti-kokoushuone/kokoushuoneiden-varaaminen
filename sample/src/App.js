import "./App.css";
import { getTest } from "./requests";

function App() {
  return (
    <div className="App">
      <h1>Kokoushuoneiden varaussovellus</h1>
      <button onClick={getTest}>test</button>
    </div>
  );
}

export default App;
