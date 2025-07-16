import { Card, CardContent, CardTitle } from "../ui/card";
import { Sunrise, SunsetIcon, Compass, Pointer } from "lucide-react";
import type { IForeCastData } from "@/api/type";
import { format } from "date-fns";
interface IWeatherDetails {
  data: IForeCastData ;
  pressure: number ;
}

const WeatherDetails = ({ data, pressure }: IWeatherDetails) => {
 
    const weatherDetails = [
  {
    label: "Sunrise",
    value: data?.city.sunrise
      ? format(new Date(data.city.sunrise * 1000), "p")
      : "--",
    icon: <Sunrise className="text-orange-400" />,
  },
  {
    label: "Sunset",
    value: data?.city.sunset
      ? format(new Date(data.city.sunset * 1000), "p")
      : "--",
    icon: <SunsetIcon className="text-blue-400" />,
  },
  {
    label: "Wind Direction",
    value: data?.list[0].wind.deg !== undefined
      ? `${data.list[0].wind.deg}°`
      : "--",
    icon: <Compass className="text-green-400" />,
  },
  {
    label: "Pressure",
    value: data?.list[0].main.pressure !== undefined
      ? `${pressure} hPa`
      : "--",
    icon: <Pointer className="text-purple-400" />,
  },
];
   
  return (
    <Card className="h-fit"  >
    <CardTitle  className="ml-6">Weather Details</CardTitle>
    <CardContent >
      <div className="flex flex-col  gap-6">
        {/* Split array into chunks of 2 for 2-column grid */}
        {Array.from({ length: Math.ceil(weatherDetails.length / 2) }).map((_, i) => (
          <div key={i} className="grid grid-cols-2 gap-6">
            {weatherDetails.slice(i * 2, i * 2 + 2).map((item, index) => (
              <Card key={index}>
                <CardContent className="flex gap-5 items-center">
                  {item.icon}
                  <div className="flex flex-col">
                    {item.label}
                    <span>{item.value}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  );
};

export default WeatherDetails;
