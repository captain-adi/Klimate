import App from "@/App";
import CityPage from "@/pages/CityPage";
import WeatherDashboard from "@/pages/WeatherDashboard";
import { createBrowserRouter } from "react-router-dom";

export const route = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : '/',
                element : <WeatherDashboard/>
            },
            {
                path : "/city/:city",
                element : <CityPage/>
            }
        ]
    }
])