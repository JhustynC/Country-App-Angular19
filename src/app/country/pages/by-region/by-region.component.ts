import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../types/region.type';
import { ActivatedRoute, Router } from '@angular/router';


//Fuction for validate than query param is a Region
function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'country-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage {
  countryService = inject(CountryService);
  continents: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // Mapa de continentes a estilos de DaisyUI
  buttonStyles = {
    Africa: 'btn-warning',
    Americas: 'btn-primary',
    Asia: 'btn-secondary',
    Europe: 'btn-accent',
    Oceania: 'btn-info',
    Antarctic: 'btn-success',
  };
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

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

  selectContinent(continent: Region): void {
    this.query.set(continent);
  }

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      this.changeQueryParam(request.query);
      return await firstValueFrom(
        this.countryService.searchByRegion(request.query)
      );
    },
  });

  getButtonStyle(continent: string): string {
    return this.buttonStyles[continent as keyof typeof this.buttonStyles];
  }
}
