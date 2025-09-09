import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

function Search() {
  const [query, setQuery] = useState("");
  const { getWeatherData } = useWeather();
  function handleSearch() {
    if (!query) return;
    getWeatherData(query);
    setQuery("");
  }
  return (
    <div className="flex gap-5 w-[70%] flex-col pt-20 sm:flex-row">
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-3 flex-1 border-1 pl-3 rounded-sm "
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-10 py-2 rounded-sm "
      >
        Search
      </button>
    </div>
  );
}

export default Search;
