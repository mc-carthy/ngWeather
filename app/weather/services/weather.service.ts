import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {

    constructor() { }

    getCurrentLocation(): [number, number]
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ',', pos.coords.longitude); // TODO - Remove
                return [pos.coords.latitude, pos.coords.longitude];
            },
            err => console.error("Unable to get position - ", err));
        }
        else
        {
            console.error("Geolocation service not available with this browser");
            return [51.5, 0];
        }
    }
    
}