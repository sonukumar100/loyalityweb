import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const menuItems = [
    { label: "Digital Catalog", path: "/admin/settings/digital-catalog" },
    { label: "Brand Point Master", path: "/admin/settings/daily-coupon-access" },
    { label: "Videos", path: "/admin/settings/videos" },
    { label: "Brand Points Product", path: "/admin/settings/product-points" },
];

const Sidebar = () => {
    const location = useLocation();

    // Optional: Load Poppins font dynamically
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#e0f2ff] to-[#cce5ff] shadow-2xl p-6 font-[Poppins]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <ul className="space-y-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`group relative flex items-center px-5 py-3 rounded-xl font-semibold text-md transition-all duration-300 ease-in-out overflow-hidden
                ${isActive
                                    ? "bg-gradient-to-r from-[#0000ff] to-[#4f46e5] text-white shadow-xl"
                                    : "bg-white text-blue-900 hover:text-white hover:shadow-lg"
                                }`}
                        >
                            {/* Animated background on hover */}
                            <span
                                className="absolute inset-0 bg-gradient-to-r from-[#0000ff] to-[#4f46e5] z-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
                                aria-hidden="true"
                            ></span>

                            {/* Left border indicator */}
                            <span
                                className={`absolute left-0 h-full w-1 rounded-r bg-[#0000ff] transition-all duration-300 z-10 
                ${isActive ? "opacity-100 " : "opacity-0 group-hover:opacity-60 "}
              `}
                            ></span>

                            {/* Label */}
                            <span className="flex-1 text-[14px] relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                                {item.label}
                            </span>

                            {/* Arrow */}
                            <span
                                className={`ml-2 text-lg relative z-10 transition-transform duration-300
                ${isActive ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:opacity-60"}
              `}
                            >
                                ➤
                            </span>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
