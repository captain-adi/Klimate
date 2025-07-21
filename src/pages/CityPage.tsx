import FutureDaysForeCast from "@/components/5DayForeCast";
import CurrentWeather from "@/components/currentWeather";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import TodayTemp from "@/components/TodayTemp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weatherDetails";

import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";

import { IoMdAlert } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const country = searchParams.get("country") || "";
  const params = useParams();
  const cordinates = { lat, lon };
  const weather = useWeatherQuery(cordinates);
  const forecast = useForecastQuery(cordinates);

  if (!weather.data || !forecast.data) {
    return <h1>no data found...</h1>;
  }
  if (forecast.error || weather.error) {
    return (
      <Alert variant="destructive">
        <IoMdAlert />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>fail to load the weather data</p>
        </AlertDescription>
      </Alert>
    );
  }
  if (weather.isLoading || forecast.isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold  text-3xl tracking-tight flex gap-2">{params.city} , <span>{country}</span></h1>
      </div>
      {/* current and hourly weather  */}
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4 ">
          <CurrentWeather data={weather.data} />
          <TodayTemp data={forecast.data} />
        </div>
        <div className="grid lg:grid-cols-2 gap-6  ">
          <WeatherDetails
            data={forecast.data}
            pressure={weather.data?.main.pressure}
          />
          <FutureDaysForeCast data={forecast.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
