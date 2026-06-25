import { useRef } from 'react';

export function useLongPress(callback: () => void, duration = 2000) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const triggeredRef = useRef(false);

    const start = () => {
        triggeredRef.current = false;

        timerRef.current = setTimeout(() => {
            triggeredRef.current = true;
            callback();
        }, duration);
    };

    const clear = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const isLongPress = () => triggeredRef.current;

    return {
        onPointerDown: start,
        onPointerUp: clear,
        onPointerLeave: clear,
        onPointerCancel: clear,
        isLongPress
    };
}