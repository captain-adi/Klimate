import { API_CONFIG } from "./confige";
import type { ICordinates, IForeCastData, IReverseGeoCode, IWeatherData } from "./type";

class Weather_API {
  private createURL(
    endpoint: string,
    params: Record<string, string | undefined>,
  ) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      units : API_CONFIG.units,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getCurrentWeatherData({
    lat,
    lon,
  }: ICordinates): Promise<IWeatherData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
     
    });
    return this.fetchData<IWeatherData>(url);
  }

  async getForeCast({ lat, lon }: ICordinates): Promise<IForeCastData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchData<IForeCastData>(url);
  }

  async reverseGeoCode({ lat, lon }: ICordinates):Promise<IReverseGeoCode[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchData<IReverseGeoCode[]>(url);
  }
  async searchLocation(query:string):Promise<IReverseGeoCode[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/direct`, {
     q: query,
     limit: "5",
    });
    return this.fetchData<IReverseGeoCode[]>(url);
  }
}

export const weatherAPI = new Weather_API(); 
