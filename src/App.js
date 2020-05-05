import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${query}&units=imperial&key=${API_KEY}`);
        const json = await response.json();
        console.log({ json });

        setResults(
          json.data.map(data => {
            return {
              temp: data.temp,
              name: data.city_name
            };
          })
        )
      } catch (error) { }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="form">
        <form onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="enter city"
          ></input>
          <button type="Submit">Search</button>
        </form>
      </div>
      <br />
      <div className="results">
        {results.map(result => (
          <div key={result.name}>
            <h3>{result.name}</h3>
            <p>{result.temp}º Fahrenheit</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
