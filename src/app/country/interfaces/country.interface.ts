export interface Country {
  cca2: string;
  icon: string;
  flag: string;
  name: string;
  capital: string;
  population: number;
  demonyms: CountryDemonyms;
  area: number;
  idd: {
    root: string;
    suffixes: string[];
  };
}

export interface CountryDemonyms {
  eng: EngDemonyms;
  fra: EngDemonyms;
}

export interface EngDemonyms {
  f: string;
  m: string;
}
