import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'num2bool'})
export class Num2BoolPipe implements PipeTransform {
  transform(value: number): boolean {
    return value > 0;
  }
}