import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = false; // Mock authentication state

  if (!isLoggedIn) {
    // In a real app, redirect to login page
    // router.navigate(['/login']);
    alert('Route Guard Activated: You must be logged in to access checkout.');
    return false;
  }
  
  return true;
};
