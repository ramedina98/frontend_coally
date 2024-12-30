import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const WelcomeView = () => {
    const navigate = useNavigate();

    const handleButton = () => {
        navigate("/register")
    }

    return (
        <div
            className="mt-5 h-full flex flex-col justify-start items-end"
            style={{ width: 'clamp(220px, 90%, 1280px)' }}
        >
            <div
                className="w-full p-6 flex flex-col justify-center items-start z-50"
            >
                <div
                    className="font-bold tracking-wider text-5xl leading-normal"
                    style={{ width: '950px' }}
                >
                    <h2><span>La plataforma que necesitas, </span>simplifica tus tareas, un clic a la vez.</h2>
                </div>
                <div
                    className="mt-5 font-normal tracking-wider text-lg leading-normal"
                    style={{ width: '450px' }}
                >
                    <p>
                        Organiza tus tareas fácilmente, mantén todo bajo control y toma decisiones
                        con confianza para lograr más cada día.
                    </p>
                </div>
            </div>
            <div
                className="mt-5 w-full p-6 flex flex-col justify-center items-start z-50"
            >
                <button
                onClick={handleButton}
                    className={'py-4 px-5 rounded-lg border-2 border-blue-soft bg-blue-soft hover:bg-blue-light text-slate-50 cursor-pointer mb-6 text-xl'}
                >
                    Crear una cuenta
                </button>
                <div>
                    <span>
                        No se necesita tarjeta de crédito - Plan Gratis sin límite de tiempo
                    </span>
                </div>
            </div>
            <figure
                className="relative bottom-60 right-64"
                style={{ width: '150px', height: '150px' }}
            >
                <img src={Logo} alt="" />
            </figure>
        </div>
    );
}

export default WelcomeView;