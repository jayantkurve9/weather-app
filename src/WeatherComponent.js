import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, KEY } from './constants';
import Spinner from './Spinner';

const WeatherComponent = () => {

	const heading = {
		padding: "10px",
		color: "#40E0D0",
	};

	const boldFont = {
		fontWeight: "bold",
	};

	const [searchCity, setSearchCity] = useState('');
	const [foundCity,setFoundCity] = useState({});
	const [searchFlag, setSearchFlag] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSearchClick = () => {
		if (searchCity.toLowerCase() !== foundCity.city)
			handleCitySearch();
	};

	const handleCitySearch = () => {
		if (!searchFlag && searchCity !== '') {
			setLoading(true);
		}
		console.log("Hello");
		if (searchCity !== '') {
			axios.get(`${BASE_URL}?key=${KEY}&q=${searchCity}&aqi=no`)
			.then((res) => {
				const weatherData = res?.data;
				if (weatherData?.location?.name?.toLowerCase() !== searchCity?.toLowerCase()) {
					throw new Error("City not found, try again.");
				}
				setFoundCity({
					temperature: weatherData?.current?.temp_c,
					humidity: weatherData?.current?.humidity,
					windSpeed: weatherData?.current?.wind_kph,
					city: weatherData?.location?.name?.toLowerCase()
				});
				setErrorMessage('');
			}).catch((err) => {
				setErrorMessage(err.message);
				setFoundCity({
					city: searchCity.toLowerCase()
				});
			}).finally(()=> {
				setSearchFlag(true);
				setLoading(false);
			});
		} else {
			setSearchFlag(true);
			setErrorMessage("Please enter valid city name.");
		}
	}	

	const handleCityChange = (city) => {
		setSearchCity(city);
		setSearchFlag(false);
	};

	return (
		<div className="container-xl">
			<h1 style={heading}>Weather Application</h1>
			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Type your city name..." value={searchCity} onChange={(e)=>handleCityChange(e.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"/>
				<button className="btn btn-outline-success" type="button" id="button-addon2" onClick={handleSearchClick}>Search</button>
			</div>
			{searchFlag &&
				<div style={{color:"green"}}>
					{errorMessage !== '' ? <div style={{color:"red"}}>{errorMessage}</div> : (
						<>
							<div>Temperature: <span style={boldFont}>{foundCity.temperature}</span></div>
							<div>Humidity: <span style={boldFont}>{foundCity.humidity}</span></div>
							<div>Wind Speed: <span style={boldFont}>{foundCity.windSpeed}</span></div>
						</>
					)}
				</div>}
			{loading && <Spinner/>}
		</div>
	);
}

export default WeatherComponent;
