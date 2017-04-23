import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatBool'})
export class FormatBoolPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? "Aktiviert" : "Deaktiviert";
  }
}