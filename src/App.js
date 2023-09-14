
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const fetchApiData = async () => {

    console.log("fetchApiData");

    try {
      const response = await fetch('http://127.0.0.1:8080/films');
      const json = await response.json();
      setItems(json);
    }
    catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="App">
      <h1>Data</h1>
      <ol>
        <li>
          <button onClick={fetchApiData}>Fetch</button>
        </li>

        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>

      </ol>
    </div>
  );
}

export default App;