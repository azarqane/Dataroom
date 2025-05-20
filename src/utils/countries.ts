import { countries } from 'countries-list';

export const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: code,
  label: country.name,
  continent: country.continent,
  languages: country.languages,
}));

export const continents = {
  AF: 'Afrique',
  AN: 'Antarctique',
  AS: 'Asie',
  EU: 'Europe',
  NA: 'Amérique du Nord',
  OC: 'Océanie',
  SA: 'Amérique du Sud'
};