import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries-reponse.interfacet';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  //* Funcion para cambiar un query param del URL
  //* Para poder compartir el link y que vean lo mismo que tu
  //? En pocas palabras tenemos que usar la navegacion ya que editar la ruta es "cambiar" de ruta
  changeQueryParam(value: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: value },
    });
  }
  /**
   * @description This function is used to change the query parameter in the URL.
   * @param {string} value - The value to be set in the query parameter.
   * @returns {void}
   */

  //* Request with RxJS Operator
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log(request.query);
      if (!request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    },
  });

  //* Request with Promise
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // async toastActive(value: string) {
  //   this.isError.set(value);
  //   await setInterval(() => {
  //     console.log('que passoooo');
  //     this.isError.set(null);
  //   }, 5000);
  // }

  // onSearch(value: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     complete: () => console.log(''),
  //     error: async (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       await this.toastActive(err.message);
  //     },
  //   });
  // }
}
