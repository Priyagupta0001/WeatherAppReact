import React, { useState } from 'react'
import axios from 'axios'

export default function Weather() {
    let[city, setCity] = useState('');
    const[weather, setWeather] = useState();
    const handleCityChange = (e) => {
      setCity(e.target.value)
    }

    const handleClick = () => {
      fetchWeather();
    }

    const fetchWeather = async ()=> {
      try{
        const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42a2c63cba249b308cdd2cf8cdf3a234&units=metric`)
        setWeather(response);
      } 
      catch(error){
        console.log("Error fetching data", error)
      }
    }
    
    return (
      <div className='weather-container'>
        <h1>Weather app</h1>
        <input type='text' 
        placeholder='Enter City Name' 
        value={city}
        onChange={handleCityChange}/>
        <br/>
        <button onClick={handleClick}>Get Weather</button>
          {weather &&(
            <>
            <div className='weather-info'>
              <h3>{weather.data.name}</h3>
              <p>Temp is {weather.data.main.temp}</p>
              <p>{weather.data.weather[0].description}</p>
            </div>
            </>
          )}
      </div>
    )
}