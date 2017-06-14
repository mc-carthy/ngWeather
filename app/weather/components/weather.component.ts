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
    currentLocation = "";
    currentSpeedUnit = "kph";
    currentTempUnit = "C";

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
                this.getLocationName();
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

    getLocationName ()
    {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                this.currentLocation = location["results"][3]["formatted_address"];
                console.log(location); // TODO - Remove
            })
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleWindUnits();
    }

    toggleTempUnits()
    {
        if (this.currentTempUnit == "F")
        { 
            this.currentTempUnit = "C";
        } 
        else if (this.currentTempUnit == "C")
        {
            this.currentTempUnit = "F";
        }
    }

    toggleWindUnits()
    {
        if (this.currentSpeedUnit == "mph")
        { 
            this.currentSpeedUnit = "kph";
        } 
        else if (this.currentSpeedUnit == "kph")
        {
            this.currentSpeedUnit = "mph";
        }
    }

}