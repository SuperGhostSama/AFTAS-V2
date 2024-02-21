import { CanActivateFn } from '@angular/router';

export const juryGuard: CanActivateFn = (route, state) => {
  return true;
};
