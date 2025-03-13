import { Routes } from '@angular/router';
import { CountryLayoutPageComponent } from './layouts/country-layout-page/country-layout-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPage } from './pages/by-country-page/by-country-page.component';
import { ByRegionPage } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const counteryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutPageComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPage,
      },
      {
        path: 'by-region',
        component: ByRegionPage,
      },
      {
        path: 'by/:country-code',
        component: CountryPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default counteryRoutes;
