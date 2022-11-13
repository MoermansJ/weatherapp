import React from "react";

function Temperature({ props }) {
  const { currentDisplay, item } = props;

  switch (currentDisplay) {
    case "thermometer":
      return item.forecastToday.map((subItem, key = 0) => (
        <div className="test" key={key}>
          <div>{`${Math.round(subItem.main.temp - 273.1)}°C`}</div>
          <div>{`${subItem.dt_txt.substring(11, 16)} `}</div>
        </div>
      ));

    case "wind":
      return item.forecastToday.map((subItem, key = 0) => (
        <div className="test" key={key}>
          <div>{`${Math.round(subItem.wind.speed)} m/s`}</div>
          <img
            src="https://www.svgrepo.com/show/257734/up-arrow.svg"
            alt="wind direction"
            style={{ transform: `rotate(${subItem.wind.deg - 180}deg)` }}
            className="wind-direction"
          />
          <div>{`${subItem.dt_txt.substring(11, 16)} `}</div>
        </div>
      ));

    case "precipitation":
      return item.forecastToday.map((subItem, key = 0) => (
        <div className="test" key={key}>
          {/* <div>{`${subItem.weather[0].description}`}</div> */}
          <img
            src={`icons/${subItem.weather[0].icon}.png`}
            alt="precipitation icon"
            className="precipitation-icon"
          />
          <div>{`${subItem.dt_txt.substring(11, 16)} `}</div>
        </div>
      ));

    default:
      return "";
  }
}

export default Temperature;
