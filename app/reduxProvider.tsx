'use client'

import { Provider } from 'react-redux';
import { makeStore, RootState } from '@/app/src/store/store';
import { ReactNode, useState } from 'react';

export default function ReduxProvider({ children, preloadedState }: { children: ReactNode, preloadedState?: RootState }) {
    const [store] = useState(() => makeStore(preloadedState));
    return <Provider store={store}>{children}</Provider>;
}
