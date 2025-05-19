export const formatCount = (count?: number) => {
    if (!count) {
        return '';
    }

    if (count < 10000) {
        return `${count.toLocaleString()}`;
    } else {
        const ManUnit = Math.floor(count / 10000);
        const ChunUnit = Math.floor(count / 1000) - ManUnit * 10;

        return ChunUnit === 0 ? `${ManUnit}만` : `${ManUnit}.${ChunUnit}만`;
    }
};
