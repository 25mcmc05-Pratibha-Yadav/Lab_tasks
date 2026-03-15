import { useState } from 'react'
import Search from './Components/Search';
import GetWeather from './Components/GetWeather';

function App() {
  const [city, setCity] = useState("Kota");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 gap-6">
      <Search setCity={setCity}></Search> 
      <GetWeather city={city}></GetWeather> 
    </div> 

    
  )
}

export default App
