import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completed'
})
export class CompletedPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    if (value) {
      return "Completed"
    } else {
      return "Not completed"
    }
  }

}
