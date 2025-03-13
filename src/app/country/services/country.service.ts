import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-reponse.interfacet';
import { map, Observable } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_RUL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  constructor() {}

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_RUL}/capital/${query}`).pipe(
      map((restCountries) => {
        const countries =
          CountryMapper.mapRestCountriesToCountries(restCountries);
        return countries;
      })
    );
  }
}
