import { useWeather } from "../context/WeatherContext";
import Spinner from "./Spinner";
function WeatherContent() {
  const { isLoading, weatherData, error } = useWeather();

  if (isLoading) return <Spinner />;
  if (!isLoading && Object.keys(weatherData).length === 0 && error)
    return (
      <div className=" w-full px-10 mx-auto  flex-1 flex justify-center">
        <h1 className="text-3xl font-bold tracking-wider block">{error}</h1>
      </div>
    );
  return (
    <div className=" w-full px-10 mx-auto  flex gap-5 flex-col items-center md:flex-row">
      {!isLoading && Object.keys(weatherData).length !== 0 && !error && (
        <>
          <div className=" sm:w-[30%]  text-center flex justify-between flex-col items-center rounded-md px-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-40 h-40"
            />
            <p className="font-bold text-xl">
              {weatherData.weather[0].description
                .split(" ")
                .toUpperCase()
                .join(" ")}
            </p>
          </div>

          <div className="rounded-md sm:w-50 text-center flex flex-col gap-5 pt-10">
            <h1 className="font-light text-4xl">{weatherData.name}</h1>
            <p className="font-light text-7xl">
              {Math.round(weatherData.main.temp)}&deg;
            </p>
            <div className="flex justify-around px-5 gap-5 md:gap-0">
              <p className="font_bold">
                H: {Math.round(weatherData.main.temp_max)}&deg;
              </p>
              <p>L:{Math.round(weatherData.main.temp_min)}&deg;</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:w-[50%] w-full">
            <SmallCard
              content={`${Math.round(weatherData.main.feels_like)}°`}
              title="Feels like"
            />
            <SmallCard content={weatherData.wind.speed} title="Wind Speed" />
            <SmallCard
              content={Math.round(weatherData.main.humidity)}
              title="Humidity"
            />
            <SmallCard
              content={Math.round(weatherData.main.feels_like)}
              title="Feels like"
            />
          </div>
        </>
      )}
    </div>
  );
}

function SmallCard({ content, title }) {
  return (
    <div className=" flex flex-col justify-around items-center">
      <p className="text-4xl">{content}</p>
      <p>{title}</p>
    </div>
  );
}
export default WeatherContent;
