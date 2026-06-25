type FormatDateOptions = {
    locale?: string | undefined;
    time?: boolean;
}

export const formatDate = (
    date?: Date | undefined,
    options?: FormatDateOptions
) => {
    if (!date) {
        return '';
    }
    // hr-HR
    return date.toLocaleDateString(options?.locale || 'en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: options?.time ? '2-digit' : undefined,
        minute: options?.time ? '2-digit' : undefined,
        second: options?.time ? '2-digit' : undefined
    });
}

export const formatDatePrecise = (
    date?: Date | undefined,
    locale?: string | undefined,
    options?: Intl.DateTimeFormatOptions
) => {
    if (!date) {
        return '';
    }
    // hr-HR
    return date.toLocaleDateString(locale || 'en-GB', options);
}