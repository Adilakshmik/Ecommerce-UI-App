import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),RouterModule]
};
