export default function Tdayw({ date, temp, icon, description }) {
    return (
        <div className="tdayw-container">
            <h3 className="time-label date-label">{date}</h3>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Weather Icon"
                className="weather-icon"
            />
            <h3 className="time-label temp-label">{temp}°C</h3>
            <p className="description">{description}</p>
        </div>
    );
}
