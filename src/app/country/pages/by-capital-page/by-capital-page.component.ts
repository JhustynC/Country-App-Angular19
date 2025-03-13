import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries-reponse.interfacet';
import { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(value: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(value).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
      console.log(countries);
    });
  }
}
