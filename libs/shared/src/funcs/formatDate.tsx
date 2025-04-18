import { format as dateFormatter } from 'date-fns';

export const formatDate = (value: EpochTimeStamp, format: string) => {
    if (!value || !format) {
        return '-';
    }

    return dateFormatter(value, format) || '-';
};
