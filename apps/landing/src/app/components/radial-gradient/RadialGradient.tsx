import { cn } from '@lemon/ui-kit/lib/utils';

import type { ClassNameValue } from 'tailwind-merge';

type ColorStop = {
    position: string;
    color: string;
};

type RadialGradientProps = {
    radius: number;
    colorStops: ColorStop[];
    style?: React.CSSProperties;
    className?: ClassNameValue;
};

export const RadialGradient: React.FC<RadialGradientProps> = ({ radius, colorStops, style, className }) => {
    const gradientStops = colorStops.map(({ position, color }) => `${color} ${position}`).join(', ');

    const gradient = `radial-gradient(circle, ${gradientStops})`;

    const gradientStyle: React.CSSProperties = {
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        background: gradient,
        pointerEvents: 'none',
        ...style,
    };

    return <div style={gradientStyle} className={cn(className)} />;
};
