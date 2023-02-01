import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getWeather();
    setLoading(false);    
  };

  const getWeather = async () => {
    const API_KEY = "e7b63e869f322378f8cde445e61e276d";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    const res = await axios.get(url);
    setWeather(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <h1>Loading...</h1>}
      {weather.main && (
        <div className="weather-data">
          <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
