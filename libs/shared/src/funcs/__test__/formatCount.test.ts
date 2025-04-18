import { describe, expect, it } from 'vitest';

import { formatCount } from '../formatCount';

describe('formatCount', () => {
    describe('10000 미만의 숫자', () => {
        it('1000 미만의 숫자', () => {
            expect(formatCount(999)).toBe('999');
        });

        it('1000 이상의 숫자', () => {
            expect(formatCount(1000)).toBe('1,000');
        });

        it('9999까지의 숫자', () => {
            expect(formatCount(9999)).toBe('9,999');
        });
    });

    describe('10000 이상의 숫자', () => {
        it('정확히 1만', () => {
            expect(formatCount(10000)).toBe('1만');
        });

        it('1만 초과 2만 미만', () => {
            expect(formatCount(15000)).toBe('1.5만');
        });

        it('정확히 10만', () => {
            expect(formatCount(100000)).toBe('10만');
        });

        it('천 단위가 0인 경우', () => {
            expect(formatCount(20000)).toBe('2만');
        });

        it('천 단위가 있는 경우', () => {
            expect(formatCount(25000)).toBe('2.5만');
        });

        it('큰 숫자 (100만)', () => {
            expect(formatCount(1000000)).toBe('100만');
        });
    });
});
