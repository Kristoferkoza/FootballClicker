import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clubName',
  standalone: true,
})
export class ClubNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}
