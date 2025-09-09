import Search from "./Search";
import WeatherContent from "./WeatherContent";
import { WeatherProvider } from "../context/WeatherContext";
function WeatherPage() {
  return (
    <div className="md:h-[70%] md:w-[70%] w-screen shadow-xl rounded-md drop-shadow-amber-50 flex flex-col items-center gap-5 h-screen ">
      <WeatherProvider>
        <Search />
        <WeatherContent />
      </WeatherProvider>
    </div>
  );
}

export default WeatherPage;
