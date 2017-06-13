import { Component } from '@angular/core';

import { WeatherService } from './../services/weather.service';

@Component({
    moduleId: module.id,
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent {

    constructor(private service: WeatherService) {
        this.service.getCurrentLocation();
        this.service.getCurrentWeather(51.5, 0)
            .subscribe(weather => console.log(weather),
            err => console.error(err));
    }

}