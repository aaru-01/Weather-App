import React from 'react';
import axios from "axios";
import './App.css';
import { useState, useEffect } from 'react';
import img5 from "./images/summer.jpg";
import img6 from "./images/rainy.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import gif1 from "./images/make-a-wish-wind.gif";
import gif2 from "./images/bg-img-main.gif";



export default function App() {
  const [WeatherData, setWetherData] = useState({});
  const [city, setCity] = useState("Pune");
  const [weatherDescription, setWetherDescription] = useState("");

  async function loadWeatherData() {

    // let response = ""
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=194dec926c325183d64dba1673f416e2`)
      console.log(response)
      setWetherData(response.data);
    }

    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadWeatherData();
  }, [])



  // useEffect(()=>{
  // let description = "";
  // const weather = WeatherData?.weather
  // // console.log(weather);
  // if(!weather){
  //   return;
  // }

  // const weatherObj = weather[0];
  // },[WeatherData])

  useEffect(() => {
    setWetherDescription(
      `${WeatherData?.weather?.[0].description} (${WeatherData?.weather?.[0].main})`)

  })


  useEffect(() => {
    loadWeatherData();
  }, [city])

  return (
    <>
      <div className='weather-main-container'>
        <div className='weather-container2'>
          {/* {city} */}

          <h1 className='weather-city'>Weather App</h1><br /><br />
          <input type='text' placeholder='Enter City Name' className='input-box-city' value={city} onChange={(e) => {
            setCity(e.target.value);
          }} /><br /><br />

          <p className='cityname-weather-app'>City: {WeatherData?.name}</p>
          <p className='temperature'>Temperature: {(WeatherData?.main?.temp - 273)
            .toFixed(2)} °C &nbsp;<FontAwesomeIcon icon={faTemperatureThreeQuarters} beatFade style={{ color: "#f06a6a", color: 'red', fontSize: '40px' }} /></p>

          <p className='weather-app-visibility'>Visibility: <br />{WeatherData?.visibility} meters</p>
          <p className='weather-description'>Description:<br /> {weatherDescription}</p>
          {/* <i className="fa fa-search"></i> Search icon */}

        </div>

      </div>
      <div className='card-container-weather'>
        <div className='weather-card-container2'>
          <img src={img6} className='weather-summer-img' />
          <p className='sea-level'>Sea-Level: {WeatherData?.main?.sea_level}</p>
        </div>

        <div className='weather-card-container2'>


          <img src={gif1} alt="Your GIF Alt Text" className='weather-img-wind-gif' />
          <h3 className='weather-wind-heading'>Wind</h3>
          <FontAwesomeIcon icon={faWind} beatFade fontSize={40} color='red' className='icon-wind' />
          <p className='weather-wind-speed'>{WeatherData?.wind?.speed}</p>
          <p className='weather-wind-gust'>Gust: {WeatherData?.wind?.gust}</p>
          <p className='weather-wind-deg'>Deg: {WeatherData?.wind?.deg}</p>
        </div>
        <div className='weather-card-container2'>
          <img src={img5} className='weather-summer-img' />
          <p className='weather-wind-sunrise'>Sunrise {WeatherData?.sys?.sunrise}</p><br /><br /><br />
          <p className='weather-wind-sunset'>Sunset {WeatherData?.sys?.sunset}</p>
        </div>
      </div>
    </>
  );
}
// {WeatherData?.weather[0]?.main}({WeatherData?.weather[0]?.description})

