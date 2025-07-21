export interface ICordinates {
  lat: number;
  lon: number;
}
export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWeatherData {
  coord: ICordinates;
  weather: IWeatherCondition[];
  main: IMain;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  name: string;
  dt: number;
}

export interface IForeCastData {
  list: Array<{
    dt: number;
    main: IWeatherData["main"];
    weather: IWeatherData["weather"];
    wind: IWeatherData["wind"];
  }>;
  city: {
    id: number;
    name: string;
    coord: ICordinates;
    country?: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
  };
}

export interface IReverseGeoCode{
    name : string,
    local_names?:    Record<string,string>
    lat : number,
    lon: number,
    country? :string,
     state : string,
}