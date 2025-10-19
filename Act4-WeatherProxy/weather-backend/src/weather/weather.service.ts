// src/weather/weather.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private apiKey = process.env.OPENWEATHERMAP_API_KEY;

  async getWeather(city: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
      const response = await axios.get(url);
      const data = response.data;

      return {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
      };
    } catch (error) {
      throw new HttpException(
        'City not found or API error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
