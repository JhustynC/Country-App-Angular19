import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries-reponse.interfacet';

export class CountryMapper {
  static mapRestCountryToCountry = ({
    cca2,
    flag,
    flags,
    translations,
    capital,
    population,
    demonyms,
    area,
    idd,
  }: RESTCountry): Country => ({
    cca2,
    icon: flag,
    flag: flags.svg,
    name: translations?.['spa']?.common ?? 'No name',
    capital: capital?.join(', ') ?? 'No capital',
    population,
    demonyms: {
      eng: {
        f: demonyms?.eng?.f ?? 'No demonym',
        m: demonyms?.eng?.m ?? 'No demonym',
      },
      fra: {
        f: demonyms?.fra?.f ?? 'No demonym',
        m: demonyms?.fra?.m ?? 'No demonym',
      },
    },
    area,
    idd,
  });

  static mapRestCountriesToCountries = (
    restCountries: RESTCountry[]
  ): Country[] => {
    return restCountries.map(this.mapRestCountryToCountry);
  };
}
