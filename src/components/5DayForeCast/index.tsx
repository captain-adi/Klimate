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
  

  const dailyForecast = (data.list).slice(1, 6);
 const formatTemperature = (temp: number) => { return Math.floor(temp) + "°"; };
  return (
    <Card>
      <CardTitle className="ml-6">5-Day Forecast</CardTitle>
      <CardContent className="flex flex-col gap-4">
        {dailyForecast.map((forecasetData : IForeCastData["list"][0] , index: number) => (
          <Card key={index}>
            <CardContent className="flex justify-between ">
              <div>
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
        <Card></Card>
      </CardContent>
    </Card>
  );
};

export default FutureDaysForeCast;
