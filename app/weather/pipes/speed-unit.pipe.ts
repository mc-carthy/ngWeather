import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string): string {
        switch(unitType)
        {
            case "mph":
                const miles = speed * 1.61;
                return miles + " mph";
            default:
                return speed + " kph";
        }
    }
}