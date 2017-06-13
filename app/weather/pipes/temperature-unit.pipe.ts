import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TemperatureUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string): number {
        switch(unitType)
        {
            case "far":
                const far = ((temp * 1.8) + 32);
                return far;
            default:
                return temp;
        }
    }
}