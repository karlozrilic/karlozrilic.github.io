import { useRef } from 'react';

// fire on release, not from the timer - popups get blocked otherwise
export function useLongPress(callback: () => void, duration = 2000) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pressedRef = useRef(false);
    const triggeredRef = useRef(false);

    const start = () => {
        // touch fires both pointer and touch events
        if (pressedRef.current) return;
        pressedRef.current = true;
        triggeredRef.current = false;

        timerRef.current = setTimeout(() => {
            triggeredRef.current = true;
        }, duration);
    };

    const clear = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const release = () => {
        clear();
        if (!pressedRef.current) return;
        pressedRef.current = false;
        if (triggeredRef.current) callback();
    };

    const cancel = () => {
        clear();
        pressedRef.current = false;
    };

    const isLongPress = () => triggeredRef.current;

    return {
        onPointerDown: start,
        onPointerUp: release,
        onPointerLeave: cancel,
        onPointerCancel: cancel,
        onTouchStart: start,
        onTouchEnd: release,
        onTouchCancel: cancel,
        isLongPress
    };
}
