import { Pipe, PipeTransform } from '@angular/core'; 
import { formatDate } from '@angular/common';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform { 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, ...args: unknown[]): string | null {
    if (!value) return null;

    const date = new Date(value);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMin < 1) {
      return 'just now';
    } else if (diffInMin === 1) {
      return 'a minute ago';
    } else if (diffInMin < 60) {
      return ('minutes ago'+ { minutes: diffInMin });
    } else if (diffInHours === 1) {
      return 'an hour ago';
    } else if (diffInHours < 24) {
      return ('hours ago'+{ hours: diffInHours });
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else if (diffInDays < 7) {
      return ('days ago'+ { days: diffInDays });
    } else if (diffInDays < 14) {
      return 'a week ago';
    } else if (diffInDays < 30) {
      return ( 'weeks ago'+ { weeks: Math.floor(diffInDays / 7) });
    } else {
      return formatDate(date, 'dd/MM/yyyy', 'en-US');
    }
  }
}
