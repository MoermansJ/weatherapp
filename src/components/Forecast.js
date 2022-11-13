import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import BatteryWarning from "./BatteryWarning";
import "./Forecast.css";
import ForecastPanel from "./ForecastPanel";

const Forecast = ({ forecast, date }) => {
  const [currentDisplay, setCurrentDisplay] = useState("thermometer");
  const [currentExpanded, setCurrentExpanded] = useState(0);
  const prevDisplay = useRef();
  const prevExpanded = useRef();
  const today = date.getDay();
  const forecastDays = [];
  const extremeTempDays = [];
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < forecast.forecastResponse.list.length; i++) {
    if (i % 8 === 0 || i === forecast.forecastResponse.list.length - 1) {
      forecastDays.push(forecast.forecastResponse.list[i]);
    }

    if (
      forecast.forecastResponse.list[i].main.temp - 273.15 < 1 ||
      forecast.forecastResponse.list[i].main.temp - 273.15 > 39
    ) {
      extremeTempDays.push(forecast.forecastResponse.list[i].dt_txt);
    }
  }

  for (let i = 0; i < forecastDays.length; i++) {
    const forecastByDay = [];
    const extremeTempByDay = [];

    for (let j = 0; j < forecast.forecastResponse.list.length; j++) {
      if (
        forecast.forecastResponse.list[j].dt_txt.substring(0, 10) ===
        forecastDays[i].dt_txt.substring(0, 10)
      ) {
        forecastByDay.push(forecast.forecastResponse.list[j]);
      }
    }
    forecastDays[i].forecastToday = forecastByDay;

    if (extremeTempDays.length > 0) {
      for (let j = 0; j < extremeTempDays.length; j++) {
        if (
          forecastDays[i].dt_txt.substring(0, 10) ===
          extremeTempDays[j].substring(0, 10)
        ) {
          extremeTempByDay.push(extremeTempDays[j]);
        }
      }
      forecastDays[i].extremeTempList = extremeTempByDay;
    }
  }

  const removeActive = () => {
    if (prevDisplay.current) {
      document
        .getElementById(`${prevDisplay.current}-${prevExpanded.current}`)
        .classList.remove("active");
    }
  };

  const handleClick = e => {
    if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      setCurrentDisplay(e.target.alt.substring(0, e.target.alt.length - 5));
    }
  };

  useEffect(() => {
    removeActive();
    prevExpanded.current = currentExpanded;

    document
      .getElementById(`${currentDisplay}-${currentExpanded}`)
      .classList.add("active");
  }, [currentExpanded]);

  useEffect(() => {
    removeActive();
    prevDisplay.current = currentDisplay;
  }, [currentDisplay]);

  useEffect(() => {
    document
      .getElementById(`${currentDisplay}-${currentExpanded}`)
      .classList.add("active");
  }, []);

  return (
    <div>
      <Accordion
        preExpanded={[0]}
        onChange={uuid => setCurrentExpanded(uuid)}
        className="forecast"
      >
        {forecastDays.map((item, key = 0) => (
          <AccordionItem key={key} className="forecast__item" uuid={key}>
            <AccordionItemHeading>
              <AccordionItemButton
                className="forecast__title"
                id={`forecast__title-${key}`}
              >
                <div className="forecast__titleLeft">
                  <p>
                    {today + key < 7
                      ? week[today + key]
                      : week[today + key - 7]}
                  </p>
                  <BatteryWarning extremeTempList={item.extremeTempList} />
                </div>
                <div className="forecast-iconSet">
                  <img
                    src="https://www.svgrepo.com/show/318167/weather-temperature.svg"
                    alt="thermometer icon"
                    className="forecast-icon"
                    id={`thermometer-${key}`}
                    onClick={handleClick}
                  />

                  <img
                    src="https://www.svgrepo.com/show/381335/weather-wind.svg"
                    alt="wind icon"
                    className="forecast-icon"
                    id={`wind-${key}`}
                    onClick={handleClick}
                  />

                  <img
                    src="https://www.svgrepo.com/show/318160/weather-drop.svg"
                    alt="precipitation icon"
                    className="forecast-icon"
                    id={`precipitation-${key}`}
                    onClick={handleClick}
                  />
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="forecast__Itempanel">
              <div className="forecast__panel">
                <ForecastPanel
                  props={{ currentDisplay, item }}
                  setCurrentDisplay={setCurrentDisplay}
                />
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
