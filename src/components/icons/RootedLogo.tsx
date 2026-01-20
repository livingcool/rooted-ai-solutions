
import { motion } from "framer-motion";
import logoTypeSrc from "../../assets/ganeshE1.svg";

export const RootedLogoMark = ({
    className,
    variant,
    ...props
}: {
    className?: string;
    variant?: any;
} & React.SVGProps<SVGSVGElement>) => (
    <motion.svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <motion.path
            variants={variant}
            d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zm0 946.35C272.08 946.35 77.65 751.92 77.65 512S272.08 77.65 512 77.65 946.35 272.08 946.35 512 751.92 946.35 512 946.35z"
            fillOpacity="0.8"
        />
        <motion.path
            variants={variant}
            d="M666.19 328.71c-42.54 0-77.16 34.62-77.16 77.16 0 42.54 34.62 77.16 77.16 77.16 42.54 0 77.16-34.62 77.16-77.16 0-42.54-34.62-77.16-77.16-77.16zm0 119.5c-23.36 0-42.34-18.98-42.34-42.34s18.98-42.34 42.34-42.34 42.34 18.98 42.34 42.34-18.98 42.34-42.34 42.34z"
        />
        <motion.path
            variants={variant}
            d="M357.81 328.71c-42.54 0-77.16 34.62-77.16 77.16 0 42.54 34.62 77.16 77.16 77.16 42.54 0 77.16-34.62 77.16-77.16-77.16zm0 119.5c-23.36 0-42.34-18.98-42.34-42.34s18.98-42.34 42.34-42.34 42.34 18.98 42.34 42.34-18.98 42.34-42.34 42.34z"
        />
        <motion.path
            variants={variant}
            d="M512 590.2c-73.43 0-136.06 46.8-158.05 111.45-3.32 9.77 1.83 20.47 11.6 23.79 9.76 3.32 20.47-1.83 23.79-11.6 15.68-46.06 60.3-79.31 112.66-79.31s96.98 33.25 112.66 79.31c3.32 9.77 14.03 14.92 23.79 11.6 9.77-3.32 14.92-14.03 11.6-23.79C648.06 637 585.43 590.2 512 590.2z"
        />
    </motion.svg>
);

export const RootedLogoType = ({
    className,
    variant,
    ...props
}: {
    className?: string;
    variant?: any;
} & React.ComponentProps<typeof motion.img>) => (
    <motion.img
        src={logoTypeSrc}
        alt="Rooted AI"
        className={className}
        variants={variant}
        {...props}
    />
);
