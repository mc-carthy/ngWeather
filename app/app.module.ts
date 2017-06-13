import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { WeatherComponent } from './weather/components/weather.component';

@NgModule({
    imports: [
        BrowserModule,
        JsonpModule
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