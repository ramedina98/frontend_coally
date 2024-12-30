import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import Logo from "../../assets/logo.png"

const HeaderUserPage = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const logout = async (e) => {
        e.preventDefault();

        try {
            await dispatch(logoutUser(accessToken)).unwrap();
        } catch (error) {
            console.log("Error: " + error);
        }
    }

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
                    className="flex flex-row justify-between items-center"
                    style={{ width: '350px', height: 'auto' }}
                >
                    <button
                        className="py-2 rounded-md border-2 border-blue-soft hover:bg-blue-soft hover:text-slate-100 transition-colors cursor-pointer"
                        style={{ width: '150px' }}
                        onClick={(e) => logout(e)}
                    >
                        Cerrar Sesión
                    </button>
                    <button
                        className="py-2 rounded-md border-2 border-blue-dark hover:bg-blue-dark cursor-pointer hover:text-slate-100 transition-colors"
                        style={{ width: '150px' }}
                        onClick={() => console.log('hola')}
                    >
                        Ajustes
                    </button>
                </div>
            </div>
        </header>
    );
}

export default HeaderUserPage;