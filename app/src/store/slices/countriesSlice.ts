import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Countries } from '@/app/src/types/countries/countries';

type CountriesObject = {
    countries: Countries[];
    groupedCountries: {
        value: string;
        items: Countries[];
    }[];
};

type CountriesState = {
    data: CountriesObject | null;
    loading: boolean;
    loaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: CountriesState = {
    data: null,
    loading: false,
    loaded: false,
    status: 'idle',
    error: null,
};

function normalizeFlagUrl(url: string, alpha2Code: string): string {
    const allowedDomain = 'flagcdn.com';
    
    if (url.includes(allowedDomain)) {
        return url;
    }

    if (url.includes('.svg')) {
        return `https://flagcdn.com/${alpha2Code.toLowerCase()}.svg`;
    } else {
        return `https://flagcdn.com/w320/${alpha2Code.toLowerCase()}.png`;
    }
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    let countries: CountriesObject | null = null;

    try {
        const result = await fetch('https://portfolio-proxy-mocha.vercel.app/api/countries', {
            headers: {
                'x-proxy-secret': process.env.NEXT_PUBLIC_PROXY_SECRET!,
            },
        });
        let resultCountries = await result.json() as Countries[];

        const countriesByRegion = resultCountries
            .filter((country) => country.independent)    
            .reduce((acc, country) => {
                const region = country.region || 'Other'

                if (!acc[region]) acc[region] = []

                // All countries have flag links like https://flagcdn.com/w320/am.png
                // but afganistan has https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png
                // Fixing that here

                acc[region].push({
                    ...country,
                    flag: normalizeFlagUrl(country.flag, country.alpha2Code),
                    flags: {
                        png: normalizeFlagUrl(country.flags.png, country.alpha2Code),
                        svg: normalizeFlagUrl(country.flags.svg, country.alpha2Code),
                    }
                })
                return acc
            }, {} as Record<string, Countries[]>
        );

        const groupedCountries = Object.entries(countriesByRegion).map(([region, items]) => ({
            value: region,
            items,
        }));

        countries = {
            countries: resultCountries,
            groupedCountries: groupedCountries,
        }
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
    
    return countries;
});

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCountries.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        })
        .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<CountriesObject>) => {
            state.loading = false;
            state.loaded = true;
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchCountries.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch countries';
        });
    },
});

export const countriesReducer = countriesSlice.reducer;