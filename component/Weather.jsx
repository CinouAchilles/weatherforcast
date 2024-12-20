import { useEffect, useState } from "react";
import Tdayw from "./Tdayw";
import axios from "axios";
import moment from "moment";
import NavB from '../component/NavB';
import toast, { Toaster } from 'react-hot-toast';



export default function Weather({func2}) {
    const tempObj = {
        tempGlobal: 0,
        maxtemp: 0,
        mintemp: 0,
        humidity: 0,
        windspeed: 0,
        weathertype: "",
        sunrise: 0,
        sunset: 0,
        lastupdatetime: 0,
        cityname: "",
        icon: "",
    };


    const [temp, updatetemp] = useState(tempObj);
    const [time, updatetime] = useState("");
    const [loading, setLoading] = useState(true);
    const [forecastData, setForecastData] = useState([]); // State for forecast data
    let [cityy, upcityy] = useState("annaba");
    
    let funhelp = (dataa) => {
        upcityy(dataa);
    }

    useEffect(() => {
        updatetime(moment().format("dddd, MMMM Do YYYY"));

        // Create separate cancel tokens for each request
        const weatherSource = axios.CancelToken.source();
        const forecastSource = axios.CancelToken.source();

        setLoading(true);

        // Fetch weather and forecast data in parallel
        Promise.all([
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&appid=1cb2cfe8ceb2e2ec998c42718f0df9ed`,
                { cancelToken: weatherSource.token }
            ),
            axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityy}&appid=1cb2cfe8ceb2e2ec998c42718f0df9ed`,
                { cancelToken: forecastSource.token }
            ),
        ])
            .then(([weatherRes, forecastRes]) => {
                const weatherdata = weatherRes.data;
                const forecastdata = forecastRes.data;

                // Process weather data
                const temp1 = Math.round(weatherdata.main.temp - 273.15);
                const tempmax = Math.round(weatherdata.main.temp_max - 273.15);
                const tempmin = Math.round(weatherdata.main.temp_min - 273.15);
                const humd = weatherdata.main.humidity;
                const wind = weatherdata.wind.speed * 3.6;
                const typew = weatherdata.weather[0].description;
                const icon1 = weatherdata.weather[0].icon;
                const sunriseDate = new Date(weatherdata.sys.sunrise * 1000);
                const sunsetDate = new Date(weatherdata.sys.sunset * 1000);
                const dtDate = new Date(1733121787 * 1000); // Example date
                const city = weatherdata.name;

                // Update state with processed data
                updatetemp({
                    ...temp,
                    tempGlobal: temp1,
                    maxtemp: tempmax,
                    mintemp: tempmin,
                    humidity: humd,
                    windspeed: wind,
                    weathertype: typew,
                    sunrise: sunriseDate,
                    sunset: sunsetDate,
                    lastupdatetime: dtDate,
                    cityname: city,
                    icon: icon1,
                });
                console.log("5-day Forecast:", forecastdata);
                // Generate forecast elements using map
                // Process forecast data
                const forecastElements = forecastdata.list.map((day, index) => {
                    return (
                        <Tdayw
                            key={index}
                            date={day.dt_txt} // Assuming 'dt_txt' contains the date as a string
                            temp={Math.round(day.main.temp - 273.15)} // Convert Kelvin to Celsius
                            icon={day.weather[0].icon} // Pass the weather icon
                            description={day.weather[0].description}
                        />
                    );
                });

                // Update state with forecast data
                setForecastData(forecastElements);

                
                setLoading(false);
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching data:", error);
                    toast.error("This didn't work.",{
                        duration: 4000,
                        position: 'right',
                })

                }
                setLoading(false);
            });

        // Cleanup function to cancel requests
        return () => {
            weatherSource.cancel("Weather request canceled");
            forecastSource.cancel("Forecast request canceled");
        };
    }, [cityy ]);
    useEffect(()=>{
        func2(temp.weathertype);
    })
    

   
    // Show loader while data is loading
    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading weather data...</p>
            </div>
        );
    }

    // Render weather data
    return (
        <>
            <Toaster />

            <NavB currentcity={cityy} fun={funhelp} />


            <div className="weather-container">

                <div className="country">
                    <h2 className="text-4xl">{temp.cityname}</h2>
                    <h4 className="timenow">{time}</h4>
                </div>
                <div className="flex gap-6 items-center justify-around flex-wrap">
                    <div className="sizing">
                        <h1 className="temperature shadow-text">{temp.tempGlobal}°</h1>
                        <div className="temp-range">
                            <span className="min-temp">
                                Min: <strong>{temp.mintemp}°C</strong>
                            </span>
                            <span className="max-temp">
                                Max: <strong>{temp.maxtemp}°C</strong>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sizing">
                        <div className="location">
                            <img
                                className="w-24 h-24 weather-icon"
                                src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                                alt={temp.description}
                            />
                            <h4 className="weather-desc">{temp.weathertype.toUpperCase()}</h4>
                        </div>
                    </div>

                    <div className="details sizing">
                        <h3 className="text-xl font-bold text-yellow-300 mb-3">Additional Info</h3>
                        <div className="detail-items">
                            <div className="detail-item">
                                <h4>Wind Speed</h4>
                                <p>{temp.windspeed.toFixed(2)} km/h</p>
                            </div>
                            <div className="detail-item">
                                <h4>Humidity</h4>
                                <p>{temp.humidity}%</p>
                            </div>
                            <div className="detail-item">
                                <h4>Sunrise</h4>
                                <p>{temp.sunrise.toLocaleString()}</p>
                            </div>
                            <div className="detail-item">
                                <h4>Sunset</h4>
                                <p>{temp.sunset.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 w-5/6 outtdayw">

                    {forecastData}
                </div>
            </div>
        </>
    );
}
