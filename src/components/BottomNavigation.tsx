import { Home, Briefcase, Mail, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BottomNavigationProps {
    onMenuClick: () => void;
}

const BottomNavigation = ({ onMenuClick }: BottomNavigationProps) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Services", href: "/services", icon: Briefcase },
        { name: "Contact", href: "/contact", icon: Mail },
    ];

    const isActive = (path: string) => {
        if (path === "/" && currentPath === "/") return true;
        if (path !== "/" && currentPath.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[130] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-black/5 dark:border-white/10 md:hidden pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active
                                    ? "text-black dark:text-white"
                                    : "text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
                                }`}
                        >
                            <item.icon size={24} strokeWidth={active ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                            {active && (
                                <span className="absolute bottom-0 w-12 h-1 bg-black dark:bg-white rounded-t-full opacity-50" />
                            )}
                        </Link>
                    );
                })}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
                >
                    <Menu size={24} strokeWidth={2} />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNavigation;
