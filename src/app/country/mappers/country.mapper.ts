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
    };
  };

  static mapRestCountriesToCountries = (
    restCountries: RESTCountry[]
  ): Country[] => {
    return restCountries.map(this.mapRestCountryToCountry);
  };
}
