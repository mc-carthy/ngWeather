import { Component, OnInit } from '@angular/core';

import { WeatherService } from './../services/weather.service';

import { Weather } from './../models/weather';

@Component({
    moduleId: module.id,
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {

    pos: Position;
    weatherData = new Weather(null, null, null, null, null);

    constructor(private service: WeatherService) { }

    ngOnInit()
    {
        this.getCurrentLocation();
    }

    getCurrentLocation()
    {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
            },
            err => console.error(err));
    }

    getCurrentWeather()
    {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"],
                console.log("Weather: ", this.weatherData); // TODO - Remove
            },
            err => console.error(err));
    }

}