

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getCurrentLocation(): Promise<{
    latitude: number;
    longitude: number;
  }> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(

        position => {

          resolve({

            latitude: position.coords.latitude,

            longitude: position.coords.longitude
          });
        },

        error => reject(error)
      );
    });
  }

  async getCity(
    latitude: number,
    longitude: number
  ): Promise<any> {
  
    return await this.http
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      .toPromise();
  }

  
}