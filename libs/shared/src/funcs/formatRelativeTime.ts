import { format } from 'date-fns';

export const formatRelativeTime = (timeStamp: EpochTimeStamp) => {
    const ONE_SECOND = 1 * 1000;
    const ONE_MINUTE = ONE_SECOND * 60;
    const ONE_HOUR = ONE_MINUTE * 60;
    const ONE_DAY = ONE_HOUR * 24;

    const currentTimeStamp = Date.now();
    const timeDiff = currentTimeStamp - timeStamp;

    if (timeDiff < ONE_MINUTE) {
        return `${Math.floor(timeDiff / ONE_SECOND)}초`;
    } else if (timeDiff < ONE_HOUR) {
        return `${Math.floor(timeDiff / ONE_MINUTE)}분`;
    } else if (timeDiff < ONE_DAY) {
        return `${Math.floor(timeDiff / ONE_HOUR)}시간`;
    } else {
        return `${format(new Date(timeStamp), 'yyyy.MM.dd')}`;
    }
};
