import { Component } from '@angular/core';

import { WeatherService } from './../services/weather.service';

import { Weather } from './../models/weather';

@Component({
    moduleId: module.id,
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent {

    pos: Position;
    weatherData = new Weather(null, null, null, null, null);

    constructor(private service: WeatherService) {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
                    .subscribe(weather => console.log(weather),
                    err => console.error(err));
            },
            err => console.error(err));
    }

}