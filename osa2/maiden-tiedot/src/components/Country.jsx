import Weather from './Weather'

const Country = ( { filteredCountries, onSearch } ) => {

	if (filteredCountries.length > 10) {
		return (
			<div>
				Too many matches, spesify another filter
			</div>
		)
	} else if (filteredCountries.length > 1) {
		return (
			<ul>
				{filteredCountries.map((country, index) => (
					<li key={index}>
						<form onSubmit={(event) => onSearch(event, country.name.common)}>
							{country.name.common}
							<button type="submit">show</button>
						</form>
					</li>
				))}
			</ul>
		)
	} else if (filteredCountries.length === 1) {
		console.log('Ainoa maa: ', filteredCountries[0].name.common)
		console.log('Kielet:', filteredCountries[0].languages)
		console.log('Lippu: ', filteredCountries[0].flags)
		return (
			<div>	
				<h1>{filteredCountries[0].name.common}</h1>
				Capital {filteredCountries[0].capital}<br></br>
				Area {filteredCountries[0].area}<br></br>
				<h2>Languages</h2>
				<ul>					
					{Object.entries(filteredCountries[0].languages).map(([code, name]) => (
						<li key={code}>
							{name}
						</li>
					))}
				</ul><br></br>		
				<img src={Object.values(filteredCountries[0].flags)[0]} alt="Flag" />
				<h2>Weather in {filteredCountries[0].capital}</h2>
				<Weather capital={filteredCountries[0].capital}/>
			</div>
		)
	} 

}

export default Country