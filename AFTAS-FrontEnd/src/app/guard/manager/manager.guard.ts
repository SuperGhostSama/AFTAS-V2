import { CanActivateFn } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {

  const role = localStorage.getItem('role');
  if (role !== 'ROLE_MANAGER') {
    return false;
  }
  return true;
};
