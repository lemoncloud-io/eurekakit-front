import { beforeEach, describe, expect, it, vi } from 'vitest';

import { formatRelativeTime } from '../formatRelativeTime';

describe('formatRelativeTime', () => {
    const NOW = 1640995200000; // 2022-01-01 00:00:00

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(NOW);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('초 단위', () => {
        it('30초 전', () => {
            const timestamp = NOW - 30 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('30초');
        });

        it('59초 전', () => {
            const timestamp = NOW - 59 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('59초');
        });
    });

    describe('분 단위', () => {
        it('1분 전', () => {
            const timestamp = NOW - 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('1분');
        });

        it('30분 전', () => {
            const timestamp = NOW - 30 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('30분');
        });

        it('59분 전', () => {
            const timestamp = NOW - 59 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('59분');
        });
    });

    describe('시간 단위', () => {
        it('1시간 전', () => {
            const timestamp = NOW - 60 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('1시간');
        });

        it('12시간 전', () => {
            const timestamp = NOW - 12 * 60 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('12시간');
        });

        it('23시간 전', () => {
            const timestamp = NOW - 23 * 60 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('23시간');
        });
    });

    describe('날짜 단위', () => {
        it('1일 이상', () => {
            const timestamp = NOW - 25 * 60 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('2021.12.31');
        });

        it('여러 달 전', () => {
            const timestamp = NOW - 90 * 24 * 60 * 60 * 1000;
            expect(formatRelativeTime(timestamp)).toBe('2021.10.03');
        });
    });
});
