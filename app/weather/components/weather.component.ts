import { Component } from '@angular/core';

import { WeatherService } from './../services/weather.service';

@Component({
    moduleId: module.id,
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css' ],
    providers: [ WeatherService ]
})

export class WeatherComponent {
    
    constructor(private service: WeatherService) {
        this.service.getCurrentLocation();
    }

}