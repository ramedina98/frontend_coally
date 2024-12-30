import { Outlet } from "react-router-dom";
import { faWarning, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import Notification from "../components/molecules/Notificacion";

const Home = () => {
    const { error, message } = useSelector(state => state.auth);

    return (
        <>
            <Header />
                <main
                    className="w-full flex justify-center items-center"
                    style={{ minHeight: '80vh' }}
                >
                    {(error || message) && (
                        <Notification
                            icon={error ? faWarning : faCheckCircle}
                            size={"300px"}
                            color={error ? "bg-red-400" : "bg-green-400"}
                            title={error ? "Ocurrio un un problema" : "Exito!"}
                            text={error ? error : message}
                            onClose={() => {}}
                        />
                    )}
                    <Outlet />
                </main>
            <Footer />
        </>
    )
}

export default Home;