import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { CountryUiInformationComponent } from "./country-ui-information/country-ui-information.component";

@Component({
  selector: 'country-country-page',
  imports: [NotFoundComponent, CountryUiInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  // route = inject(ActivatedRoute);
  // countryCode = signal<string>('');

  // ngOnInit() {
  //   this.route.paramMap.subscribe((params) => {
  //     this.countryCode.set(params.get('country-code') || '');
  //     console.log('Country Tag:', this.countryCode());
  //   });
  // }

  //? ActivateRoute tiene la informacion de la ruta activa
  //? Snapshot me permite optener la inforamcion de la ruta en un instante de tiempo (now)
  //! PERO: No es reactivo, osea que si no cambiamos la ruta directamente no veremos reflejado el cambio
  //! A menos que nosotros nos salgamos de la ruta y volvamos a ella
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('country-code');

  countryResorce = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchByCountryAlphaCode(request.code!);
    },
  });
}
