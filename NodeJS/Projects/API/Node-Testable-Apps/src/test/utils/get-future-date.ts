
/* 
* Recives "2023-08-10" and returns "2024-08-10"
*/

import { parseISO, setYear } from 'date-fns';

export function getFutureDate(date: string) {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}