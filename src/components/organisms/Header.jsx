import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"

const Header = () => {
    const [activeTab, setActiveTab] = useState("");
    const navigate = useNavigate();

    const handleNavigation = (tab, path) => {
        setActiveTab(tab);
        navigate(path);
    };

    return (
        <header
            className="w-full p-6 bg-slate-50 shadow-md flex justify-center items-center"
        >
            <div
                className="flex flex-wrap gap-6 justify-between items-center"
                style={{ width: 'clamp(220px, 90%, 1280px)' }}
            >
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={() => handleNavigation("inicio", "/")}
                >
                    <figure
                        style={{ width: '60px', height: '60px' }}
                    >
                        <img
                            src={Logo}
                            alt="Logo de la aplicación Taskify"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <h2
                        className="ml-5 tracking-wider font-semibold text-3xl text-blue-light"
                    >
                        TaskiFy
                    </h2>
                </div>
                <div
                    className=""
                    style={{ width: '450px', height: 'auto' }}
                >
                    <ul
                        className="w-full flex flex-row justify-between items-center text-lg tracking-wide"
                    >
                        <li
                            className="py-2 px-3 rounded-md border-2 border-transparent hover:border-blue-soft cursor-pointer"
                        >
                            Precios
                        </li>
                        <li
                            className={`py-2 px-3 rounded-md border-2 ${
                                activeTab === "iniciar-sesion"
                                    ? "border-blue-soft bg-blue-soft text-slate-50"
                                    : "border-transparent hover:border-blue-soft"
                            } cursor-pointer`}
                            onClick={() => handleNavigation("iniciar-sesion", "/login")}
                        >
                            Iniciar Sesión
                        </li>
                        <li
                            className={`py-2 px-3 rounded-md border-2 ${
                                activeTab === "crear-cuenta"
                                    ? "border-blue-soft bg-blue-soft text-slate-50"
                                    : "border-blue-soft hover:border-blue-soft"
                            } cursor-pointer`}
                            onClick={() => handleNavigation("crear-cuenta", "/register")}
                        >
                            Crear una cuenta
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;