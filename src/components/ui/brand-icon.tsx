/* Icone para Google e Github */

import type { SimpleIcon } from "simple-icons";

interface BrandIconProps {
    icon: SimpleIcon;
    size?: number;
    className?: string;
}

export function BrandIcon({
    icon,
    size = 20,
    className,
}: BrandIconProps) {
    return (
        <svg
            role="img"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            className={className}
        >
            <path d={icon.path} />
        </svg>
    );
}