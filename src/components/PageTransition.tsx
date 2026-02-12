import { ReactNode } from "react";

const PageTransition = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default PageTransition;
