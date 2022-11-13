import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../API";
import "./Search.css";

const Search = ({ onSearchChange, place }) => {
  const [search, setSearch] = useState(null);

  const placeSuggestions = inputValue => {
    if (inputValue) {
      return fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}&radius=20&distanceUnit=KM`,
        geoApiOptions
      )
        .then(response => response.json())
        .then(response => {
          return {
            options: response.data.map(city => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        })
        .catch(err => console.error(err));
    }
  };

  const handleOnChange = searchData => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoLocation => {
      console.log("Geolocation available.");

      onSearchChange({
        value: `${geoLocation.coords.latitude} ${geoLocation.coords.longitude}`,
      });
    });
  }, []);

  const customStyles = {
    input: provided => ({
      ...provided,
      cursor: "text",
      color: "rgba(255,255,255,0.8)",
    }),
    control: state => ({
      border: "1px solid rgb(255,255,255, 0.8)",
      borderRadius: "5px",
      color: "rgba(255,255,255,0.8)",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    menu: () => ({
      position: "absolute",
      width: "100%",
      color: "rgba(255,255,255,0.8)",
    }),
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? 'red' : 'blue',
      background: "rgb(0,0,0)",
      backdropFilter: "blur(5px)",
      opacity: state.isFocused ? "1" : "0.8",
      cursor: "pointer",
    }),
    singleValue: state => ({
      position: "absolute",
      paddingLeft: "10px",
    }),
  };

  return (
    <AsyncPaginate
      placeholder={place}
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={placeSuggestions}
      className="searchbar"
      classNamePrefix="searchbar"
      styles={customStyles}
      //loadingMessage
      //noOptionsMessage
    />
  );
};

export default Search;
