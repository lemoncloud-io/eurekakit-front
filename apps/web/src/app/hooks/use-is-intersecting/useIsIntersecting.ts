import { useCallback, useEffect, useRef, useState } from 'react';

export const useIsIntersecting = <T extends HTMLElement>(initialValue = false) => {
    const intersectingRef = useRef<T | null>(null);
    const observerRef = useRef<IntersectionObserver>();
    const [isIntersecting, setIsIntersecting] = useState(initialValue);

    const setRef = useCallback((node: T | null) => {
        if (intersectingRef.current) {
            observerRef.current?.unobserve(intersectingRef.current);
        }

        intersectingRef.current = node;

        if (!node) return;

        if (observerRef.current) {
            observerRef.current.observe(node);
        }
    }, []);

    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    setIsIntersecting(entry.isIntersecting);
                });
            });
        }
        if (intersectingRef.current) {
            observerRef.current.unobserve(intersectingRef.current);
            observerRef.current.observe(intersectingRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return { ref: intersectingRef, observer: observerRef.current, setRef, isIntersecting };
};
