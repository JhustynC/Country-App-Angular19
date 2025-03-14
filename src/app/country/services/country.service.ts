import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-reponse.interfacet';
import { map, Observable, catchError, throwError, tap, delay } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_RUL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  constructor() {}

  private fetchRESTCountry(
    endpoint: 'capital' | 'name' | 'region',
    query: string
  ): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(`${API_RUL}/${endpoint}/${query}`).pipe(
      map((restCountries) => {
        const countries =
          CountryMapper.mapRestCountriesToCountries(restCountries);
        return countries;
      }),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se puedo optener paises'));
      })
    );
  }

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.fetchRESTCountry('capital', query);
    // return this.http.get<RESTCountry[]>(`${API_RUL}/capital/${query}`).pipe(
    //   map((restCountries) => {
    //     const countries =
    //       CountryMapper.mapRestCountriesToCountries(restCountries);
    //     return countries;
    //   }),
    //   catchError((error) => {
    //     console.log('Error fetching', error);
    //     return throwError(() => new Error('No se puedo optener paises'));
    //   })*
    // );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    // return this.fetchRESTCountry('name', query);
    return this.http.get<RESTCountry[]>(`${API_RUL}/name/${query}`).pipe(
      delay(2000),
      map(CountryMapper.mapRestCountriesToCountries),
      catchError((error) => {
        console.log(`Error fetching data (byCountry): ${error.message}`);
        return throwError(() => new Error('No se pudo optener paises'));
      })
    );
  }

  searchByCountryAlphaCode(code: string) {
    code = code.toLowerCase();
    // return this.fetchRESTCountry('name', query);
    return this.http.get<RESTCountry[]>(`${API_RUL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountriesToCountries),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log(`Error fetching data (byAlphaCode): ${error.message}`);
        return throwError(
          () => new Error('No se pudo optener informacion del pais')
        );
      })
    );
  }

  searchByRegion(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.fetchRESTCountry('region', query);
  }
}
