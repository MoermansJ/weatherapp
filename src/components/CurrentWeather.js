import "./CurrentWeather.css";

const CurrentWeather = ({ currentWeather }) => {
  const w = currentWeather.weatherResponse;

  return (
    <div className="weather">
      <div className="top">
        <p className="temperature">
          {Math.round(w.main.temp - 273.15)}
          {"°C"}
        </p>
        <p className="weather-description">{w.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
