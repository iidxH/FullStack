import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  	useEffect(() => {
		const apiKey = import.meta.env.VITE_SOME_KEY
		axios
		.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
		.then(response => {
			console.log(response.data)
			const weather = response.data
			setWeather(weather)
		})
	}, [capital])

	if (!weather) {
		return <p>Loading weather data...</p>
	}

	return (
		<div>
		<p>Temperature: {weather.main.temp} Celsius</p>
		<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Flag" />
		<p>Wind {weather.wind.speed} m/s</p>	
		</div>
	)
}


export default Weather