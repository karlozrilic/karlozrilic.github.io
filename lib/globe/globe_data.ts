import type { Visitor, CityLight } from '@/lib/globe/globe_utils';

export const VISITORS: Visitor[] = [
    { city: 'San Francisco', flag: '🇺🇸', country: 'US', lat:  37.77, lng: -122.41, count: 9, live: true  },
    { city: 'Berlin',        flag: '🇩🇪', country: 'DE', lat:  52.52, lng:   13.40, count: 7, live: true  },
    { city: 'Tokyo',         flag: '🇯🇵', country: 'JP', lat:  35.67, lng:  139.65, count: 6, live: false },
    { city: 'London',        flag: '🇬🇧', country: 'GB', lat:  51.50, lng:   -0.12, count: 5, live: false },
    { city: 'São Paulo',     flag: '🇧🇷', country: 'BR', lat: -23.55, lng:  -46.63, count: 4, live: false },
    { city: 'Sydney',        flag: '🇦🇺', country: 'AU', lat: -33.86, lng:  151.20, count: 4, live: false },
    { city: 'Nairobi',       flag: '🇰🇪', country: 'KE', lat:  -1.29, lng:   36.82, count: 3, live: false },
    { city: 'Mumbai',        flag: '🇮🇳', country: 'IN', lat:  19.07, lng:   72.87, count: 3, live: false },
    { city: 'Toronto',       flag: '🇨🇦', country: 'CA', lat:  43.65, lng:  -79.38, count: 2, live: false },
    { city: 'Amsterdam',     flag: '🇳🇱', country: 'NL', lat:  52.37, lng:    4.90, count: 2, live: false },
];

export const CITY_LIGHTS: CityLight[] = [
    // ── North America — major metros ─────────────────────────────────────────
    { lat:  40.71, lng:  -74.00, s: 0.90 }, // New York City
    { lat:  34.05, lng: -118.20, s: 0.88 }, // Los Angeles
    { lat:  41.85, lng:  -87.65, s: 0.85 }, // Chicago
    { lat:  29.76, lng:  -95.37, s: 0.80 }, // Houston
    { lat:  19.43, lng:  -99.13, s: 0.87 }, // Mexico City
    { lat:  33.45, lng: -112.07, s: 0.74 }, // Phoenix
    { lat:  37.77, lng: -122.40, s: 0.75 }, // San Francisco
    { lat:  38.90, lng:  -77.03, s: 0.75 }, // Washington DC
    { lat:  39.95, lng:  -75.17, s: 0.75 }, // Philadelphia
    { lat:  42.36, lng:  -71.06, s: 0.74 }, // Boston
    { lat:  47.60, lng: -122.30, s: 0.70 }, // Seattle
    { lat:  32.78, lng:  -96.80, s: 0.74 }, // Dallas
    { lat:  33.75, lng:  -84.39, s: 0.72 }, // Atlanta
    { lat:  25.77, lng:  -80.19, s: 0.70 }, // Miami
    { lat:  39.73, lng: -104.99, s: 0.67 }, // Denver
    { lat:  42.33, lng:  -83.04, s: 0.67 }, // Detroit
    { lat:  35.23, lng:  -80.84, s: 0.64 }, // Charlotte
    { lat:  36.17, lng: -115.14, s: 0.70 }, // Las Vegas
    { lat:  32.72, lng: -117.15, s: 0.70 }, // San Diego
    { lat:  45.52, lng: -122.67, s: 0.63 }, // Portland
    { lat:  44.97, lng:  -93.27, s: 0.65 }, // Minneapolis
    { lat:  30.27, lng:  -97.74, s: 0.66 }, // Austin
    { lat:  29.42, lng:  -98.49, s: 0.64 }, // San Antonio
    { lat:  40.76, lng: -111.89, s: 0.63 }, // Salt Lake City
    { lat:  43.65, lng:  -79.38, s: 0.75 }, // Toronto
    { lat:  45.50, lng:  -73.57, s: 0.71 }, // Montreal
    { lat:  49.28, lng: -123.12, s: 0.68 }, // Vancouver
    { lat:  51.05, lng: -114.07, s: 0.59 }, // Calgary
    { lat:  53.55, lng: -113.49, s: 0.57 }, // Edmonton
    { lat:  30.33, lng:  -81.66, s: 0.60 }, // Jacksonville
    { lat:  35.46, lng:  -97.51, s: 0.60 }, // Oklahoma City
    { lat:  36.17, lng:  -86.78, s: 0.62 }, // Nashville
    { lat:  35.15, lng:  -90.05, s: 0.60 }, // Memphis
    { lat:  38.25, lng:  -85.76, s: 0.59 }, // Louisville
    { lat:  39.10, lng:  -84.51, s: 0.60 }, // Cincinnati
    { lat:  40.44, lng:  -79.99, s: 0.62 }, // Pittsburgh
    { lat:  38.60, lng:  -90.20, s: 0.63 }, // St. Louis
    { lat:  39.80, lng:  -89.60, s: 0.54 }, // Springfield IL
    { lat:  20.97, lng:  -89.62, s: 0.50 }, // Mérida
    { lat:  14.64, lng:  -90.51, s: 0.54 }, // Guatemala City
    { lat:   9.93, lng:  -84.09, s: 0.49 }, // San José CR
    // NYC metro fill
    { lat:  40.85, lng:  -73.88 }, { lat:  40.73, lng:  -73.80 }, { lat:  40.64, lng:  -73.95 },
    { lat:  40.90, lng:  -74.17 }, { lat:  40.50, lng:  -74.43 }, { lat:  40.44, lng:  -74.30 },
    { lat:  40.78, lng:  -73.57 }, { lat:  40.66, lng:  -73.44 }, { lat:  41.07, lng:  -74.07 },
    { lat:  41.50, lng:  -74.00 }, { lat:  40.96, lng:  -74.14 }, { lat:  40.57, lng:  -74.15 },
    // Northeast Corridor fill (Boston → DC)
    { lat:  43.07, lng:  -70.75 }, { lat:  42.67, lng:  -71.32 }, { lat:  42.45, lng:  -71.12 },
    { lat:  42.18, lng:  -71.81 }, { lat:  42.08, lng:  -71.40 }, { lat:  41.82, lng:  -71.41 },
    { lat:  41.76, lng:  -72.67 }, { lat:  41.31, lng:  -72.93 }, { lat:  40.27, lng:  -76.88 },
    { lat:  40.10, lng:  -75.38 }, { lat:  39.74, lng:  -75.54 }, { lat:  39.28, lng:  -76.61 },
    { lat:  38.70, lng:  -77.20 }, { lat:  38.84, lng:  -77.44 }, { lat:  40.22, lng:  -74.77 },
    { lat:  39.94, lng:  -74.10 },
    // Great Lakes fill
    { lat:  41.48, lng:  -81.68 }, { lat:  41.39, lng:  -82.48 }, { lat:  41.80, lng:  -79.95 },
    { lat:  42.27, lng:  -83.75 }, { lat:  42.49, lng:  -83.40 }, { lat:  42.50, lng:  -82.90 },
    { lat:  42.73, lng:  -84.55 }, { lat:  43.01, lng:  -83.69 }, { lat:  43.05, lng:  -76.15 },
    { lat:  43.15, lng:  -77.62 }, { lat:  42.88, lng:  -78.88 }, { lat:  42.00, lng:  -87.75 },
    { lat:  41.76, lng:  -88.15 }, { lat:  41.60, lng:  -87.90 }, { lat:  41.67, lng:  -86.25 },
    { lat:  43.07, lng:  -89.40 }, { lat:  43.04, lng:  -88.00 }, { lat:  44.52, lng:  -88.02 },
    { lat:  42.50, lng:  -92.40 }, { lat:  41.60, lng:  -93.60 }, { lat:  44.00, lng:  -92.50 },
    { lat:  42.00, lng:  -88.00 }, { lat:  44.97, lng:  -93.60 }, { lat:  45.06, lng:  -93.35 },
    // Florida corridor fill
    { lat:  30.44, lng:  -84.28 }, { lat:  29.65, lng:  -82.32 }, { lat:  28.54, lng:  -81.38 },
    { lat:  28.34, lng:  -81.50 }, { lat:  27.95, lng:  -82.46 }, { lat:  27.54, lng:  -82.54 },
    { lat:  27.36, lng:  -82.55 }, { lat:  26.64, lng:  -81.87 }, { lat:  26.87, lng:  -80.10 },
    { lat:  26.19, lng:  -80.17 }, { lat:  25.94, lng:  -80.20 }, { lat:  28.08, lng:  -80.61 },
    // Texas fill
    { lat:  32.72, lng:  -97.32 }, { lat:  32.91, lng:  -96.79 }, { lat:  29.55, lng:  -95.10 },
    { lat:  30.08, lng:  -95.40 }, { lat:  29.90, lng:  -95.78 }, { lat:  30.22, lng:  -97.77 },
    { lat:  31.79, lng: -106.42 }, { lat:  27.80, lng:  -97.40 }, { lat:  26.21, lng:  -98.23 },
    { lat:  33.22, lng:  -97.13 }, { lat:  32.50, lng:  -93.75 }, { lat:  30.45, lng:  -91.15 },
    { lat:  29.95, lng:  -90.07 },
    // California fill
    { lat:  34.14, lng: -118.13 }, { lat:  33.90, lng: -117.72 }, { lat:  33.84, lng: -117.91 },
    { lat:  33.77, lng: -118.19 }, { lat:  34.29, lng: -118.45 }, { lat:  34.42, lng: -118.55 },
    { lat:  34.04, lng: -117.93 }, { lat:  33.61, lng: -117.63 }, { lat:  34.10, lng: -118.36 },
    { lat:  33.52, lng: -117.15 }, { lat:  37.33, lng: -121.89 }, { lat:  37.54, lng: -122.05 },
    { lat:  37.69, lng: -122.18 }, { lat:  37.87, lng: -122.27 }, { lat:  37.97, lng: -122.51 },
    { lat:  38.58, lng: -121.49 }, { lat:  38.44, lng: -121.39 }, { lat:  36.75, lng: -119.77 },
    { lat:  35.37, lng: -119.02 }, { lat:  34.97, lng: -120.43 },
    // Mountain West
    { lat:  35.10, lng: -106.65 }, { lat:  32.22, lng: -110.97 }, { lat:  43.61, lng: -116.20 },
    { lat:  39.51, lng: -119.81 }, { lat:  47.66, lng: -117.43 }, { lat:  46.86, lng: -113.99 },

    // ── South America ─────────────────────────────────────────────────────────
    { lat: -23.55, lng:  -46.63, s: 0.88 }, // São Paulo
    { lat: -34.61, lng:  -58.38, s: 0.84 }, // Buenos Aires
    { lat: -22.90, lng:  -43.17, s: 0.82 }, // Rio de Janeiro
    { lat: -33.46, lng:  -70.65, s: 0.74 }, // Santiago
    { lat: -12.04, lng:  -77.03, s: 0.72 }, // Lima
    { lat:  -3.72, lng:  -38.54, s: 0.59 }, // Fortaleza
    { lat:  -8.05, lng:  -34.88, s: 0.60 }, // Recife
    { lat: -15.78, lng:  -47.93, s: 0.64 }, // Brasília
    { lat: -30.03, lng:  -51.23, s: 0.63 }, // Porto Alegre
    { lat: -19.92, lng:  -43.94, s: 0.67 }, // Belo Horizonte
    { lat:  -0.23, lng:  -78.52, s: 0.57 }, // Quito
    { lat:   4.71, lng:  -74.07, s: 0.67 }, // Bogotá
    { lat:  10.48, lng:  -66.87, s: 0.66 }, // Caracas
    { lat:   6.85, lng:  -75.57, s: 0.61 }, // Medellín
    { lat:  -2.90, lng:  -43.26, s: 0.54 }, // São Luís
    { lat: -17.78, lng:  -63.18, s: 0.53 }, // Santa Cruz
    { lat: -16.50, lng:  -68.15, s: 0.55 }, // La Paz
    // São Paulo metro fill
    { lat: -23.20, lng:  -46.90 }, { lat: -23.68, lng:  -46.53 }, { lat: -23.73, lng:  -46.60 },
    { lat: -22.75, lng:  -47.33 }, { lat: -23.00, lng:  -47.13 },
    // Buenos Aires fill
    { lat: -34.55, lng:  -58.25 }, { lat: -34.40, lng:  -58.56 }, { lat: -34.85, lng:  -58.47 },

    // ── Europe — major metros ─────────────────────────────────────────────────
    { lat:  51.50, lng:   -0.12, s: 0.90 }, // London
    { lat:  48.85, lng:    2.35, s: 0.88 }, // Paris
    { lat:  52.52, lng:   13.40, s: 0.82 }, // Berlin
    { lat:  41.90, lng:   12.50, s: 0.78 }, // Rome
    { lat:  40.41, lng:   -3.70, s: 0.77 }, // Madrid
    { lat:  52.37, lng:    4.90, s: 0.75 }, // Amsterdam
    { lat:  50.85, lng:    4.35, s: 0.74 }, // Brussels
    { lat:  48.20, lng:   16.37, s: 0.73 }, // Vienna
    { lat:  47.38, lng:    8.54, s: 0.71 }, // Zürich
    { lat:  59.33, lng:   18.07, s: 0.67 }, // Stockholm
    { lat:  55.67, lng:   12.57, s: 0.67 }, // Copenhagen
    { lat:  60.17, lng:   24.93, s: 0.65 }, // Helsinki
    { lat:  59.91, lng:   10.75, s: 0.67 }, // Oslo
    { lat:  53.34, lng:   -6.26, s: 0.65 }, // Dublin
    { lat:  55.75, lng:   37.62, s: 0.88 }, // Moscow
    { lat:  59.95, lng:   30.32, s: 0.78 }, // St. Petersburg
    { lat:  50.45, lng:   30.52, s: 0.72 }, // Kyiv
    { lat:  52.23, lng:   21.01, s: 0.70 }, // Warsaw
    { lat:  50.08, lng:   14.43, s: 0.66 }, // Prague
    { lat:  47.50, lng:   19.04, s: 0.68 }, // Budapest
    { lat:  44.80, lng:   20.46, s: 0.65 }, // Belgrade
    { lat:  45.81, lng:   15.97, s: 0.59 }, // Zagreb
    { lat:  42.70, lng:   23.33, s: 0.61 }, // Sofia
    { lat:  41.02, lng:   28.96, s: 0.82 }, // Istanbul
    { lat:  37.98, lng:   23.73, s: 0.67 }, // Athens
    { lat:  45.47, lng:    9.19, s: 0.75 }, // Milan
    { lat:  45.07, lng:    7.68, s: 0.67 }, // Turin
    { lat:  44.50, lng:   11.34, s: 0.61 }, // Bologna
    { lat:  43.77, lng:   11.25, s: 0.65 }, // Florence
    { lat:  40.85, lng:   14.27, s: 0.70 }, // Naples
    { lat:  41.65, lng:   -0.88, s: 0.54 }, // Zaragoza
    { lat:  41.38, lng:    2.17, s: 0.72 }, // Barcelona
    { lat:  37.38, lng:   -5.99, s: 0.61 }, // Seville
    { lat:  39.47, lng:   -0.38, s: 0.61 }, // Valencia
    { lat:  38.72, lng:   -9.14, s: 0.63 }, // Lisbon
    { lat:  41.16, lng:   -8.63, s: 0.59 }, // Porto
    { lat:  43.85, lng:   18.36, s: 0.58 }, // Sarajevo
    { lat:  53.90, lng:   27.57, s: 0.60 }, // Minsk
    { lat:  56.95, lng:   24.11, s: 0.56 }, // Riga
    { lat:  54.69, lng:   25.28, s: 0.55 }, // Vilnius
    { lat:  59.44, lng:   24.75, s: 0.55 }, // Tallinn
    { lat:  44.44, lng:   26.10, s: 0.63 }, // Bucharest
    { lat:  45.75, lng:   21.23, s: 0.57 }, // Timișoara
    // London fill
    { lat:  51.51, lng:   -0.45 }, { lat:  51.54, lng:    0.10 }, { lat:  51.44, lng:   -0.20 },
    { lat:  51.76, lng:   -0.10 }, { lat:  51.40, lng:    0.52 }, { lat:  51.33, lng:   -0.75 },
    { lat:  51.48, lng:    0.31 }, { lat:  51.90, lng:   -0.48 }, { lat:  52.06, lng:   -0.73 },
    // UK regional cities
    { lat:  52.48, lng:   -1.90 }, { lat:  52.68, lng:   -2.10 }, { lat:  52.90, lng:   -1.47 },
    { lat:  52.63, lng:   -1.13 }, { lat:  53.80, lng:   -1.55 }, { lat:  53.48, lng:   -2.24 },
    { lat:  53.41, lng:   -2.98 }, { lat:  53.48, lng:   -2.00 }, { lat:  53.57, lng:   -2.43 },
    { lat:  53.74, lng:   -1.86 }, { lat:  53.68, lng:   -1.50 }, { lat:  53.37, lng:   -1.47 },
    { lat:  54.97, lng:   -1.61 }, { lat:  54.57, lng:   -1.24 }, { lat:  55.86, lng:   -4.25 },
    { lat:  55.95, lng:   -3.19 }, { lat:  51.58, lng:   -3.22 },
    // Rhine-Ruhr + Benelux (very dense)
    { lat:  51.47, lng:    3.87 }, { lat:  52.08, lng:    4.31 }, { lat:  51.92, lng:    4.47 },
    { lat:  52.38, lng:    4.64 }, { lat:  52.16, lng:    4.50 }, { lat:  52.01, lng:    4.37 },
    { lat:  51.56, lng:    4.78 }, { lat:  51.44, lng:    5.48 }, { lat:  52.52, lng:    6.10 },
    { lat:  51.21, lng:    4.40 }, { lat:  50.83, lng:    4.37 }, { lat:  50.65, lng:    5.57 },
    { lat:  50.46, lng:    3.97 }, { lat:  50.94, lng:    6.96 }, { lat:  51.23, lng:    6.79 },
    { lat:  51.48, lng:    7.46 }, { lat:  51.52, lng:    7.10 }, { lat:  51.44, lng:    6.99 },
    { lat:  51.37, lng:    7.47 }, { lat:  51.67, lng:    7.82 }, { lat:  51.17, lng:    7.08 },
    { lat:  51.34, lng:    6.59 }, { lat:  51.19, lng:    6.44 }, { lat:  51.96, lng:    7.63 },
    { lat:  52.27, lng:    8.04 }, { lat:  52.52, lng:    9.74 }, { lat:  52.14, lng:   10.54 },
    { lat:  53.08, lng:    8.81 }, { lat:  53.55, lng:    9.99 }, { lat:  53.72, lng:    9.77 },
    { lat:  54.32, lng:   10.13 }, { lat:  53.87, lng:   10.69 },
    // Germany inland
    { lat:  51.05, lng:   13.74 }, { lat:  51.34, lng:   12.38 }, { lat:  52.10, lng:   11.64 },
    { lat:  50.73, lng:   12.28 }, { lat:  48.14, lng:   11.58 }, { lat:  48.00, lng:   11.20 },
    { lat:  48.78, lng:    9.18 }, { lat:  48.73, lng:    9.49 }, { lat:  49.49, lng:    8.46 },
    { lat:  50.12, lng:    8.63 }, { lat:  50.00, lng:    8.27 }, { lat:  50.36, lng:    7.60 },
    { lat:  49.20, lng:    6.99 }, { lat:  49.01, lng:    8.40 }, { lat:  47.99, lng:    7.85 },
    { lat:  49.67, lng:   10.90 }, { lat:  48.37, lng:   10.89 }, { lat:  50.57, lng:    9.68 },
    { lat:  49.44, lng:   11.08 }, { lat:  54.08, lng:   12.13 }, { lat:  52.40, lng:   13.07 },
    { lat:  52.55, lng:   13.62 }, { lat:  49.60, lng:   11.00 },
    // France fill
    { lat:  48.70, lng:    2.10 }, { lat:  48.93, lng:    2.34 }, { lat:  48.95, lng:    2.88 },
    { lat:  48.62, lng:    2.43 }, { lat:  43.30, lng:    5.40 }, { lat:  43.35, lng:    5.02 },
    { lat:  43.60, lng:    1.44 }, { lat:  45.75, lng:    4.84 }, { lat:  45.56, lng:    5.92 },
    { lat:  44.84, lng:   -0.58 }, { lat:  47.22, lng:   -1.55 }, { lat:  48.11, lng:   -1.68 },
    { lat:  50.63, lng:    3.06 }, { lat:  48.58, lng:    7.75 }, { lat:  43.70, lng:    7.25 },
    { lat:  43.12, lng:    5.93 },
    // Po Valley fill (dense)
    { lat:  45.35, lng:    9.84 }, { lat:  45.54, lng:   10.22 }, { lat:  45.43, lng:   10.99 },
    { lat:  45.55, lng:   11.55 }, { lat:  45.64, lng:   12.24 }, { lat:  45.44, lng:   12.33 },
    { lat:  44.80, lng:   10.33 }, { lat:  44.65, lng:   10.92 }, { lat:  44.41, lng:    8.93 },
    { lat:  45.47, lng:    9.00 }, { lat:  45.40, lng:    9.47 }, { lat:  38.12, lng:   13.36 },
    { lat:  37.50, lng:   15.09 },
    // Poland / Eastern Europe fill
    { lat:  52.40, lng:   16.92 }, { lat:  51.11, lng:   17.04 }, { lat:  54.35, lng:   18.67 },
    { lat:  53.13, lng:   18.00 }, { lat:  50.26, lng:   19.02 }, { lat:  50.06, lng:   19.94 },
    { lat:  51.40, lng:   21.15 }, { lat:  49.84, lng:   24.03 }, { lat:  48.00, lng:   37.80 },
    { lat:  47.84, lng:   35.13 }, { lat:  48.46, lng:   35.04 }, { lat:  49.98, lng:   36.25 },
    // Iberian fill
    { lat:  37.98, lng:   -1.13 }, { lat:  36.72, lng:   -4.42 }, { lat:  39.86, lng:   -4.02 },
    { lat:  40.96, lng:   -5.66 },

    // ── Middle East ──────────────────────────────────────────────────────────
    { lat:  30.04, lng:   31.23, s: 0.82 }, // Cairo
    { lat:  24.69, lng:   46.72, s: 0.78 }, // Riyadh
    { lat:  21.39, lng:   39.86, s: 0.67 }, // Jeddah
    { lat:  25.07, lng:   55.14, s: 0.75 }, // Dubai
    { lat:  24.47, lng:   54.37, s: 0.65 }, // Abu Dhabi
    { lat:  26.22, lng:   50.59, s: 0.64 }, // Manama
    { lat:  29.37, lng:   47.98, s: 0.65 }, // Kuwait City
    { lat:  33.34, lng:   44.40, s: 0.72 }, // Baghdad
    { lat:  35.69, lng:   51.39, s: 0.78 }, // Tehran
    { lat:  33.89, lng:   35.50, s: 0.64 }, // Beirut
    { lat:  31.95, lng:   35.93, s: 0.64 }, // Amman
    { lat:  32.07, lng:   34.78, s: 0.68 }, // Tel Aviv
    { lat:  31.78, lng:   35.23, s: 0.58 }, // Jerusalem
    { lat:  33.51, lng:   36.29, s: 0.61 }, // Damascus
    { lat:  36.20, lng:   43.99, s: 0.53 }, // Mosul
    { lat:  23.61, lng:   58.59, s: 0.57 }, // Muscat
    { lat:  25.29, lng:   51.53, s: 0.64 }, // Doha
    { lat:  39.93, lng:   32.86, s: 0.67 }, // Ankara
    { lat:  38.42, lng:   27.14, s: 0.62 }, // İzmir
    { lat:  37.00, lng:   35.32, s: 0.53 }, // Adana
    { lat:  34.31, lng:   47.07, s: 0.54 }, // Kermanshah
    // Nile Delta fill
    { lat:  31.20, lng:   30.00 }, { lat:  30.80, lng:   30.99 }, { lat:  31.05, lng:   31.38 },
    { lat:  30.47, lng:   31.09 }, { lat:  30.25, lng:   30.99 }, { lat:  31.66, lng:   30.07 },
    // Istanbul fill
    { lat:  40.97, lng:   29.12 }, { lat:  41.10, lng:   29.05 },

    // ── Africa ───────────────────────────────────────────────────────────────
    { lat:  36.82, lng:   10.18, s: 0.61 }, // Tunis
    { lat:  33.59, lng:   -7.62, s: 0.62 }, // Casablanca
    { lat:  34.02, lng:   -6.83, s: 0.56 }, // Rabat
    { lat:  36.75, lng:    3.06, s: 0.63 }, // Algiers
    { lat:  32.90, lng:   13.18, s: 0.57 }, // Tripoli
    { lat:  14.72, lng:  -17.46, s: 0.55 }, // Dakar
    { lat:   5.36, lng:   -4.03, s: 0.59 }, // Abidjan
    { lat:   6.45, lng:    3.47, s: 0.72 }, // Lagos
    { lat:   9.05, lng:    7.53, s: 0.59 }, // Abuja
    { lat:  12.00, lng:    8.52, s: 0.55 }, // Kano
    { lat:   3.86, lng:   11.52, s: 0.53 }, // Yaoundé
    { lat:   4.05, lng:    9.70, s: 0.55 }, // Douala
    { lat:   5.55, lng:   -0.20, s: 0.56 }, // Accra
    { lat:   6.14, lng:    1.22, s: 0.50 }, // Lomé
    { lat:  -1.29, lng:   36.82, s: 0.61 }, // Nairobi
    { lat:  -6.82, lng:   39.28, s: 0.57 }, // Dar es Salaam
    { lat:  -4.32, lng:   15.32, s: 0.58 }, // Kinshasa
    { lat: -15.41, lng:   28.28, s: 0.55 }, // Lusaka
    { lat: -17.86, lng:   31.05, s: 0.55 }, // Harare
    { lat: -25.97, lng:   32.57, s: 0.57 }, // Maputo
    { lat: -26.20, lng:   28.04, s: 0.72 }, // Johannesburg
    { lat: -29.85, lng:   31.00, s: 0.64 }, // Durban
    { lat: -33.92, lng:   18.42, s: 0.64 }, // Cape Town
    { lat: -28.00, lng:   26.71, s: 0.53 }, // Bloemfontein
    { lat:  -8.84, lng:   13.23, s: 0.57 }, // Luanda
    { lat:  15.55, lng:   32.53, s: 0.57 }, // Khartoum
    { lat:   9.00, lng:   38.75, s: 0.61 }, // Addis Ababa
    { lat:  -2.00, lng:   30.10, s: 0.51 }, // Kigali
    // Joburg fill
    { lat: -25.74, lng:   28.19 }, { lat: -26.32, lng:   27.50 }, { lat: -26.17, lng:   28.30 },

    // ── Russia / Central Asia ─────────────────────────────────────────────────
    { lat:  54.99, lng:   73.39, s: 0.57 }, // Omsk
    { lat:  56.85, lng:   60.61, s: 0.60 }, // Yekaterinburg
    { lat:  54.85, lng:   83.10, s: 0.58 }, // Novosibirsk
    { lat:  56.01, lng:   92.87, s: 0.54 }, // Krasnoyarsk
    { lat:  52.07, lng:  113.50, s: 0.51 }, // Chita
    { lat:  43.11, lng:  131.89, s: 0.55 }, // Vladivostok
    { lat:  51.67, lng:   39.19, s: 0.59 }, // Voronezh
    { lat:  53.20, lng:   50.14, s: 0.57 }, // Samara
    { lat:  55.83, lng:   49.17, s: 0.61 }, // Kazan
    { lat:  56.33, lng:   43.98, s: 0.57 }, // Nizhny Novgorod
    { lat:  48.71, lng:   44.51, s: 0.55 }, // Volgograd
    { lat:  45.03, lng:   38.98, s: 0.57 }, // Krasnodar
    { lat:  54.73, lng:   55.96, s: 0.56 }, // Ufa
    { lat:  57.15, lng:   65.54, s: 0.53 }, // Tyumen
    { lat:  58.00, lng:   56.27, s: 0.54 }, // Perm
    { lat:  61.00, lng:   69.00 },           // Surgut oil region
    { lat:  51.18, lng:   71.45, s: 0.59 }, // Astana
    { lat:  43.26, lng:   76.91, s: 0.57 }, // Almaty
    { lat:  41.30, lng:   69.24, s: 0.63 }, // Tashkent
    { lat:  41.69, lng:   44.83, s: 0.59 }, // Tbilisi
    { lat:  40.41, lng:   49.87, s: 0.60 }, // Baku
    // Moscow fill
    { lat:  55.90, lng:   37.37 }, { lat:  55.63, lng:   37.83 }, { lat:  55.80, lng:   38.10 },
    { lat:  56.02, lng:   37.51 }, { lat:  55.55, lng:   37.38 }, { lat:  55.78, lng:   37.18 },
    { lat:  59.73, lng:   30.47 }, { lat:  60.00, lng:   30.13 },

    // ── South & Southeast Asia ────────────────────────────────────────────────
    { lat:  28.66, lng:   77.22, s: 0.88 }, // Delhi
    { lat:  19.07, lng:   72.87, s: 0.88 }, // Mumbai
    { lat:  12.97, lng:   77.59, s: 0.78 }, // Bangalore
    { lat:  22.57, lng:   88.36, s: 0.78 }, // Kolkata
    { lat:  17.38, lng:   78.47, s: 0.75 }, // Hyderabad
    { lat:  13.08, lng:   80.27, s: 0.75 }, // Chennai
    { lat:  23.03, lng:   72.58, s: 0.68 }, // Ahmedabad
    { lat:  18.52, lng:   73.85, s: 0.67 }, // Pune
    { lat:  26.85, lng:   80.95, s: 0.61 }, // Lucknow
    { lat:  26.46, lng:   80.34, s: 0.57 }, // Kanpur
    { lat:  25.35, lng:   82.98, s: 0.55 }, // Varanasi
    { lat:  25.59, lng:   85.14, s: 0.59 }, // Patna
    { lat:  21.19, lng:   72.83, s: 0.57 }, // Surat
    { lat:  23.03, lng:   72.63 },           // Ahmedabad north
    { lat:  22.30, lng:   70.79, s: 0.53 }, // Rajkot
    { lat:  27.18, lng:   78.01, s: 0.55 }, // Agra
    { lat:  23.18, lng:   77.40, s: 0.57 }, // Bhopal
    { lat:  22.72, lng:   75.86, s: 0.55 }, // Indore
    { lat:  21.18, lng:   81.30, s: 0.57 }, // Raipur
    { lat:   9.93, lng:   76.26, s: 0.56 }, // Kochi
    { lat:  11.00, lng:   77.02, s: 0.55 }, // Coimbatore
    { lat:  10.79, lng:   78.70, s: 0.54 }, // Tiruchirappalli
    { lat:  16.31, lng:   80.44, s: 0.55 }, // Vijayawada
    { lat:  20.46, lng:   85.87, s: 0.55 }, // Bhubaneswar
    { lat:  30.73, lng:   76.78, s: 0.56 }, // Chandigarh
    // Delhi NCR fill
    { lat:  28.68, lng:   77.45 }, { lat:  28.42, lng:   77.31 }, { lat:  28.46, lng:   77.03 },
    { lat:  29.10, lng:   75.71 }, { lat:  28.86, lng:   76.60 }, { lat:  28.22, lng:   76.44 },
    // Ganges plain fill
    { lat:  27.55, lng:   80.31 }, { lat:  28.04, lng:   79.41 }, { lat:  26.75, lng:   83.37 },
    { lat:  25.45, lng:   81.84 }, { lat:  24.57, lng:   73.69 },
    // Mumbai fill
    { lat:  19.22, lng:   73.08 }, { lat:  19.03, lng:   73.03 },
    { lat:  19.30, lng:   72.87 }, { lat:  18.88, lng:   72.82 },
    // Kolkata fill
    { lat:  22.70, lng:   88.41 }, { lat:  22.46, lng:   88.43 },
    { lat:  22.88, lng:   88.40 }, { lat:  22.36, lng:   87.32 },
    // Pakistan / Bangladesh
    { lat:  24.87, lng:   67.01, s: 0.72 }, // Karachi
    { lat:  33.69, lng:   73.06, s: 0.65 }, // Islamabad
    { lat:  31.55, lng:   74.34, s: 0.64 }, // Lahore
    { lat:  34.01, lng:   71.58, s: 0.55 }, // Peshawar
    { lat:  31.43, lng:   73.12, s: 0.54 }, // Faisalabad
    { lat:  23.72, lng:   90.41, s: 0.78 }, // Dhaka
    { lat:  22.33, lng:   91.83, s: 0.57 }, // Chittagong
    { lat:   6.92, lng:   79.86, s: 0.59 }, // Colombo
    { lat:  27.70, lng:   85.31, s: 0.59 }, // Kathmandu
    // Southeast Asia
    { lat:  10.80, lng:  106.65, s: 0.82 }, // Ho Chi Minh City
    { lat:  21.03, lng:  105.85, s: 0.78 }, // Hanoi
    { lat:  16.07, lng:  108.22, s: 0.59 }, // Da Nang
    { lat:   1.35, lng:  103.82, s: 0.78 }, // Singapore
    { lat:   3.14, lng:  101.69, s: 0.76 }, // Kuala Lumpur
    { lat:  13.75, lng:  100.50, s: 0.82 }, // Bangkok
    { lat:  16.87, lng:   96.18, s: 0.64 }, // Yangon
    { lat:  11.56, lng:  104.92, s: 0.59 }, // Phnom Penh
    { lat:  -6.21, lng:  106.84, s: 0.78 }, // Jakarta
    { lat:  -7.25, lng:  112.75, s: 0.64 }, // Surabaya
    { lat:  -6.92, lng:  107.60, s: 0.59 }, // Bandung
    { lat:  14.60, lng:  120.98, s: 0.72 }, // Manila
    { lat:  10.32, lng:  123.90, s: 0.55 }, // Cebu
    { lat:   5.41, lng:  100.33, s: 0.57 }, // Penang
    // Bangkok fill
    { lat:  13.87, lng:  100.51 }, { lat:  13.63, lng:  100.65 }, { lat:  13.80, lng:  100.35 },
    // Jakarta fill
    { lat:  -6.14, lng:  106.80 }, { lat:  -6.28, lng:  106.96 },
    { lat:  -6.23, lng:  106.77 }, { lat:  -6.36, lng:  107.15 },
    // KL fill
    { lat:   3.08, lng:  101.60 }, { lat:   3.20, lng:  101.70 },

    // ── East Asia ─────────────────────────────────────────────────────────────
    { lat:  35.67, lng:  139.65, s: 0.92 }, // Tokyo
    { lat:  34.69, lng:  135.50, s: 0.84 }, // Osaka
    { lat:  35.18, lng:  136.90, s: 0.78 }, // Nagoya
    { lat:  33.59, lng:  130.41, s: 0.70 }, // Fukuoka
    { lat:  43.06, lng:  141.35, s: 0.67 }, // Sapporo
    { lat:  38.27, lng:  140.87, s: 0.61 }, // Sendai
    { lat:  34.40, lng:  132.45, s: 0.60 }, // Hiroshima
    { lat:  33.58, lng:  130.37, s: 0.56 }, // Kitakyushu
    { lat:  32.75, lng:  129.87, s: 0.54 }, // Nagasaki
    { lat:  31.91, lng:  130.85, s: 0.54 }, // Kagoshima
    // Tokyo megalopolis fill
    { lat:  35.60, lng:  139.73 }, { lat:  35.45, lng:  139.64 }, { lat:  35.32, lng:  139.55 },
    { lat:  35.73, lng:  139.82 }, { lat:  35.90, lng:  139.64 }, { lat:  36.08, lng:  139.79 },
    { lat:  35.78, lng:  140.19 }, { lat:  35.73, lng:  140.38 }, { lat:  35.53, lng:  139.42 },
    { lat:  35.37, lng:  139.40 }, { lat:  35.50, lng:  139.94 }, { lat:  35.68, lng:  139.45 },
    { lat:  35.83, lng:  140.03 }, { lat:  35.83, lng:  139.49 }, { lat:  36.39, lng:  139.06 },
    // Nagoya fill
    { lat:  35.09, lng:  136.87 }, { lat:  35.44, lng:  136.64 },
    { lat:  35.10, lng:  137.15 }, { lat:  34.77, lng:  136.51 },
    // Osaka-Kobe-Kyoto fill
    { lat:  34.77, lng:  135.52 }, { lat:  34.68, lng:  135.83 }, { lat:  35.02, lng:  135.75 },
    { lat:  34.69, lng:  135.20 }, { lat:  34.54, lng:  135.60 }, { lat:  34.92, lng:  135.42 },
    { lat:  34.55, lng:  135.50 }, { lat:  34.36, lng:  132.47 }, { lat:  33.85, lng:  130.93 },
    { lat:  34.68, lng:  137.40 },
    // South Korea
    { lat:  37.57, lng:  126.98, s: 0.86 }, // Seoul
    { lat:  35.15, lng:  129.07, s: 0.74 }, // Busan
    { lat:  35.87, lng:  128.60, s: 0.67 }, // Daegu
    { lat:  36.35, lng:  127.38, s: 0.63 }, // Daejeon
    { lat:  35.10, lng:  126.92, s: 0.63 }, // Gwangju
    { lat:  35.54, lng:  128.98, s: 0.56 }, // Changwon
    // Seoul metro fill
    { lat:  37.28, lng:  127.02 }, { lat:  37.64, lng:  126.83 }, { lat:  37.30, lng:  126.83 },
    { lat:  37.40, lng:  126.74 }, { lat:  37.76, lng:  126.73 }, { lat:  37.42, lng:  127.13 },
    { lat:  37.53, lng:  127.07 }, { lat:  35.54, lng:  129.33 }, { lat:  35.96, lng:  128.69 },
    { lat:  36.80, lng:  127.15 },
    // Eastern China — major cities
    { lat:  39.90, lng:  116.40, s: 0.90 }, // Beijing
    { lat:  31.23, lng:  121.47, s: 0.90 }, // Shanghai
    { lat:  23.13, lng:  113.26, s: 0.82 }, // Guangzhou
    { lat:  22.55, lng:  114.07, s: 0.80 }, // Shenzhen
    { lat:  30.66, lng:  104.06, s: 0.75 }, // Chengdu
    { lat:  29.56, lng:  106.55, s: 0.75 }, // Chongqing
    { lat:  30.58, lng:  114.31, s: 0.75 }, // Wuhan
    { lat:  36.07, lng:  120.38, s: 0.69 }, // Qingdao
    { lat:  34.27, lng:  108.95, s: 0.70 }, // Xi'an
    { lat:  38.05, lng:  114.49, s: 0.67 }, // Shijiazhuang
    { lat:  36.66, lng:  117.13, s: 0.67 }, // Jinan
    { lat:  41.80, lng:  123.43, s: 0.67 }, // Shenyang
    { lat:  43.88, lng:  125.35, s: 0.63 }, // Changchun
    { lat:  45.75, lng:  126.64, s: 0.63 }, // Harbin
    { lat:  28.23, lng:  112.94, s: 0.64 }, // Changsha
    { lat:  32.06, lng:  118.80, s: 0.70 }, // Nanjing
    { lat:  31.88, lng:  117.25, s: 0.64 }, // Hefei
    { lat:  26.08, lng:  119.31, s: 0.61 }, // Fuzhou
    { lat:  24.48, lng:  118.08, s: 0.61 }, // Xiamen
    { lat:  22.82, lng:  108.32, s: 0.63 }, // Nanning
    { lat:  25.05, lng:  102.71, s: 0.62 }, // Kunming
    { lat:  26.58, lng:  106.71, s: 0.62 }, // Guiyang
    { lat:  43.82, lng:   87.60, s: 0.58 }, // Ürümqi
    { lat:  25.05, lng:  121.53, s: 0.74 }, // Taipei
    { lat:  24.15, lng:  120.67, s: 0.62 }, // Taichung
    { lat:  22.62, lng:  120.31, s: 0.59 }, // Kaohsiung
    // Beijing fill
    { lat:  39.95, lng:  116.58 }, { lat:  40.08, lng:  116.62 }, { lat:  39.83, lng:  116.45 },
    { lat:  39.11, lng:  117.18 }, { lat:  39.34, lng:  117.50 }, { lat:  40.38, lng:  115.98 },
    // Shanghai / Yangtze Delta fill
    { lat:  31.36, lng:  121.49 }, { lat:  31.11, lng:  121.38 }, { lat:  31.57, lng:  121.25 },
    { lat:  31.29, lng:  120.59 }, { lat:  31.55, lng:  120.30 }, { lat:  30.29, lng:  120.16 },
    { lat:  30.15, lng:  120.08 }, { lat:  29.87, lng:  121.55 }, { lat:  31.83, lng:  120.86 },
    { lat:  30.75, lng:  120.75 }, { lat:  32.16, lng:  119.41 }, { lat:  31.57, lng:  118.82 },
    // Pearl River Delta fill
    { lat:  22.82, lng:  113.61 }, { lat:  22.94, lng:  113.35 }, { lat:  22.37, lng:  114.14 },
    { lat:  22.75, lng:  114.38 }, { lat:  22.53, lng:  113.38 }, { lat:  22.20, lng:  113.55 },
    { lat:  23.05, lng:  114.40 },
    // Yangtze corridor fill
    { lat:  30.28, lng:  114.38 }, { lat:  28.68, lng:  115.85 },
    { lat:  29.60, lng:  113.15 }, { lat:  32.39, lng:  119.41 },
    // Northeast China fill
    { lat:  41.78, lng:  123.38 }, { lat:  41.50, lng:  122.96 }, { lat:  41.11, lng:  122.40 },
    { lat:  40.38, lng:  122.48 }, { lat:  40.69, lng:  122.16 }, { lat:  42.34, lng:  122.85 },
    { lat:  46.62, lng:  125.16 }, { lat:  46.07, lng:  123.57 },

    // ── Oceania ───────────────────────────────────────────────────────────────
    { lat: -33.86, lng:  151.20, s: 0.72 }, // Sydney
    { lat: -27.47, lng:  153.02, s: 0.67 }, // Brisbane
    { lat: -37.81, lng:  144.96, s: 0.70 }, // Melbourne
    { lat: -31.95, lng:  115.86, s: 0.61 }, // Perth
    { lat: -34.93, lng:  138.60, s: 0.59 }, // Adelaide
    { lat: -36.87, lng:  174.77, s: 0.65 }, // Auckland
    { lat: -41.28, lng:  174.78, s: 0.55 }, // Wellington
    { lat: -43.53, lng:  172.63, s: 0.53 }, // Christchurch
    // Sydney / Melbourne / Brisbane fill
    { lat: -33.90, lng:  151.01 }, { lat: -33.75, lng:  151.10 }, { lat: -33.87, lng:  150.81 },
    { lat: -37.95, lng:  145.19 }, { lat: -37.75, lng:  145.00 },
    { lat: -27.55, lng:  152.95 }, { lat: -27.63, lng:  153.12 },

    // ── Extra density fill — corridors that should glow like the ISS photo ───

    // Rhine-Ruhr core grid (0.25° spacing — creates one solid amber blob)
    { lat:  51.25, lng:   6.75 }, { lat:  51.25, lng:   7.00 }, { lat:  51.25, lng:   7.25 },
    { lat:  51.25, lng:   7.50 }, { lat:  51.50, lng:   6.75 }, { lat:  51.50, lng:   7.00 },
    { lat:  51.50, lng:   7.25 }, { lat:  51.50, lng:   7.50 }, { lat:  51.75, lng:   6.75 },
    { lat:  51.75, lng:   7.00 }, { lat:  51.75, lng:   7.25 }, { lat:  51.75, lng:   7.50 },
    { lat:  51.00, lng:   7.00 }, { lat:  51.00, lng:   7.25 }, { lat:  51.00, lng:   6.75 },
    { lat:  51.00, lng:   6.50 }, { lat:  51.25, lng:   6.50 }, { lat:  51.50, lng:   6.50 },
    // Netherlands coastal strip (Rotterdam–Amsterdam–Utrecht belt)
    { lat:  52.00, lng:   4.20 }, { lat:  52.00, lng:   4.60 }, { lat:  52.00, lng:   5.00 },
    { lat:  52.25, lng:   4.40 }, { lat:  52.25, lng:   4.80 }, { lat:  52.50, lng:   4.50 },
    { lat:  52.50, lng:   4.90 }, { lat:  52.00, lng:   5.30 }, { lat:  51.75, lng:   5.00 },
    { lat:  51.75, lng:   4.60 }, { lat:  51.75, lng:   4.20 }, { lat:  51.50, lng:   4.10 },
    // Belgium–Luxembourg corridor
    { lat:  50.60, lng:   4.00 }, { lat:  50.60, lng:   4.50 }, { lat:  50.85, lng:   3.50 },
    { lat:  50.85, lng:   3.00 }, { lat:  51.00, lng:   3.50 }, { lat:  50.50, lng:   5.00 },

    // UK — M62/Pennines corridor (Leeds–Manchester–Liverpool continuous belt)
    { lat:  53.60, lng:  -2.80 }, { lat:  53.55, lng:  -2.55 }, { lat:  53.52, lng:  -2.30 },
    { lat:  53.50, lng:  -2.10 }, { lat:  53.50, lng:  -1.90 }, { lat:  53.50, lng:  -1.70 },
    { lat:  53.75, lng:  -1.75 }, { lat:  53.75, lng:  -2.00 }, { lat:  53.75, lng:  -2.25 },
    // West Midlands conurbation fill
    { lat:  52.55, lng:  -2.05 }, { lat:  52.55, lng:  -1.85 }, { lat:  52.55, lng:  -1.65 },
    { lat:  52.40, lng:  -1.80 }, { lat:  52.35, lng:  -2.10 }, { lat:  52.65, lng:  -2.20 },
    // London orbital (M25 ring)
    { lat:  51.65, lng:   0.30 }, { lat:  51.40, lng:   0.75 }, { lat:  51.20, lng:   0.45 },
    { lat:  51.10, lng:  -0.20 }, { lat:  51.25, lng:  -0.55 }, { lat:  51.55, lng:  -0.90 },
    { lat:  51.75, lng:  -0.45 }, { lat:  51.75, lng:   0.10 },

    // France — Paris basin fill
    { lat:  48.55, lng:   1.60 }, { lat:  48.50, lng:   2.00 }, { lat:  48.80, lng:   2.70 },
    { lat:  49.10, lng:   2.10 }, { lat:  48.80, lng:   1.70 }, { lat:  48.60, lng:   2.80 },

    // Po Valley — denser fill Milan to Venice
    { lat:  45.50, lng:   9.50 }, { lat:  45.50, lng:  10.00 }, { lat:  45.50, lng:  10.50 },
    { lat:  45.50, lng:  11.00 }, { lat:  45.50, lng:  11.50 }, { lat:  45.25, lng:   9.75 },
    { lat:  45.25, lng:  10.25 }, { lat:  45.25, lng:  10.75 }, { lat:  45.25, lng:  11.25 },
    { lat:  45.75, lng:   9.50 }, { lat:  45.75, lng:  10.00 }, { lat:  45.75, lng:  10.50 },

    // US NE Corridor — tighter grid Boston to Washington
    { lat:  42.25, lng:  -71.10 }, { lat:  42.00, lng:  -71.50 }, { lat:  41.75, lng:  -71.55 },
    { lat:  41.55, lng:  -72.10 }, { lat:  41.40, lng:  -73.00 }, { lat:  41.10, lng:  -73.85 },
    { lat:  40.90, lng:  -73.85 }, { lat:  40.75, lng:  -74.30 }, { lat:  40.55, lng:  -74.90 },
    { lat:  40.30, lng:  -74.65 }, { lat:  40.05, lng:  -75.10 }, { lat:  39.85, lng:  -75.35 },
    { lat:  39.65, lng:  -75.75 }, { lat:  39.45, lng:  -76.00 }, { lat:  39.25, lng:  -76.55 },
    { lat:  39.05, lng:  -76.95 }, { lat:  38.80, lng:  -76.95 },
    // US Great Lakes western strip
    { lat:  41.90, lng:  -87.90 }, { lat:  42.15, lng:  -87.95 }, { lat:  42.40, lng:  -87.85 },
    { lat:  42.60, lng:  -87.75 }, { lat:  43.10, lng:  -88.20 }, { lat:  43.20, lng:  -87.95 },

    // Japan — Tokaido Shinkansen corridor (Tokyo to Osaka as one strip)
    { lat:  35.25, lng:  139.15 }, { lat:  35.10, lng:  138.90 }, { lat:  35.00, lng:  138.45 },
    { lat:  34.95, lng:  138.05 }, { lat:  34.85, lng:  137.55 }, { lat:  34.80, lng:  137.10 },
    { lat:  34.83, lng:  136.70 }, { lat:  34.87, lng:  136.20 }, { lat:  34.90, lng:  135.95 },
    { lat:  34.87, lng:  135.70 }, { lat:  34.82, lng:  135.35 },
    // Tokyo Kanto plain fill (more density)
    { lat:  35.65, lng:  139.55 }, { lat:  35.65, lng:  139.95 }, { lat:  35.55, lng:  139.75 },
    { lat:  36.00, lng:  139.90 }, { lat:  36.15, lng:  139.55 }, { lat:  35.95, lng:  139.30 },
    { lat:  35.45, lng:  139.80 }, { lat:  35.30, lng:  139.70 },

    // South Korea — Seoul to Busan corridor
    { lat:  37.10, lng:  127.00 }, { lat:  36.90, lng:  127.10 }, { lat:  36.60, lng:  127.35 },
    { lat:  36.20, lng:  127.60 }, { lat:  35.80, lng:  127.75 }, { lat:  35.55, lng:  128.20 },
    { lat:  35.30, lng:  128.55 }, { lat:  35.20, lng:  128.80 }, { lat:  35.10, lng:  129.00 },

    // Eastern China — Shanghai → Nanjing corridor
    { lat:  31.45, lng:  120.90 }, { lat:  31.60, lng:  120.45 }, { lat:  31.70, lng:  120.00 },
    { lat:  31.80, lng:  119.55 }, { lat:  31.90, lng:  119.10 }, { lat:  32.00, lng:  118.95 },
    // Beijing–Tianjin–Shijiazhuang strip
    { lat:  39.60, lng:  116.90 }, { lat:  39.40, lng:  117.00 }, { lat:  39.20, lng:  117.10 },
    { lat:  38.90, lng:  116.95 }, { lat:  38.60, lng:  116.85 }, { lat:  38.30, lng:  115.80 },
    // Pearl River Delta extra fill
    { lat:  22.65, lng:  113.85 }, { lat:  22.65, lng:  114.20 }, { lat:  22.45, lng:  113.75 },
    { lat:  22.40, lng:  114.00 }, { lat:  22.10, lng:  113.70 }, { lat:  23.20, lng:  113.50 },
    { lat:  23.35, lng:  113.80 }, { lat:  22.90, lng:  113.90 },
    // Yangtze Delta micro-fill
    { lat:  30.55, lng:  120.40 }, { lat:  30.80, lng:  120.50 }, { lat:  31.00, lng:  120.30 },
    { lat:  31.15, lng:  120.00 }, { lat:  30.40, lng:  120.60 }, { lat:  30.20, lng:  120.30 },

    // India — Ganges plain corridor (Delhi → Kolkata unbroken)
    { lat:  28.00, lng:   78.60 }, { lat:  27.60, lng:   79.75 }, { lat:  27.10, lng:   80.85 },
    { lat:  26.50, lng:   81.40 }, { lat:  26.00, lng:   82.25 }, { lat:  25.70, lng:   83.00 },
    { lat:  25.40, lng:   83.60 }, { lat:  25.20, lng:   84.30 }, { lat:  25.00, lng:   85.05 },
    { lat:  24.80, lng:   85.70 }, { lat:  24.50, lng:   86.50 }, { lat:  24.10, lng:   87.40 },
    { lat:  23.50, lng:   88.00 },
    // South India (Chennai–Bangalore–Hyderabad triangle)
    { lat:  13.50, lng:   79.80 }, { lat:  13.70, lng:   79.50 }, { lat:  14.40, lng:   79.10 },
    { lat:  15.15, lng:   78.85 }, { lat:  15.75, lng:   78.20 }, { lat:  14.65, lng:   78.00 },
    { lat:  13.80, lng:   77.50 }, { lat:  12.85, lng:   77.65 }, { lat:  12.30, lng:   76.65 },
    { lat:  11.50, lng:   76.95 }, { lat:  12.50, lng:   78.20 }, { lat:  11.85, lng:   79.50 },

    // Indonesia — Java island fill (very dense)
    { lat:  -6.55, lng:  107.00 }, { lat:  -6.80, lng:  108.00 }, { lat:  -7.00, lng:  109.00 },
    { lat:  -7.15, lng:  110.00 }, { lat:  -7.35, lng:  110.50 }, { lat:  -7.50, lng:  111.00 },
    { lat:  -7.60, lng:  111.50 }, { lat:  -7.70, lng:  112.25 }, { lat:  -7.40, lng:  112.50 },
    // Thailand central
    { lat:  14.20, lng:  100.60 }, { lat:  14.00, lng:  100.55 }, { lat:  13.50, lng:  100.50 },

    // West Africa coastal strip
    { lat:   5.60, lng:   -0.00 }, { lat:   6.15, lng:    1.00 }, { lat:   6.25, lng:    2.40 },
    { lat:   6.50, lng:    3.00 }, { lat:   6.60, lng:    3.30 },
    // East Africa fill
    { lat:  -6.50, lng:   37.00 }, { lat:  -4.00, lng:   39.60 }, { lat:  -3.00, lng:   40.10 },

    // Russia — Ural industrial strip
    { lat:  56.50, lng:   58.00 }, { lat:  55.50, lng:   59.50 }, { lat:  54.50, lng:   55.50 },
    { lat:  56.00, lng:   54.00 }, { lat:  57.50, lng:   56.00 }, { lat:  58.50, lng:   59.00 },
    // Trans-Siberian cities
    { lat:  55.00, lng:   61.40 }, { lat:  55.00, lng:   73.00 }, { lat:  55.00, lng:   83.00 },
    { lat:  56.00, lng:   93.00 }, { lat:  52.30, lng:  104.30 },

    // Middle East extra
    { lat:  24.10, lng:   47.20 }, { lat:  26.50, lng:   50.00 }, { lat:  23.00, lng:   57.50 },
    { lat:  32.50, lng:   44.00 }, { lat:  31.00, lng:   37.50 }, { lat:  30.55, lng:   34.90 },
    // Egypt Nile Valley
    { lat:  29.55, lng:   30.50 }, { lat:  28.50, lng:   30.82 }, { lat:  27.30, lng:   31.20 },
    { lat:  26.20, lng:   32.00 }, { lat:  25.70, lng:   32.64 },

    // ── EXTENDED US FILLS ────────────────────────────────────────────────────
    // I-95 NE corridor micro-fill (every ~0.3°)
    { lat:  42.10, lng:  -70.95 }, { lat:  41.95, lng:  -71.15 }, { lat:  41.82, lng:  -71.40 },
    { lat:  41.70, lng:  -71.45 }, { lat:  41.55, lng:  -71.57 }, { lat:  41.45, lng:  -71.90 },
    { lat:  41.30, lng:  -72.40 }, { lat:  41.20, lng:  -72.70 }, { lat:  41.05, lng:  -73.20 },
    { lat:  40.96, lng:  -73.65 }, { lat:  40.82, lng:  -73.75 }, { lat:  40.62, lng:  -74.05 },
    { lat:  40.50, lng:  -74.28 }, { lat:  40.35, lng:  -74.50 }, { lat:  40.18, lng:  -74.72 },
    { lat:  40.00, lng:  -75.00 }, { lat:  39.88, lng:  -75.20 }, { lat:  39.73, lng:  -75.42 },
    { lat:  39.58, lng:  -75.60 }, { lat:  39.40, lng:  -75.82 }, { lat:  39.20, lng:  -76.40 },
    { lat:  39.00, lng:  -76.65 }, { lat:  38.85, lng:  -76.80 }, { lat:  38.70, lng:  -77.05 },
    // Mid-Atlantic east shore
    { lat:  38.30, lng:  -75.55 }, { lat:  37.95, lng:  -75.40 }, { lat:  37.45, lng:  -76.00 },
    { lat:  37.10, lng:  -76.40 }, { lat:  36.85, lng:  -76.30 }, { lat:  36.75, lng:  -76.00 },
    // Southeast US fills
    { lat:  34.00, lng:  -81.03 }, { lat:  33.60, lng:  -79.90 }, { lat:  34.85, lng:  -82.40 },
    { lat:  34.50, lng:  -82.65 }, { lat:  33.95, lng:  -83.72 }, { lat:  33.80, lng:  -84.20 },
    { lat:  33.58, lng:  -84.55 }, { lat:  32.47, lng:  -84.99 }, { lat:  31.57, lng:  -84.18 },
    { lat:  30.83, lng:  -83.28 }, { lat:  30.68, lng:  -88.04 }, { lat:  30.36, lng:  -88.52 },
    { lat:  30.17, lng:  -89.30 }, { lat:  32.30, lng:  -90.18 }, { lat:  32.85, lng:  -88.75 },
    { lat:  34.74, lng:  -86.58 }, { lat:  33.52, lng:  -86.80 }, { lat:  33.43, lng:  -86.63 },
    // Florida comprehensive fill
    { lat:  30.19, lng:  -85.68 }, { lat:  29.88, lng:  -85.32 }, { lat:  29.55, lng:  -81.21 },
    { lat:  29.20, lng:  -81.02 }, { lat:  28.75, lng:  -81.30 }, { lat:  28.90, lng:  -82.12 },
    { lat:  28.45, lng:  -82.53 }, { lat:  27.77, lng:  -82.73 }, { lat:  27.68, lng:  -81.52 },
    { lat:  27.45, lng:  -80.33 }, { lat:  27.22, lng:  -80.26 }, { lat:  26.72, lng:  -80.08 },
    { lat:  26.45, lng:  -80.08 }, { lat:  26.10, lng:  -80.15 },
    // Great Lakes dense fill
    { lat:  42.95, lng:  -85.67 }, { lat:  42.73, lng:  -86.10 }, { lat:  43.24, lng:  -86.25 },
    { lat:  42.30, lng:  -85.18 }, { lat:  41.93, lng:  -83.40 }, { lat:  42.10, lng:  -83.25 },
    { lat:  41.70, lng:  -83.57 }, { lat:  41.55, lng:  -83.66 }, { lat:  42.56, lng:  -83.92 },
    { lat:  43.55, lng:  -84.77 }, { lat:  44.00, lng:  -84.40 }, { lat:  43.42, lng:  -83.95 },
    { lat:  43.62, lng:  -84.25 }, { lat:  44.30, lng:  -85.40 }, { lat:  44.77, lng:  -85.62 },
    { lat:  43.82, lng:  -88.45 }, { lat:  44.50, lng:  -88.00 }, { lat:  44.95, lng:  -89.65 },
    { lat:  44.25, lng:  -90.31 }, { lat:  43.54, lng:  -89.00 }, { lat:  43.00, lng:  -89.00 },
    { lat:  42.68, lng:  -88.55 }, { lat:  42.40, lng:  -88.70 }, { lat:  42.10, lng:  -88.35 },
    { lat:  41.83, lng:  -88.32 }, { lat:  41.65, lng:  -88.10 }, { lat:  41.50, lng:  -88.08 },
    // Midwest corridor
    { lat:  41.50, lng:  -87.38 }, { lat:  41.25, lng:  -87.15 }, { lat:  41.00, lng:  -86.90 },
    { lat:  40.75, lng:  -86.72 }, { lat:  40.50, lng:  -86.90 }, { lat:  40.42, lng:  -86.15 },
    { lat:  40.05, lng:  -86.15 }, { lat:  39.77, lng:  -86.16 }, { lat:  39.55, lng:  -86.20 },
    { lat:  39.80, lng:  -85.78 }, { lat:  39.78, lng:  -84.19 }, { lat:  39.96, lng:  -82.99 },
    { lat:  40.10, lng:  -82.93 }, { lat:  40.28, lng:  -83.05 }, { lat:  39.71, lng:  -84.10 },
    { lat:  39.35, lng:  -83.80 }, { lat:  39.10, lng:  -84.28 }, { lat:  38.85, lng:  -84.55 },
    { lat:  38.52, lng:  -82.68 }, { lat:  38.42, lng:  -82.45 }, { lat:  38.05, lng:  -84.50 },
    { lat:  37.77, lng:  -84.30 }, { lat:  37.50, lng:  -84.65 },
    // Texas extra fill
    { lat:  33.00, lng:  -96.70 }, { lat:  32.85, lng:  -97.10 }, { lat:  32.65, lng:  -97.38 },
    { lat:  32.55, lng:  -96.95 }, { lat:  32.40, lng:  -97.00 }, { lat:  33.17, lng:  -97.09 },
    { lat:  33.46, lng:  -94.04 }, { lat:  32.50, lng:  -95.30 }, { lat:  32.35, lng:  -94.38 },
    { lat:  31.10, lng:  -97.73 }, { lat:  30.72, lng:  -97.32 }, { lat:  30.57, lng:  -96.33 },
    { lat:  29.70, lng:  -95.82 }, { lat:  29.76, lng:  -94.88 }, { lat:  30.03, lng:  -94.10 },
    { lat:  30.23, lng:  -93.20 }, { lat:  30.35, lng:  -97.18 }, { lat:  30.85, lng:  -100.00 },
    { lat:  31.45, lng: -100.45 }, { lat:  31.88, lng:  -102.34 }, { lat:  32.00, lng:  -102.08 },
    // California extra fill
    { lat:  37.20, lng: -121.99 }, { lat:  37.10, lng: -121.65 }, { lat:  37.00, lng: -121.57 },
    { lat:  36.98, lng: -122.03 }, { lat:  36.60, lng: -121.90 }, { lat:  36.30, lng: -119.30 },
    { lat:  35.68, lng: -119.23 }, { lat:  33.98, lng: -117.55 }, { lat:  33.70, lng: -117.48 },
    { lat:  33.65, lng: -117.83 }, { lat:  33.45, lng: -117.60 }, { lat:  34.45, lng: -118.20 },
    { lat:  34.20, lng: -118.05 }, { lat:  34.25, lng: -118.55 }, { lat:  34.08, lng: -118.38 },
    { lat:  33.98, lng: -118.45 }, { lat:  33.84, lng: -118.33 }, { lat:  33.82, lng: -118.10 },
    { lat:  34.35, lng: -119.05 }, { lat:  34.42, lng: -119.70 }, { lat:  34.95, lng: -120.43 },
    { lat:  38.30, lng: -122.30 }, { lat:  38.10, lng: -122.23 }, { lat:  37.75, lng: -122.42 },
    // Pacific Northwest fills
    { lat:  47.50, lng: -122.20 }, { lat:  47.38, lng: -122.00 }, { lat:  47.25, lng: -122.43 },
    { lat:  47.80, lng: -122.23 }, { lat:  48.00, lng: -122.15 }, { lat:  47.47, lng: -121.77 },
    { lat:  45.55, lng: -122.85 }, { lat:  45.49, lng: -122.44 }, { lat:  45.55, lng: -122.43 },
    { lat:  45.48, lng: -122.78 },

    // ── EXTENDED EUROPE FILLS ────────────────────────────────────────────────
    // UK — comprehensive England grid (0.5° spacing)
    { lat:  50.72, lng:   -1.88 }, { lat:  50.82, lng:   -0.36 }, { lat:  50.92, lng:    0.10 },
    { lat:  51.05, lng:   -0.08 }, { lat:  51.05, lng:    0.55 }, { lat:  51.08, lng:   -1.30 },
    { lat:  51.45, lng:   -1.00 }, { lat:  51.45, lng:   -0.48 }, { lat:  51.45, lng:    0.05 },
    { lat:  51.70, lng:   -1.25 }, { lat:  51.70, lng:   -0.75 }, { lat:  51.70, lng:   -0.30 },
    { lat:  51.75, lng:    0.55 }, { lat:  51.88, lng:   -0.62 }, { lat:  52.00, lng:   -2.12 },
    { lat:  52.00, lng:   -1.50 }, { lat:  52.00, lng:   -1.00 }, { lat:  52.22, lng:   -0.50 },
    { lat:  52.22, lng:    0.15 }, { lat:  52.35, lng:   -1.50 }, { lat:  52.45, lng:   -2.55 },
    { lat:  52.45, lng:   -2.00 }, { lat:  52.65, lng:   -1.55 }, { lat:  52.65, lng:   -0.90 },
    { lat:  52.65, lng:   -0.35 }, { lat:  52.82, lng:   -1.85 }, { lat:  53.00, lng:   -2.38 },
    { lat:  53.00, lng:   -1.98 }, { lat:  53.00, lng:   -1.58 }, { lat:  53.00, lng:   -1.18 },
    { lat:  53.00, lng:   -0.62 }, { lat:  53.20, lng:   -2.62 }, { lat:  53.20, lng:   -2.20 },
    { lat:  53.20, lng:   -1.85 }, { lat:  53.22, lng:   -0.55 }, { lat:  53.38, lng:   -2.80 },
    { lat:  53.40, lng:   -2.48 }, { lat:  53.58, lng:   -2.78 }, { lat:  53.58, lng:   -2.43 },
    { lat:  53.62, lng:   -1.48 }, { lat:  53.62, lng:   -1.10 }, { lat:  53.80, lng:   -1.38 },
    { lat:  53.80, lng:   -1.75 }, { lat:  53.95, lng:   -1.15 }, { lat:  54.00, lng:   -1.55 },
    { lat:  54.15, lng:   -1.40 }, { lat:  54.52, lng:   -1.55 }, { lat:  54.52, lng:   -1.15 },
    { lat:  54.58, lng:   -2.78 }, { lat:  54.75, lng:   -1.58 }, { lat:  55.00, lng:   -1.60 },
    { lat:  55.40, lng:   -3.20 }, { lat:  55.62, lng:   -4.55 }, { lat:  55.65, lng:   -3.95 },
    { lat:  55.80, lng:   -4.00 }, { lat:  56.00, lng:   -3.78 }, { lat:  56.12, lng:   -3.17 },
    { lat:  51.50, lng:   -3.00 }, { lat:  51.62, lng:   -2.97 }, { lat:  51.62, lng:   -3.80 },
    { lat:  51.48, lng:   -3.58 }, { lat:  51.65, lng:   -3.37 }, { lat:  52.42, lng:   -4.08 },
    // Germany comprehensive grid (0.5°)
    { lat:  47.75, lng:   10.00 }, { lat:  47.75, lng:   10.90 }, { lat:  48.00, lng:    8.35 },
    { lat:  48.00, lng:    8.85 }, { lat:  48.00, lng:    9.38 }, { lat:  48.00, lng:   10.40 },
    { lat:  48.00, lng:   10.90 }, { lat:  48.25, lng:    8.00 }, { lat:  48.25, lng:    8.50 },
    { lat:  48.25, lng:    9.00 }, { lat:  48.25, lng:    9.50 }, { lat:  48.50, lng:    8.25 },
    { lat:  48.50, lng:    8.75 }, { lat:  48.50, lng:    9.25 }, { lat:  48.50, lng:    9.88 },
    { lat:  48.50, lng:   10.40 }, { lat:  48.75, lng:    8.50 }, { lat:  48.75, lng:    9.00 },
    { lat:  48.75, lng:    9.52 }, { lat:  49.00, lng:    7.50 }, { lat:  49.00, lng:    8.00 },
    { lat:  49.00, lng:    9.00 }, { lat:  49.00, lng:    9.52 }, { lat:  49.25, lng:    7.00 },
    { lat:  49.25, lng:    7.55 }, { lat:  49.25, lng:    8.10 }, { lat:  49.25, lng:    8.62 },
    { lat:  49.50, lng:    7.05 }, { lat:  49.50, lng:    7.60 }, { lat:  49.50, lng:    8.15 },
    { lat:  49.75, lng:    6.62 }, { lat:  49.75, lng:    7.18 }, { lat:  49.75, lng:    7.75 },
    { lat:  50.00, lng:    6.50 }, { lat:  50.00, lng:    7.03 }, { lat:  50.00, lng:    7.58 },
    { lat:  50.25, lng:    6.85 }, { lat:  50.25, lng:    7.40 }, { lat:  50.25, lng:    7.95 },
    { lat:  50.25, lng:    8.50 }, { lat:  50.50, lng:    6.90 }, { lat:  50.50, lng:    7.45 },
    { lat:  50.50, lng:    8.02 }, { lat:  50.50, lng:    8.60 }, { lat:  50.75, lng:    7.15 },
    { lat:  50.75, lng:    7.72 }, { lat:  50.75, lng:    8.28 }, { lat:  50.75, lng:    8.85 },
    { lat:  51.00, lng:    7.53 }, { lat:  51.00, lng:    8.08 }, { lat:  51.00, lng:    8.62 },
    { lat:  51.00, lng:    9.18 }, { lat:  51.25, lng:    7.03 }, { lat:  51.25, lng:    7.60 },
    { lat:  51.25, lng:    8.18 }, { lat:  51.25, lng:    8.78 }, { lat:  51.25, lng:    9.38 },
    { lat:  51.50, lng:    7.55 }, { lat:  51.50, lng:    8.12 }, { lat:  51.50, lng:    8.70 },
    { lat:  51.50, lng:    9.28 }, { lat:  51.50, lng:    9.85 }, { lat:  51.75, lng:    8.25 },
    { lat:  51.75, lng:    8.82 }, { lat:  51.75, lng:    9.40 }, { lat:  51.75, lng:    9.98 },
    { lat:  51.75, lng:   10.55 }, { lat:  52.00, lng:    8.55 }, { lat:  52.00, lng:    9.12 },
    { lat:  52.00, lng:    9.70 }, { lat:  52.00, lng:   10.28 }, { lat:  52.00, lng:   10.85 },
    { lat:  52.25, lng:    8.85 }, { lat:  52.25, lng:    9.42 }, { lat:  52.25, lng:   10.00 },
    { lat:  52.25, lng:   10.58 }, { lat:  52.50, lng:   10.00 }, { lat:  52.50, lng:   10.58 },
    { lat:  52.75, lng:   10.55 }, { lat:  52.50, lng:   13.00 }, { lat:  52.75, lng:   13.35 },
    { lat:  51.30, lng:   12.45 }, { lat:  51.00, lng:   12.93 }, { lat:  50.85, lng:   13.15 },
    { lat:  50.55, lng:   13.00 }, { lat:  50.60, lng:   12.15 }, { lat:  50.22, lng:   12.80 },
    { lat:  51.50, lng:   11.97 }, { lat:  51.80, lng:   11.00 }, { lat:  52.12, lng:   11.62 },
    { lat:  52.38, lng:   12.55 },
    // France comprehensive fill
    { lat:  48.25, lng:   -4.28 }, { lat:  48.00, lng:   -2.75 }, { lat:  47.48, lng:   -0.55 },
    { lat:  47.22, lng:    1.55 }, { lat:  47.00, lng:    2.75 }, { lat:  46.30, lng:    4.83 },
    { lat:  46.52, lng:    0.35 }, { lat:  45.83, lng:    1.26 }, { lat:  45.50, lng:    2.45 },
    { lat:  45.18, lng:    5.72 }, { lat:  44.92, lng:    4.89 }, { lat:  44.12, lng:    4.08 },
    { lat:  43.95, lng:    4.83 }, { lat:  44.40, lng:    2.57 }, { lat:  43.60, lng:    3.88 },
    { lat:  43.47, lng:    5.37 }, { lat:  43.72, lng:    7.42 }, { lat:  42.70, lng:    2.89 },
    { lat:  49.50, lng:    1.10 }, { lat:  49.18, lng:    0.35 }, { lat:  49.50, lng:    3.55 },
    { lat:  49.75, lng:    2.90 }, { lat:  50.20, lng:    2.00 }, { lat:  50.40, lng:    2.55 },
    { lat:  50.60, lng:    2.32 }, { lat:  50.72, lng:    1.62 }, { lat:  49.25, lng:    4.05 },
    { lat:  49.10, lng:    6.22 }, { lat:  49.52, lng:    5.80 }, { lat:  48.50, lng:    6.20 },
    { lat:  47.78, lng:    7.35 }, { lat:  48.08, lng:    7.38 }, { lat:  47.62, lng:    6.85 },
    { lat:  47.30, lng:    5.00 }, { lat:  47.08, lng:    5.55 },
    // Belgium + Luxembourg fill
    { lat:  50.20, lng:    5.57 }, { lat:  50.35, lng:    5.98 }, { lat:  50.00, lng:    5.08 },
    { lat:  50.18, lng:    4.57 }, { lat:  50.45, lng:    4.82 }, { lat:  50.72, lng:    5.22 },
    { lat:  51.10, lng:    4.02 }, { lat:  51.05, lng:    4.68 }, { lat:  50.75, lng:    5.50 },
    { lat:  50.50, lng:    5.53 }, { lat:  49.62, lng:    6.12 }, { lat:  49.82, lng:    5.98 },
    // Netherlands fill
    { lat:  52.75, lng:    5.60 }, { lat:  52.88, lng:    4.75 }, { lat:  53.18, lng:    6.55 },
    { lat:  53.32, lng:    6.20 }, { lat:  53.22, lng:    5.78 }, { lat:  52.52, lng:    5.47 },
    { lat:  52.15, lng:    5.38 }, { lat:  51.88, lng:    5.85 }, { lat:  51.75, lng:    5.35 },
    // Italy comprehensive fill
    { lat:  45.00, lng:    7.50 }, { lat:  44.12, lng:    9.82 }, { lat:  43.55, lng:   10.32 },
    { lat:  42.35, lng:   11.08 }, { lat:  42.50, lng:   14.25 }, { lat:  41.90, lng:   13.05 },
    { lat:  41.28, lng:   14.77 }, { lat:  40.65, lng:   15.80 }, { lat:  40.35, lng:   18.17 },
    { lat:  39.28, lng:   16.25 }, { lat:  38.92, lng:   16.60 }, { lat:  37.65, lng:   15.10 },
    { lat:  37.07, lng:   15.29 }, { lat:  40.53, lng:   14.25 }, { lat:  40.92, lng:   14.78 },
    { lat:  45.50, lng:    8.72 }, { lat:  45.80, lng:    8.82 }, { lat:  45.72, lng:    8.55 },
    { lat:  46.02, lng:   11.12 }, { lat:  45.88, lng:   11.62 }, { lat:  45.42, lng:   12.88 },
    { lat:  45.32, lng:   11.85 }, { lat:  44.22, lng:   12.05 }, { lat:  44.05, lng:   12.57 },
    // Spain comprehensive fill
    { lat:  43.32, lng:   -8.42 }, { lat:  43.55, lng:   -5.60 }, { lat:  43.52, lng:   -7.85 },
    { lat:  43.30, lng:   -3.00 }, { lat:  43.25, lng:   -2.00 }, { lat:  43.25, lng:   -1.25 },
    { lat:  42.85, lng:   -1.65 }, { lat:  42.58, lng:   -0.88 }, { lat:  41.62, lng:    0.63 },
    { lat:  41.42, lng:    2.52 }, { lat:  41.12, lng:    1.25 }, { lat:  40.95, lng:   -5.68 },
    { lat:  40.55, lng:   -3.38 }, { lat:  40.18, lng:   -3.70 }, { lat:  39.87, lng:   -0.48 },
    { lat:  39.18, lng:   -0.15 }, { lat:  38.40, lng:   -0.48 }, { lat:  38.18, lng:   -1.48 },
    { lat:  37.62, lng:   -0.98 }, { lat:  37.18, lng:   -1.97 }, { lat:  36.85, lng:   -2.45 },
    { lat:  36.72, lng:   -4.42 }, { lat:  37.27, lng:   -6.95 }, { lat:  38.00, lng:   -6.95 },
    { lat:  38.92, lng:   -6.98 }, { lat:  39.48, lng:   -6.38 }, { lat:  40.65, lng:   -4.68 },
    // Poland comprehensive fill
    { lat:  50.05, lng:   18.55 }, { lat:  50.32, lng:   18.90 }, { lat:  50.48, lng:   18.35 },
    { lat:  50.65, lng:   17.92 }, { lat:  50.68, lng:   16.95 }, { lat:  51.42, lng:   18.18 },
    { lat:  51.75, lng:   19.45 }, { lat:  51.08, lng:   16.20 }, { lat:  52.25, lng:   20.08 },
    { lat:  53.45, lng:   14.55 }, { lat:  53.42, lng:   14.58 }, { lat:  53.65, lng:   17.25 },
    { lat:  53.85, lng:   20.48 }, { lat:  54.17, lng:   19.41 }, { lat:  54.72, lng:   18.00 },
    // Czech + Slovakia
    { lat:  49.75, lng:   13.38 }, { lat:  49.68, lng:   18.35 }, { lat:  48.72, lng:   18.00 },
    { lat:  48.72, lng:   21.25 }, { lat:  49.50, lng:   17.00 }, { lat:  50.78, lng:   15.05 },
    // Romania + Moldova
    { lat:  47.18, lng:   27.57 }, { lat:  46.18, lng:   24.80 }, { lat:  45.65, lng:   25.62 },
    { lat:  45.95, lng:   22.90 }, { lat:  45.12, lng:   28.85 }, { lat:  44.18, lng:   28.65 },
    // Ukraine fills
    { lat:  49.50, lng:   34.55 }, { lat:  48.68, lng:   37.60 }, { lat:  47.92, lng:   33.38 },
    { lat:  46.65, lng:   32.62 }, { lat:  48.50, lng:   31.00 }, { lat:  49.25, lng:   28.67 },
    // Scandinavia fills
    { lat:  57.72, lng:   12.00 }, { lat:  57.70, lng:   11.97 }, { lat:  57.50, lng:   12.05 },
    { lat:  57.12, lng:   12.25 }, { lat:  58.18, lng:   13.45 }, { lat:  59.52, lng:   17.65 },
    { lat:  59.27, lng:   18.15 }, { lat:  60.55, lng:   17.00 }, { lat:  61.65, lng:   17.12 },
    { lat:  59.85, lng:   10.52 }, { lat:  58.95, lng:   10.05 }, { lat:  58.20, lng:    8.08 },
    { lat:  58.55, lng:    8.75 }, { lat:  57.50, lng:    9.50 }, { lat:  57.05, lng:    9.92 },
    { lat:  56.45, lng:    9.50 }, { lat:  56.00, lng:   10.22 }, { lat:  56.15, lng:   10.20 },
    { lat:  55.55, lng:   12.98 }, { lat:  55.38, lng:   10.38 }, { lat:  55.20, lng:   11.75 },
    { lat:  60.00, lng:   24.45 }, { lat:  60.52, lng:   27.18 }, { lat:  61.50, lng:   23.78 },
    { lat:  62.90, lng:   27.68 }, { lat:  60.45, lng:   22.30 },

    // ── EXTENDED INDIA FILLS ─────────────────────────────────────────────────
    // Western coast (Mumbai → Kochi corridor)
    { lat:  20.00, lng:   73.00 }, { lat:  19.62, lng:   72.95 }, { lat:  19.45, lng:   72.82 },
    { lat:  18.65, lng:   73.50 }, { lat:  18.00, lng:   73.92 }, { lat:  17.68, lng:   73.82 },
    { lat:  17.05, lng:   73.28 }, { lat:  16.00, lng:   73.90 }, { lat:  15.35, lng:   74.00 },
    { lat:  14.80, lng:   74.12 }, { lat:  14.08, lng:   74.80 }, { lat:  13.35, lng:   74.88 },
    { lat:  12.88, lng:   74.85 }, { lat:  11.88, lng:   75.42 }, { lat:  11.25, lng:   75.78 },
    { lat:  10.52, lng:   76.22 }, { lat:  10.12, lng:   76.35 }, { lat:   9.60, lng:   76.48 },
    // Eastern coast (Kolkata → Chennai)
    { lat:  20.42, lng:   85.88 }, { lat:  19.82, lng:   85.62 }, { lat:  19.30, lng:   84.82 },
    { lat:  18.55, lng:   84.18 }, { lat:  17.72, lng:   83.27 }, { lat:  17.00, lng:   82.25 },
    { lat:  16.30, lng:   81.78 }, { lat:  15.55, lng:   80.05 }, { lat:  14.90, lng:   80.00 },
    { lat:  14.12, lng:   80.00 }, { lat:  13.62, lng:   80.05 }, { lat:  12.82, lng:   80.22 },
    { lat:  11.95, lng:   79.83 }, { lat:  11.12, lng:   79.85 }, { lat:  10.78, lng:   79.85 },
    // Ganges plain extra fill (denser)
    { lat:  29.40, lng:   76.00 }, { lat:  29.00, lng:   77.50 }, { lat:  28.80, lng:   78.85 },
    { lat:  28.35, lng:   79.75 }, { lat:  27.85, lng:   80.85 }, { lat:  27.50, lng:   81.50 },
    { lat:  27.15, lng:   82.22 }, { lat:  26.70, lng:   83.00 }, { lat:  26.25, lng:   83.75 },
    { lat:  25.90, lng:   84.55 }, { lat:  25.55, lng:   85.25 }, { lat:  25.20, lng:   86.00 },
    { lat:  24.88, lng:   86.78 }, { lat:  24.45, lng:   87.72 }, { lat:  23.80, lng:   88.35 },
    // Interior fills
    { lat:  30.22, lng:   76.28 }, { lat:  29.68, lng:   75.55 }, { lat:  29.20, lng:   74.88 },
    { lat:  28.02, lng:   73.32 }, { lat:  26.92, lng:   70.90 }, { lat:  26.30, lng:   73.00 },
    { lat:  25.35, lng:   74.65 }, { lat:  24.58, lng:   73.72 }, { lat:  23.85, lng:   75.03 },
    { lat:  23.22, lng:   76.22 }, { lat:  22.72, lng:   77.58 }, { lat:  22.32, lng:   78.85 },
    { lat:  21.80, lng:   79.95 }, { lat:  21.22, lng:   80.00 }, { lat:  20.90, lng:   79.52 },
    { lat:  20.45, lng:   78.98 }, { lat:  19.60, lng:   78.00 }, { lat:  19.08, lng:   76.55 },
    { lat:  18.38, lng:   76.55 }, { lat:  17.70, lng:   77.52 }, { lat:  16.85, lng:   75.72 },
    { lat:  15.85, lng:   75.72 }, { lat:  15.42, lng:   75.10 }, { lat:  14.68, lng:   75.78 },
    { lat:  13.62, lng:   76.10 }, { lat:  12.32, lng:   76.65 }, { lat:  11.68, lng:   78.22 },
    // Punjab/Haryana
    { lat:  31.52, lng:   74.55 }, { lat:  31.15, lng:   75.68 }, { lat:  30.78, lng:   76.52 },
    { lat:  30.35, lng:   77.12 }, { lat:  29.95, lng:   77.72 }, { lat:  29.22, lng:   79.52 },

    // ── EXTENDED EAST ASIA FILLS ─────────────────────────────────────────────
    // China eastern coast comprehensive (0.5° lat grid)
    { lat:  40.22, lng:  116.85 }, { lat:  40.00, lng:  116.25 }, { lat:  39.75, lng:  116.70 },
    { lat:  39.50, lng:  116.55 }, { lat:  39.25, lng:  116.65 }, { lat:  38.95, lng:  116.45 },
    { lat:  38.72, lng:  116.30 }, { lat:  38.48, lng:  115.95 }, { lat:  38.20, lng:  114.85 },
    { lat:  37.92, lng:  114.38 }, { lat:  37.68, lng:  114.00 }, { lat:  37.38, lng:  118.02 },
    { lat:  37.22, lng:  118.65 }, { lat:  37.00, lng:  119.15 }, { lat:  36.75, lng:  119.65 },
    { lat:  36.45, lng:  120.20 }, { lat:  36.10, lng:  120.35 }, { lat:  35.85, lng:  120.15 },
    { lat:  35.40, lng:  119.12 }, { lat:  34.88, lng:  117.65 }, { lat:  34.58, lng:  117.18 },
    { lat:  34.28, lng:  117.22 }, { lat:  33.95, lng:  117.38 }, { lat:  33.58, lng:  116.55 },
    { lat:  33.28, lng:  116.00 }, { lat:  32.82, lng:  115.88 }, { lat:  32.48, lng:  116.92 },
    { lat:  32.25, lng:  118.22 }, { lat:  32.08, lng:  118.88 }, { lat:  31.78, lng:  119.22 },
    { lat:  31.52, lng:  120.18 }, { lat:  31.25, lng:  121.05 }, { lat:  31.00, lng:  121.45 },
    { lat:  30.72, lng:  121.52 }, { lat:  30.48, lng:  121.00 }, { lat:  30.22, lng:  120.62 },
    { lat:  29.88, lng:  122.12 }, { lat:  29.65, lng:  121.40 }, { lat:  29.12, lng:  120.20 },
    { lat:  28.68, lng:  121.38 }, { lat:  28.12, lng:  120.65 }, { lat:  27.78, lng:  120.68 },
    { lat:  27.18, lng:  120.32 }, { lat:  26.55, lng:  119.95 }, { lat:  25.92, lng:  119.52 },
    { lat:  25.45, lng:  119.00 }, { lat:  24.85, lng:  118.62 }, { lat:  24.48, lng:  117.65 },
    { lat:  24.05, lng:  116.75 }, { lat:  23.72, lng:  116.40 }, { lat:  23.48, lng:  116.62 },
    { lat:  23.12, lng:  114.72 }, { lat:  22.98, lng:  114.38 }, { lat:  22.72, lng:  113.02 },
    // Chengdu-Chongqing basin
    { lat:  30.55, lng:  103.58 }, { lat:  30.28, lng:  103.85 }, { lat:  29.85, lng:  105.72 },
    { lat:  30.02, lng:  106.18 }, { lat:  30.48, lng:  106.58 }, { lat:  29.38, lng:  106.90 },
    { lat:  29.72, lng:  107.35 }, { lat:  31.82, lng:  104.52 }, { lat:  31.45, lng:  103.98 },
    { lat:  30.88, lng:  103.72 }, { lat:  30.20, lng:  104.65 }, { lat:  29.55, lng:  104.78 },
    { lat:  31.22, lng:  105.88 }, { lat:  30.80, lng:  105.00 },
    // Northeast China comprehensive
    { lat:  41.82, lng:  124.32 }, { lat:  41.60, lng:  123.18 }, { lat:  42.00, lng:  122.85 },
    { lat:  42.28, lng:  122.72 }, { lat:  42.62, lng:  122.50 }, { lat:  42.92, lng:  123.48 },
    { lat:  43.18, lng:  123.92 }, { lat:  43.55, lng:  124.42 }, { lat:  44.12, lng:  124.82 },
    { lat:  44.48, lng:  125.08 }, { lat:  44.78, lng:  125.30 }, { lat:  45.12, lng:  125.72 },
    { lat:  45.52, lng:  126.12 }, { lat:  46.02, lng:  126.42 }, { lat:  46.48, lng:  126.78 },
    { lat:  47.32, lng:  128.42 }, { lat:  46.82, lng:  130.25 }, { lat:  45.78, lng:  130.95 },
    { lat:  44.58, lng:  129.62 }, { lat:  43.82, lng:  128.00 }, { lat:  42.88, lng:  129.48 },
    { lat:  41.58, lng:  129.88 }, { lat:  42.02, lng:  128.10 }, { lat:  41.38, lng:  123.85 },
    { lat:  40.78, lng:  122.72 }, { lat:  40.12, lng:  122.00 }, { lat:  39.88, lng:  121.65 },
    // Japan comprehensive — Honshu island
    { lat:  40.82, lng:  140.72 }, { lat:  40.25, lng:  141.25 }, { lat:  39.72, lng:  141.15 },
    { lat:  39.22, lng:  141.08 }, { lat:  38.68, lng:  141.22 }, { lat:  38.25, lng:  140.28 },
    { lat:  38.02, lng:  140.88 }, { lat:  37.82, lng:  140.48 }, { lat:  37.45, lng:  140.38 },
    { lat:  37.10, lng:  140.38 }, { lat:  36.75, lng:  140.75 }, { lat:  36.55, lng:  139.62 },
    { lat:  36.38, lng:  140.47 }, { lat:  36.22, lng:  139.38 }, { lat:  36.00, lng:  139.18 },
    { lat:  35.82, lng:  139.35 }, { lat:  35.68, lng:  139.88 }, { lat:  35.48, lng:  140.12 },
    { lat:  35.28, lng:  140.22 }, { lat:  35.12, lng:  139.88 }, { lat:  34.98, lng:  138.32 },
    { lat:  34.65, lng:  137.75 }, { lat:  34.48, lng:  136.88 }, { lat:  34.42, lng:  136.50 },
    { lat:  34.28, lng:  135.80 }, { lat:  34.18, lng:  135.18 }, { lat:  34.08, lng:  135.00 },
    { lat:  34.00, lng:  134.55 }, { lat:  33.88, lng:  134.28 }, { lat:  34.32, lng:  133.00 },
    { lat:  34.38, lng:  132.90 }, { lat:  34.48, lng:  132.72 }, { lat:  34.68, lng:  133.00 },
    { lat:  34.85, lng:  134.05 }, { lat:  35.42, lng:  136.42 }, { lat:  35.68, lng:  136.78 },
    { lat:  35.98, lng:  136.62 }, { lat:  36.22, lng:  136.62 }, { lat:  36.58, lng:  136.62 },
    { lat:  36.72, lng:  137.22 }, { lat:  37.00, lng:  137.80 }, { lat:  37.22, lng:  138.10 },
    { lat:  37.48, lng:  138.55 }, { lat:  37.72, lng:  139.05 }, { lat:  38.12, lng:  139.38 },
    { lat:  38.42, lng:  140.00 },
    // Kyushu island
    { lat:  33.18, lng:  130.68 }, { lat:  33.35, lng:  131.25 }, { lat:  33.62, lng:  130.92 },
    { lat:  33.85, lng:  130.52 }, { lat:  33.05, lng:  130.05 }, { lat:  32.88, lng:  130.55 },
    { lat:  32.52, lng:  130.78 }, { lat:  32.02, lng:  131.38 }, { lat:  31.55, lng:  131.72 },
    { lat:  32.78, lng:  131.50 }, { lat:  33.02, lng:  131.88 }, { lat:  33.25, lng:  131.60 },
    // Taiwan comprehensive
    { lat:  25.05, lng:  121.52 }, { lat:  24.88, lng:  121.18 }, { lat:  24.78, lng:  120.98 },
    { lat:  24.55, lng:  120.72 }, { lat:  24.25, lng:  120.55 }, { lat:  23.98, lng:  120.68 },
    { lat:  23.58, lng:  120.32 }, { lat:  23.08, lng:  120.22 }, { lat:  22.78, lng:  120.52 },
    { lat:  22.38, lng:  120.62 }, { lat:  25.18, lng:  121.45 }, { lat:  25.12, lng:  121.78 },
    { lat:  24.98, lng:  121.95 }, { lat:  24.72, lng:  121.72 },

    // ── EXTENDED SE ASIA FILLS ───────────────────────────────────────────────
    // Vietnam comprehensive
    { lat:  21.55, lng:  105.82 }, { lat:  20.85, lng:  106.68 }, { lat:  20.42, lng:  106.20 },
    { lat:  19.82, lng:  105.82 }, { lat:  18.68, lng:  105.70 }, { lat:  17.50, lng:  106.60 },
    { lat:  16.50, lng:  107.62 }, { lat:  15.92, lng:  108.22 }, { lat:  15.12, lng:  108.80 },
    { lat:  14.06, lng:  108.25 }, { lat:  13.42, lng:  108.05 }, { lat:  12.25, lng:  109.10 },
    { lat:  11.55, lng:  108.90 }, { lat:  10.98, lng:  108.22 }, { lat:  10.62, lng:  107.00 },
    { lat:  10.48, lng:  106.50 }, { lat:  10.92, lng:  106.18 }, { lat:  11.15, lng:  106.72 },
    // Indonesia — Sumatra south + Kalimantan + Sulawesi
    { lat:  -5.42, lng:  105.25 }, { lat:  -5.95, lng:  106.12 }, { lat:  -6.98, lng:  107.38 },
    { lat:  -7.72, lng:  109.88 }, { lat:  -7.88, lng:  110.62 }, { lat:  -7.98, lng:  111.12 },
    { lat:  -7.32, lng:  113.72 }, { lat:  -7.62, lng:  114.12 }, { lat:  -8.12, lng:  115.22 },
    { lat:  -0.02, lng:  109.32 }, { lat:   0.88, lng:  109.55 }, { lat:  -1.28, lng:  116.82 },
    { lat:  -3.98, lng:  114.75 }, { lat:  -5.15, lng:  119.42 },
    { lat:   1.48, lng:  124.85 }, { lat:   0.82, lng:  123.55 }, { lat:  -3.68, lng:  122.12 },
    // Philippines comprehensive
    { lat:  15.18, lng:  120.58 }, { lat:  14.85, lng:  120.72 }, { lat:  14.48, lng:  121.08 },
    { lat:  14.08, lng:  121.22 }, { lat:  13.65, lng:  121.02 }, { lat:  10.72, lng:  122.55 },
    { lat:   7.08, lng:  125.48 }, { lat:   8.22, lng:  124.25 }, { lat:   7.92, lng:  123.42 },
    // Thailand
    { lat:  13.10, lng:  100.90 }, { lat:  12.68, lng:  101.10 }, { lat:  18.78, lng:   99.00 },
    { lat:  17.38, lng:  102.82 }, { lat:  16.45, lng:  102.82 }, { lat:  15.22, lng:  104.00 },
    { lat:  14.68, lng:  102.08 }, { lat:  13.72, lng:  100.52 }, { lat:  12.82, lng:  100.98 },
    { lat:   7.00, lng:  100.47 }, { lat:   6.88, lng:  101.25 },
    // Malaysia + Singapore fill
    { lat:   3.82, lng:  103.32 }, { lat:   3.12, lng:  101.52 }, { lat:   2.72, lng:  101.95 },
    { lat:   4.32, lng:  100.88 }, { lat:   4.18, lng:  101.12 }, { lat:   5.42, lng:  100.45 },
    { lat:   5.62, lng:  103.45 }, { lat:   6.12, lng:  102.25 }, { lat:   1.22, lng:  103.55 },

    // ── EXTENDED SOUTH AMERICA FILLS ─────────────────────────────────────────
    // Brazil comprehensive
    { lat:  -2.55, lng:  -44.30 }, { lat:  -3.10, lng:  -44.30 }, { lat:  -4.00, lng:  -38.55 },
    { lat:  -5.20, lng:  -37.30 }, { lat:  -5.82, lng:  -35.22 }, { lat:  -7.15, lng:  -34.87 },
    { lat:  -8.28, lng:  -35.97 }, { lat:  -9.65, lng:  -35.75 }, { lat: -10.92, lng:  -37.05 },
    { lat: -12.98, lng:  -38.52 }, { lat: -14.86, lng:  -39.06 }, { lat: -16.45, lng:  -39.07 },
    { lat: -17.25, lng:  -39.28 }, { lat: -18.95, lng:  -39.85 }, { lat: -20.32, lng:  -40.32 },
    { lat: -21.75, lng:  -41.28 }, { lat: -22.55, lng:  -43.18 }, { lat: -23.00, lng:  -43.32 },
    { lat: -22.55, lng:  -42.20 }, { lat: -23.20, lng:  -45.88 }, { lat: -23.52, lng:  -46.20 },
    { lat: -23.68, lng:  -46.92 }, { lat: -24.00, lng:  -46.32 }, { lat: -24.32, lng:  -47.18 },
    { lat: -25.45, lng:  -49.28 }, { lat: -26.32, lng:  -48.82 }, { lat: -27.58, lng:  -48.55 },
    { lat: -28.12, lng:  -48.65 }, { lat: -29.28, lng:  -51.52 }, { lat: -31.35, lng:  -51.22 },
    { lat: -32.00, lng:  -52.10 }, { lat: -33.48, lng:  -53.38 }, { lat: -21.12, lng:  -47.82 },
    { lat: -20.52, lng:  -48.50 }, { lat: -19.75, lng:  -47.95 }, { lat: -19.92, lng:  -44.00 },
    { lat: -20.88, lng:  -42.03 }, { lat: -18.92, lng:  -48.28 }, { lat: -18.92, lng:  -48.28 },
    { lat: -15.60, lng:  -56.08 }, { lat: -15.55, lng:  -47.70 }, { lat: -16.08, lng:  -47.95 },
    { lat:  -3.12, lng:  -60.02 }, { lat:  -1.48, lng:  -48.48 },
    // Colombia + Venezuela fill
    { lat:   4.28, lng:  -74.22 }, { lat:   5.85, lng:  -73.00 }, { lat:   7.88, lng:  -72.52 },
    { lat:  11.00, lng:  -74.80 }, { lat:  10.48, lng:  -73.25 }, { lat:   8.00, lng:  -63.55 },
    { lat:  10.00, lng:  -67.55 }, { lat:   8.58, lng:  -71.15 }, { lat:   9.75, lng:  -70.20 },
    // Argentina + Chile fill
    { lat: -32.55, lng:  -60.95 }, { lat: -32.92, lng:  -60.68 }, { lat: -33.00, lng:  -68.82 },
    { lat: -34.92, lng:  -57.95 }, { lat: -34.68, lng:  -56.20 }, { lat: -36.62, lng:  -64.28 },
    { lat: -38.72, lng:  -62.25 }, { lat: -37.92, lng:  -57.55 }, { lat: -38.00, lng:  -57.55 },
    { lat: -31.65, lng:  -68.55 }, { lat: -29.92, lng:  -71.25 }, { lat: -29.12, lng:  -70.95 },
    { lat: -27.38, lng:  -70.32 }, { lat: -25.45, lng:  -70.62 }, { lat: -23.65, lng:  -70.38 },
    { lat: -22.90, lng:  -70.13 }, { lat: -20.22, lng:  -70.15 }, { lat: -18.48, lng:  -70.32 },

    // ── EXTENDED MIDDLE EAST + AFRICA FILLS ─────────────────────────────────
    // Turkey comprehensive fill
    { lat:  41.65, lng:   26.55 }, { lat:  40.18, lng:   29.05 }, { lat:  39.78, lng:   30.52 },
    { lat:  39.92, lng:   32.82 }, { lat:  38.68, lng:   35.50 }, { lat:  37.18, lng:   37.68 },
    { lat:  36.82, lng:   35.18 }, { lat:  36.98, lng:   30.72 }, { lat:  37.55, lng:   29.12 },
    { lat:  38.88, lng:   29.32 }, { lat:  41.02, lng:   28.48 }, { lat:  40.98, lng:   30.70 },
    { lat:  41.00, lng:   33.85 }, { lat:  40.52, lng:   36.32 }, { lat:  40.30, lng:   38.32 },
    { lat:  39.75, lng:   39.50 }, { lat:  41.00, lng:   40.52 }, { lat:  40.52, lng:   43.50 },
    // Iran fill
    { lat:  36.55, lng:   50.00 }, { lat:  37.28, lng:   49.60 }, { lat:  36.28, lng:   59.57 },
    { lat:  33.40, lng:   48.72 }, { lat:  32.65, lng:   51.68 }, { lat:  32.68, lng:   59.22 },
    { lat:  30.28, lng:   57.08 }, { lat:  29.62, lng:   52.55 }, { lat:  27.20, lng:   56.28 },
    // Arabian peninsula
    { lat:  23.00, lng:   44.10 }, { lat:  21.55, lng:   40.55 }, { lat:  20.00, lng:   41.50 },
    { lat:  22.78, lng:   43.48 }, { lat:  24.52, lng:   44.70 }, { lat:  26.02, lng:   43.48 },
    { lat:  27.35, lng:   41.68 }, { lat:  26.32, lng:   50.22 }, { lat:  25.12, lng:   55.38 },
    { lat:  24.85, lng:   55.95 }, { lat:  24.45, lng:   56.60 }, { lat:  23.62, lng:   57.52 },
    { lat:  22.42, lng:   59.52 }, { lat:  18.25, lng:   42.55 }, { lat:  15.35, lng:   44.20 },
    { lat:  13.55, lng:   44.02 }, { lat:  12.80, lng:   45.02 }, { lat:  15.60, lng:   39.48 },
    // North Africa comprehensive
    { lat:  31.62, lng:   -7.98 }, { lat:  32.35, lng:   -6.38 }, { lat:  33.25, lng:   -5.18 },
    { lat:  34.02, lng:   -5.00 }, { lat:  34.05, lng:   -4.02 }, { lat:  34.00, lng:   -2.25 },
    { lat:  35.55, lng:   -0.58 }, { lat:  36.45, lng:    1.32 }, { lat:  36.38, lng:    2.90 },
    { lat:  36.38, lng:    6.62 }, { lat:  36.08, lng:    9.18 }, { lat:  35.80, lng:   10.60 },
    { lat:  35.52, lng:   11.05 }, { lat:  32.90, lng:   10.85 }, { lat:  31.65, lng:   12.48 },
    { lat:  30.98, lng:   12.95 }, { lat:  32.08, lng:   20.08 }, { lat:  32.88, lng:   21.98 },
    { lat:  32.90, lng:   13.18 }, { lat:  32.65, lng:   15.08 },
    // West Africa comprehensive
    { lat:  15.55, lng:  -13.48 }, { lat:  12.37, lng:  -15.08 }, { lat:  11.88, lng:  -15.58 },
    { lat:  12.00, lng:  -11.88 }, { lat:  13.52, lng:   -9.08 }, { lat:  12.65, lng:   -8.00 },
    { lat:  11.88, lng:   -8.48 }, { lat:  10.88, lng:  -13.68 }, { lat:   8.48, lng:  -13.28 },
    { lat:   8.48, lng:  -11.18 }, { lat:   7.32, lng:  -10.80 }, { lat:   7.08, lng:   -9.75 },
    { lat:   6.32, lng:  -10.80 }, { lat:   5.35, lng:   -4.00 }, { lat:   5.28, lng:   -3.70 },
    { lat:   5.80, lng:   -0.20 }, { lat:   6.12, lng:    0.20 }, { lat:   6.22, lng:    0.95 },
    { lat:   6.75, lng:    2.55 }, { lat:   7.22, lng:    3.95 }, { lat:   7.52, lng:    4.52 },
    { lat:   7.75, lng:    6.78 }, { lat:   8.52, lng:    8.55 }, { lat:   9.58, lng:   8.22 },
    { lat:  10.52, lng:   7.45 }, { lat:  11.85, lng:   13.15 }, { lat:  12.35, lng:   15.05 },
    // East Africa fill
    { lat:   2.05, lng:   45.35 }, { lat:   0.35, lng:   42.55 }, { lat:   3.48, lng:   36.35 },
    { lat:  -1.08, lng:   37.00 }, { lat:  -1.52, lng:   36.55 }, { lat:  -3.38, lng:   36.68 },
    { lat:  -5.80, lng:   35.75 }, { lat:  -6.78, lng:   39.25 }, { lat:  -8.92, lng:   33.48 },
    { lat: -11.72, lng:   43.25 }, { lat: -13.00, lng:   40.68 }, { lat: -14.52, lng:   35.32 },
    { lat: -11.72, lng:   27.48 }, { lat: -13.05, lng:   28.62 }, { lat: -16.52, lng:   28.32 },
    // Southern Africa fill
    { lat: -19.02, lng:   29.82 }, { lat: -19.82, lng:   34.88 }, { lat: -21.82, lng:   31.48 },
    { lat: -23.90, lng:   35.38 }, { lat: -25.58, lng:   34.48 }, { lat: -26.00, lng:   29.12 },
    { lat: -26.68, lng:   27.88 }, { lat: -26.88, lng:   26.68 }, { lat: -27.75, lng:   26.70 },
    { lat: -28.45, lng:   29.95 }, { lat: -29.12, lng:   26.25 }, { lat: -30.72, lng:   30.38 },
    { lat: -33.02, lng:   27.90 }, { lat: -32.15, lng:   28.80 }, { lat: -33.58, lng:   26.88 },
    { lat: -34.18, lng:   22.12 }, { lat: -33.65, lng:   19.45 }, { lat: -34.00, lng:   18.52 },

    // ── EXTENDED RUSSIA / CENTRAL ASIA FILLS ─────────────────────────────────
    // Russia European part
    { lat:  61.78, lng:   34.38 }, { lat:  60.72, lng:   28.78 }, { lat:  57.68, lng:   28.55 },
    { lat:  56.35, lng:   27.95 }, { lat:  57.52, lng:   30.20 }, { lat:  57.88, lng:   31.35 },
    { lat:  57.02, lng:   33.98 }, { lat:  58.55, lng:   30.22 }, { lat:  58.52, lng:   26.05 },
    { lat:  55.10, lng:   36.58 }, { lat:  54.20, lng:   37.62 }, { lat:  53.75, lng:   38.98 },
    { lat:  52.05, lng:   47.80 }, { lat:  51.55, lng:   46.00 }, { lat:  50.20, lng:   45.70 },
    { lat:  47.22, lng:   39.72 }, { lat:  47.52, lng:   40.32 }, { lat:  46.35, lng:   44.12 },
    { lat:  47.28, lng:   42.02 }, { lat:  45.32, lng:   41.92 }, { lat:  44.02, lng:   43.08 },
    { lat:  44.78, lng:   37.38 }, { lat:  43.48, lng:   39.72 }, { lat:  42.98, lng:   41.02 },
    // Russia Siberia
    { lat:  56.85, lng:   53.22 }, { lat:  57.88, lng:   63.05 }, { lat:  55.22, lng:   61.40 },
    { lat:  55.02, lng:   82.92 }, { lat:  54.82, lng:   73.38 }, { lat:  53.72, lng:   87.18 },
    { lat:  53.35, lng:   91.40 }, { lat:  56.00, lng:   92.85 }, { lat:  53.58, lng:  107.88 },
    { lat:  52.28, lng:  104.25 }, { lat:  51.82, lng:  107.62 }, { lat:  50.28, lng:  127.55 },
    { lat:  52.12, lng:  113.50 }, { lat:  48.48, lng:  135.05 }, { lat:  46.95, lng:  142.72 },
    { lat:  43.12, lng:  132.00 }, { lat:  47.32, lng:  134.75 }, { lat:  50.62, lng:  137.00 },
    // Central Asia
    { lat:  42.52, lng:   59.60 }, { lat:  40.12, lng:   65.35 }, { lat:  39.68, lng:   66.95 },
    { lat:  40.52, lng:   72.78 }, { lat:  40.85, lng:   71.65 }, { lat:  37.95, lng:   65.00 },
    { lat:  38.55, lng:   68.78 }, { lat:  34.52, lng:   69.18 }, { lat:  31.62, lng:   65.70 },
];
