import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                    <Link to="/" className="flex items-center hover:text-primary transition-colors">
                        <Home className="w-4 h-4" />
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    let to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    // Redirect 'Services' breadcrumb to the landing page section
                    if (value === "services") {
                        to = "/services";
                    }

                    const isLast = index === pathnames.length - 1;
                    const label = value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

                    return (
                        <li key={index} className="flex items-center space-x-2">
                            <ChevronRight className="w-4 h-4" />
                            {isLast ? (
                                <span className="font-medium text-foreground">{label}</span>
                            ) : (
                                <Link to={to} className="hover:text-primary transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
