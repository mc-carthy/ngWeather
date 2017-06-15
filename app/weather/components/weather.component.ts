import { Component, OnInit } from '@angular/core';

import { WeatherService } from './../services/weather.service';

import { Weather } from './../models/weather';

import "../js/skycons.js"

import { WEATHER_COLOURS } from './../constants/weather-colour-constants';

declare var Skycons: any; // Stops IDE complaining about lack of type for Skycon lib

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
    icons = new Skycons();
    dataReceived = false;

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
                this.setIcon();
                this.dataReceived = true;
            },
            err => console.error(err));
    }

    getLocationName ()
    {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                if (location["results"][3])
                {
                    this.currentLocation = location["results"][3]["formatted_address"];
                }
                else if (location["results"][1])
                {
                    this.currentLocation = location["results"][1]["formatted_address"];
                }
                else
                {
                    this.currentLocation = location["results"][0]["formatted_address"];                    
                }
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

    setIcon()
    {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object
    {
        if (this.weatherData.icon)
        {
            this.icons.color = WEATHER_COLOURS[this.weatherData.icon]["colour"];
            return WEATHER_COLOURS[this.weatherData.icon];
        }
        else
        {
            this.icons.color = WEATHER_COLOURS["default"]["colour"];
            return WEATHER_COLOURS["default"];
        }
    }

}