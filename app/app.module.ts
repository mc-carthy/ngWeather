import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { WeatherComponent } from './weather/components/weather.component';

import { SpeedUnitPipe } from './weather/pipes/speed-unit.pipe';
import { TemperatureUnitPipe } from './weather/pipes/temperature-unit.pipe';

@NgModule({
    imports: [
        BrowserModule,
        JsonpModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        WeatherComponent,
        SpeedUnitPipe,
        TemperatureUnitPipe
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule
{

}