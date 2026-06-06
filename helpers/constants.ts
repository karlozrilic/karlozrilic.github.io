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