import { createContext, useContext, useReducer } from "react";

const WeatherContext = createContext();
const apiKey = import.meta.env.VITE_WEATHER_KEY;
const initialState = {
  weatherData: {},
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false };
    case "weather/fetching":
      return { ...state, weatherData: action.payload };
    case "weather/fetched":
      return { ...state, error: "" };
    case "rejected":
      return { ...state, error: action.payload, weatherData: {} };
    default:
      break;
  }
}
function WeatherProvider({ children }) {
  const [{ weatherData, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getWeatherData(query) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();

      if (data.cod === "404") throw new Error("Not existing city");

      console.log(data);
      dispatch({ type: "weather/fetching", payload: data });
      dispatch({ type: "weather/fetched" });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    } finally {
      dispatch({ type: "loaded" });
    }
  }

  return (
    <WeatherContext.Provider
      value={{ weatherData, isLoading, error, getWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { WeatherProvider, useWeather };
