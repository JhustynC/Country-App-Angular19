import { Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'country-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPage {
  onSearch = (value: string) => {
    console.log(value);
  };
}
