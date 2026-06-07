/**
 * Represents a country returned from the proxy API.
 * @example
 * {
 *   alpha2Code: "HR",
 *   alpha3Code: "HRV",
 *   name: "Croatia",
 *   capital: "Zagreb",
 *   population: 4047200,
 *   region: "Europe"
 * }
 */
export type Countries = {
    /** ISO 3166-1 alpha-2 two-letter country code. Example: "HR" */
    alpha2Code: string;
    /** ISO 3166-1 alpha-3 three-letter country code. Example: "HRV" */
    alpha3Code: string;
    /** Alternative spellings of the country name. Example: ["HR", "Hrvatska", "Republic of Croatia"] */
    altSpellings: string[];
    /** Total area in square kilometers. Example: 56594 */
    area: number;
    /** List of alpha3 codes of bordering countries. Example: ["BIH", "HUN", "MNE", "SRB", "SVN"] */
    borders: string[];
    /** International calling codes. Example: ["385"] */
    callingCodes: string[];
    /** Capital city name. Example: "Zagreb" */
    capital: string;
    /** IOC (International Olympic Committee) country code. Example: "CRO" */
    cioc: string;
    /** List of currencies used in the country. */
    currencies: CountryCurrency[];
    /** Noun for a person from this country. Example: "Croatian" */
    demonym: string;
    /** URL to the country's flag image. */
    flag: string;
    /** Flag image URLs in PNG and SVG formats. */
    flags: {
        /** URL to PNG flag. */
        png: string;
        /** URL to SVG flag. */
        svg: string;
    };
    /** Whether the country is independent. Example: true */
    independent: boolean;
    /** Official languages spoken in the country. */
    languages: CountryLanguage[];
    /** Latitude and longitude coordinates. Example: [45.1, 15.2] */
    latlng: [number, number];
    /** Full country name. Example: "Croatia" */
    name: string;
    /** Country name in the native language. Example: "Hrvatska" */
    nativeName: string;
    /** ISO 3166-1 numeric country code. Example: "191" */
    numericCode: string;
    /** Total population. Example: 4047200 */
    population: number;
    /** World region the country belongs to. Example: "Europe" */
    region: string; // Asia, Europe, maybe create ENUM
    /** Regional trade blocs the country belongs to. */
    regionalBlocs: RegionalBloc[];
    /** More specific region within the world region. Example: "Southern Europe" */
    subregion: string;
    /** List of timezones. Example: ["UTC+01:00"] */
    timezones: string[];
    /** Top-level internet domains. Example: [".hr"] */
    topLevelDomain: string[];
    /** Country name translated into various languages, keyed by language code. */
    translations: Record<string, string>
};

/**
 * Currency used in a country.
 * @example
 * { code: 'EUR', name: 'Euro', symbol: '€' }
 */
export type CountryCurrency = {
    /** ISO 4217 currency code. Example: "EUR" */
    code: string;
    /** Full currency name. Example: "Euro" */
    name: string;
    /** Currency symbol. Example: "€" */
    symbol: string;
};

/**
 * Language spoken in a country.
 * @example
 * { iso639_1: "hr", iso639_2: "hrv", name: "Croatian", nativeName: "hrvatski jezik" }
 */
export type CountryLanguage = {
    /** ISO 639-1 two-letter language code. Example: "hr" */
    iso639_1: string;
    /** ISO 639-2 three-letter language code. Example: "hrv" */
    iso639_2: string;
    /** Language name in English. Example: "Croatian" */
    name: string;
    /** Language name in the native language. Example: "hrvatski jezik" */
    nativeName: string;
};

/**
 * Regional trade or political bloc.
 * @example
 * { acronym: "EU", name: "European Union" }
 */
export type RegionalBloc = {
    /** Bloc acronym. Example: "EU" */
    acronym: string;
    /** Full bloc name. Example: "European Union" */
    name: string;
};