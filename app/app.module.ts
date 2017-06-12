import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { WeatherComponent } from './weather/components/weather.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        WeatherComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule
{

}