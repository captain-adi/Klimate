import { Card, CardContent, CardTitle } from "../ui/card";
import { LineChart, ResponsiveContainer, XAxis, YAxis, Line, } from "recharts";
import type { IForeCastData } from "@/api/type";
import { format } from "date-fns";

const TodayTemp = ({ data }: { data: IForeCastData|undefined }) => {
  const chartData = data?.list?.slice(0, 8).map((item :  IForeCastData["list"][number]) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardTitle className="ml-6">Today's Temperature</CardTitle>
      <CardContent>
        <div className="h-[200px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart  data={chartData}>
            <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
            <Line type={"monotone"} dataKey={"temp"} stroke="#3e49e7" dot={false} strokeWidth={2}/>
            <Line type={"monotone"} dataKey={"feels_like"} stroke="#6b6b6d" dot={false} strokeWidth={2} strokeDasharray="4 4"/>
          </LineChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayTemp;
