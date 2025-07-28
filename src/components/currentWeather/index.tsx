import type { IReverseGeoCode, IWeatherData } from "@/api/type";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { FaWind } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
interface ICurrentWeatherData {
  data: IWeatherData | undefined;
  location?: IReverseGeoCode | undefined;
}

const CurrentWeather: React.FC<ICurrentWeatherData> = ({ data, location }) => {

  const formattedTemp = (temp: number | undefined) => {
    if (temp === undefined) return "N/A";
  return `${Math.round(temp)}°`;
  };
  return (
    <div>
      <Card className="h-full">
        <CardContent className="grid grid-cols-2 gap-5  ">
          <div className="flex flex-col justify-between">
            <div className="flex align-center gap-2 ">
              <div className="text-xl font-bold">{location?.name}{" "}</div>
              <span className="text-muted-foreground">{location?.state}</span>
            </div>
            <div className="mt-3 self-start">{location?.country}</div>
            <div className="flex flex-col sm:flex-row mt-3">
              <span className="text-7xl self-start font-bold tracking-tight">
                {formattedTemp(data?.main.temp)}
              </span>
              <div className=" flex flex-col  sm:ml-4">
                <span className="text-muted-foreground self-start">
                  Feels like {formattedTemp(data?.main.temp)}
                </span>
                <div className="flex gap-2">
                  <span className="flex justify-center items-center text-blue-400">
                    <GoArrowUp className="h-3 w-3" />{" "}
                    {formattedTemp(data?.main.temp)}
                  </span>
                  <span className="flex justify-center items-center text-red-400">
                    <GoArrowDown className="h-3 w-3" />{" "}
                    {formattedTemp(data?.main.temp)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-9 gap-7">
              <div className="flex  gap-4 items-center">
                <MdWaterDrop className="text-blue-400" />
                <div className="flex flex-col">
                  <div>Humidity</div>
                  <div className="text-muted-foreground">
                    {data?.main.humidity}
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 items-center">
                <FaWind className="text-blue-400" />
                <div className="flex flex-col">
                  <div>WindSpeed</div>
                  <div className="text-muted-foreground">
                    {data?.wind.speed} <span>m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  h-fit">
          <img
  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
  alt={data?.weather[0].description || "weather icon"}
/>
            <div className="text-muted-foreground text-center">{data?.weather[0].description}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
