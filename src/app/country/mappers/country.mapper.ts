import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries-reponse.interfacet';

export class CountryMapper {
  static mapRestCountryToCountry = (restCountry: RESTCountry): Country => {
    return {
      cca2: restCountry.cca2,
      icon: restCountry.flag,
      flag: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No name',
      capital: restCountry.capital.join(', '),
      population: restCountry.population,
      demonyms: {
        eng: {
          f: restCountry.demonyms.eng.f,
          m: restCountry.demonyms.eng.m,
        },
        fra: {
          f: restCountry.demonyms.fra.f,
          m: restCountry.demonyms.fra.m,
        },
      },
      area: restCountry.area,
      idd: restCountry.idd,
    };
  };

  static mapRestCountriesToCountries = (
    restCountries: RESTCountry[]
  ): Country[] => {
    return restCountries.map(this.mapRestCountryToCountry);
  };
}
