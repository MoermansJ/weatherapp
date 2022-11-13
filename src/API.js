import { createClient } from "pexels";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1b20f93fdemshfdf46b62fe817acp146189jsne36229a5b307",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
// export const WEATHER_API_KEY = "d9a97fe094d4f6b7f5dd2467f6218d3d"; //BLOCKED ERROR 429 => unblocked 01112022!
export const WEATHER_API_KEY = "caf4f8823ece1c96a921d445a4effb90"; //BACKUP KEY

const IMAGE_API_KEY =
  "563492ad6f917000010000018d5283b97cf1468b8bb4befbc20dffd5";
// const IMAGE_API_KEY = "563492ad6f917000010000011412cfa9c8b94b7fb6a84247926e20ef" //BLOCKED ERROR 429 02112022
export const IMAGE_API_CLIENT = createClient(IMAGE_API_KEY); //Pexels
// All requests made with the client will be authenticated
