import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT } from './../constants/constants';

@Injectable()
export class WeatherService {

    constructor(private jsonp: Jsonp) { }

    getCurrentLocation(): [number, number] {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ',', pos.coords.longitude); // TODO - Remove
                return [pos.coords.latitude, pos.coords.longitude];
            },
                err => console.error("Unable to get position - ", err));
        }
        else {
            console.error("Geolocation service not available with this browser");
            return [51.5, 0];
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + '/' + lat + ',' + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
            .map(res => res.json())
            .catch(err => {
                console.error("Unable to retrieve weather data - ", err);
                return Observable.throw(err.json());
            });
    }

}