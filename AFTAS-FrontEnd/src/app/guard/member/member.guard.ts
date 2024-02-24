import { CanActivateFn } from '@angular/router';

export const memberGuard: CanActivateFn = (route, state) => {

  const role = localStorage.getItem('role');
  if (role !== 'ROLE_MEMBER') {
    return false;
  }
  return true;
};
