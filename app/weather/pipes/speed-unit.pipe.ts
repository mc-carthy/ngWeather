import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string): string {
        switch(unitType)
        {
            case "mph":
                const miles = Number(speed * 1.61).toFixed(0);
                return miles + " mph";
            default:
                return Number(speed).toFixed(0) + " kph";
        }
    }
}