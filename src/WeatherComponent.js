import { useState } from 'react';

const WeatherComponent = () => {

	const heading = {
		padding: "10px",
		color: "#40E0D0",
	};

	const boldFont = {
		fontWeight: "bold",
	};

	const mockWeatherData = {
		'New York': {
			temperature: '22°C',
			humidity: '56%',
			windSpeed: '15 km/h'
		},
		'Los Angeles': {
			temperature: '27°C',
			humidity: '45%',
			windSpeed: '10 km/h'
		},
		'London': {
			temperature: '15°C',
			humidity: '70%',
			windSpeed: '20 km/h'
		},
	};

	const [searchCity, setSearchCity] = useState('');
	const [foundCity,setFoundCity] = useState({});
	const [searchFlag, setSearchFlag] = useState(false);
	const [prevCities, setPrevCities] = useState([]);

	const handleCitySearch = () =>{
		const citySearched = mockWeatherData[searchCity];
		if (citySearched) {
			setFoundCity(citySearched);
			if (!prevCities.includes(searchCity))
				setPrevCities([...prevCities, searchCity]);
		} else {
			setFoundCity({});
		}
		setSearchFlag(true);
	}	

	const handleCityChange = (city, clickFlag) => {
		setSearchCity(city);
		setFoundCity({});
		setSearchFlag(false);
		if (clickFlag) {
			handleCitySearch();
		}
	}

	return (
		<div className="container-xl">
			<h1 style={heading}>Weather Application</h1>
			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Type your city name..." value={searchCity} onChange={(e)=>handleCityChange(e.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"/>
				<button className="btn btn-outline-success" type="button" id="button-addon2" onClick={handleCitySearch}>Search</button>
			</div>
			{searchFlag && <div style={{color:"green"}}>
				{Object.keys(foundCity).length === 0 ? <div style={{color:"red"}}> City not found, try again. </div> : (
					<>
						<div>Temperature: <span style={boldFont}>{foundCity.temperature}</span></div>
						<div>Humidity: <span style={boldFont}>{foundCity.humidity}</span></div>
						<div>Wind Speed: <span style={boldFont}>{foundCity.windSpeed}</span></div>
					</>
				)}
			</div>}
		</div>
	);
}

export default WeatherComponent;
