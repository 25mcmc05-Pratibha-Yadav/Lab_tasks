import React, { useEffect, useState } from 'react'
import axios from "axios"

const GetWeather = ({city}) => {
  const [error,setError] = useState(null);
  const [weather,setWeather] = useState(null);
  const [loading , setLoading] = useState(true) 
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const fetching = async () => {
      try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      const data = response.data;

      const weatherData = {
        description : data.weather[0].description,
        temperature : data.main.temp,
        humidity : data.main.humidity,
        pressure : data.main.pressure,
        name : data.name
      };

      setLoading(false)  ;
      setWeather(weatherData);
      } catch (error) {
        setError(error);
        setLoading(false)
      }
    }

    fetching()
  }, [city])

 if (loading)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl font-semibold text-gray-600 animate-pulse">
        Loading Weather...
      </p>
    </div>
  );
 if (error)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 font-semibold">{error.message}</p>
    </div>
  );

  return (
  <div className="flex items-center justify-center min-h-screen bg-blue-100">
    
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {weather.name}
      </h2>

      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Temperature:</span> {weather.temperature} °C
      </p>

      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Humidity:</span> {weather.humidity} %
      </p>

      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Pressure:</span> {weather.pressure} hPa
      </p>

      <p className="text-lg text-gray-700 capitalize">
        <span className="font-semibold">Description:</span> {weather.description}
      </p>

    </div>

  </div>
);
}

export default GetWeather
