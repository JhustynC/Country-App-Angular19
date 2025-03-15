import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-reponse.interfacet';
import {
  map,
  Observable,
  catchError,
  throwError,
  tap,
  delay,
  of,
  pipe,
} from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { createLinkedSignal } from '@angular/core/primitives/signals';
import { Region } from '../types/region.type';
import { ActivatedRoute } from '@angular/router';

const API_RUL = 'https://restcountries.com/v3.1';

const cacheQueryByCapital = new Map<string, Country[]>();
const cacheQueryByCountry = new Map<string, Country[]>();
const cacheQueryByRegion = new Map<Region, Country[]>();

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  constructor() {}

  cachingResponse(
    endpoint: string,
    query: string | Region, //* query can be string or Region
    countries: Country[]
  ) {
    switch (endpoint) {
      case 'capital':
        if (!cacheQueryByCapital.has(query)) {
          cacheQueryByCapital.set(query, countries);
        }
        break;
      case 'name':
        if (!cacheQueryByCountry.has(query)) {
          cacheQueryByCountry.set(query, countries);
        }
        break;
      case 'region':
        if (!cacheQueryByRegion.has(query as Region)) {
          cacheQueryByRegion.set(query as Region, countries);
        }
        break;
      default:
        break;
    }
  }

  private fetchRESTCountry(
    endpoint: 'capital' | 'name' | 'region',
    query: string
  ): Observable<Country[]> {
    // console.log('PRETICION');
    return this.http.get<RESTCountry[]>(`${API_RUL}/${endpoint}/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountriesToCountries(restCountries)
      ),
      tap((countries) => this.cachingResponse(endpoint, query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se puedo optener paises'));
      })
    );
  }

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // console.log(`Emitiendo valor ${query}`);
    // return of([]);

    console.log(cacheQueryByCapital.keys());
    if (cacheQueryByCapital.has(query)) {
      return of(cacheQueryByCapital.get(query) ?? []);
    }

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

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (cacheQueryByCountry.has(query)) {
      return of(cacheQueryByCountry.get(query) ?? []);
    }

    return this.fetchRESTCountry('name', query).pipe(delay(2000));

    // return this.http.get<RESTCountry[]>(`${API_RUL}/name/${query}`).pipe(
    //   delay(2000),
    //   map(CountryMapper.mapRestCountriesToCountries),
    //   catchError((error) => {
    //     console.log(`Error fetching data (byCountry): ${error.message}`);
    //     return throwError(() => new Error('No se pudo optener paises'));
    //   })
    // );
  }

  searchByRegion(query: Region): Observable<Country[]> {
    if (cacheQueryByRegion.has(query)) {
      return of(cacheQueryByRegion.get(query) ?? []);
    }
    const requestQuery = query.toLowerCase();
    return this.fetchRESTCountry('region', requestQuery);
  }

  searchByCountryAlphaCode(code: string): Observable<Country | undefined> {
    code = code.toLowerCase();

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
}
