import { CanActivateFn, Router } from '@angular/router';

export const juryGuard: CanActivateFn = (route, state) => {
  const router = new Router;

  const role = localStorage.getItem('role');
  
  if (role === 'ROLE_JURY' || role === 'ROLE_MANAGER') {
    return true; 
 } else {
   return false;
 }

}
