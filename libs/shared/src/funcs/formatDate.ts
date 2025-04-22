import { format as dateFormatter } from 'date-fns';

export const formatDate = (value: EpochTimeStamp, format = 'yyyy.MM.dd') => {
    if (!value || !format) {
        return '-';
    }

    return dateFormatter(value, format) || '-';
};
