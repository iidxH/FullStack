import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])

	useEffect(() => {
		axios
		.get('https://studies.cs.helsinki.fi/restcountries/api/all')
		.then(response => {
			console.log(response.data)
			const allCountries = response.data
			setCountries(allCountries)
		})
	}, [])

	const handleInput = (event) => {
		const inputValue = event.target.value
		console.log('Kirjoitettu: ', inputValue)

		if (inputValue === '') {
				setFilteredCountries([])				
				return
			}

		const filtered = countries.filter(country =>
			country.name.common.toLowerCase().includes(inputValue.toLowerCase())
		)
		setFilteredCountries(filtered)
		console.log('Filtteröidyt: ', filtered)
	}

	const onSearch = (event, value) => {
    	event.preventDefault()
		console.log('NAPPIA PAINETTU')
		console.log('indeksi: ', value)
		const chosenCountry = countries.find(country => country.name.common === value)			
		setFilteredCountries([chosenCountry])
		console.log('Valitun maan tiedot: ', chosenCountry)
  }
	
	return (
		<div>
			<h1>Country finder</h1>
			find countries
			<input onChange={handleInput}/><br />
			<Country filteredCountries={filteredCountries} onSearch={onSearch}/>			
		</div>
	)
}

export default App