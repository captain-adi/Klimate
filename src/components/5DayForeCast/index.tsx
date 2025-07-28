import type { IForeCastData } from "@/api/type";
import { Card, CardContent, CardTitle } from "../ui/card";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { MdWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { format } from "date-fns";
interface IFutureDaysForeCast {
  data: IForeCastData;
}

const FutureDaysForeCast = ({ data }: IFutureDaysForeCast) => {
  

  // Group forecasts by day and pick the first entry for each day
  const getDailyForecast = (list: IForeCastData["list"]) => {
    const daysMap = new Map<string, typeof list[0]>();
    list.forEach((item) => {
      const dateStr = format(new Date(item.dt * 1000), "yyyy-MM-dd");
      if (!daysMap.has(dateStr)) {
        daysMap.set(dateStr, item);
      }
    });
    // Return the first 5 unique days (skip today if you want future only)
    return Array.from(daysMap.values()).slice(0, 5);
  };
  const dailyForecast = getDailyForecast(data.list);
  const formatTemperature = (temp: number) => { return Math.floor(temp) + "°"; };
  return (
    <Card>
      <CardTitle className="ml-6">5-Day Forecast</CardTitle>
      <CardContent className="flex flex-col gap-4">
        {dailyForecast.map((forecasetData : IForeCastData["list"][0] , index: number) => (
          <Card key={index}>
            <CardContent className="flex flex-col  items-center gap-5 sm:flex-row sm:justify-between">
              <div className="flex gap-2.5 sm:gap-0 sm:flex-col">
                <div>
                  {format(new Date(forecasetData.dt * 1000), "EEE, LLL d")}
                </div>
                <div className="text-muted-foreground">{forecasetData.weather[0].description}</div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="text-blue-400 flex   items-center gap-2">
                  <GoArrowDown className="h-3 w-3 " />{" "}
                  {formatTemperature(forecasetData.main.temp_min)}
                </div>
                <div className="text-red-400 flex   items-center gap-1">
                  <GoArrowUp className="h-3 w-3  " />
                  {formatTemperature(forecasetData.main.temp_max)}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MdWaterDrop className="text-blue-400" />
                  {forecasetData.main.humidity}%
                </div>
                <div className="flex items-center gap-2">
                  <FaWind className="text-blue-400" />
                  {forecasetData.wind.speed}m/s
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default FutureDaysForeCast;
