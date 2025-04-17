import { useCallback, useEffect, useRef, useState } from 'react';

export const useIsIntersecting = <T extends HTMLElement>(initialValue = false) => {
    const intersectingRef = useRef<T | null>(null);
    const observerRef = useRef<IntersectionObserver>();
    const [isIntersecting, setIsIntersecting] = useState(initialValue);

    const setRef = useCallback((node: T | null) => {
        if (intersectingRef.current) {
            // 이전 요소의 관찰을 중지
            observerRef.current?.unobserve(intersectingRef.current);
        }

        intersectingRef.current = node;

        if (!node) return;

        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    setIsIntersecting(entry.isIntersecting);
                });
            });
        }

        observerRef.current.observe(node);
    }, []);

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return { setRef, isIntersecting };
};
