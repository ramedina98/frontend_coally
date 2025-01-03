import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import LabelInput from "../molecules/LabelInput";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passView, setPassView] = useState(false);
    const [iterator, setIterator] = useState(0);
    const [storageLabel, setStorageLabel] = useState({});
    const [dataLabel, setDataLabel] = useState({
        user_name: "Nombre de usuario",
        password: "Contraseña"
    });
    const [data, setData] = useState({
        user_name: "",
        password: ""
    });

    const handleSeePasswordBtn = (e) => {
        e.preventDefault();
        setPassView(!passView);
    }

    const inputHanler = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const inputValidator = () => {
        let isValid = true;

        const fields = ["user_name", "password"];

        fields.forEach((field) => {
            if (data[field] === "") {
                isValid = false;

                if (iterator === 0) {
                    setStorageLabel((prev) => ({
                        ...prev,
                        [field]: dataLabel[field],
                    }));
                }

                setIterator((prev) => prev + 1);
                setDataLabel((prev) => ({
                    ...prev,
                    [field]: "No campos vacíos",
                }));
            }
        });

        return isValid;
    };

    const handleLogBtn = async(e) => {
        e.preventDefault();

        const isValid = inputValidator();

        if (!isValid) {
            console.log("Hay campos vacíos. Corrección requerida.");
            return;
        }

        try {
            await dispatch(loginUser(data)).unwrap();

            setData({
                user_name: "",
                password: ""
            });

            navigate("/taskify/");
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    // Funcion para cancelar todo...
    const cancelProcessBtn = (e) => {
        e.preventDefault();

        setData({
            user_name: "",
            password: ""
        });

        navigate("/");
    }

    // funcion para hacer el reset del password...
    const resetPass = (e) => {
        e.preventDefault();
        navigate("/recover-password")
    }

    return (
        <form
            className="shadow-md bg-blue-dark rounded-sm p-6 h-auto flex flex-col justify-between items-center"
            style={{ width: 'clamp(220px, 90%, 650px)' }}
        >
            <div
                className="w-full p-3 text-center text-slate-50"
            >
                <h3
                    className="font-bold text-2xl mb-2 tracking-wider"
                >
                    Inicia sesión en tu cuenta
                </h3>
                <span
                    className="tracking-wider"
                >
                    Siempre es bueno tenerte de vuelta
                </span>
            </div>
            <div
                className="bg-blue-soft p-3 flex flex-wrap gap-4 mt-2 justify-between"
                style={{ width: '94%'}}
            >
                <LabelInput
                    labelText={dataLabel.user_name}
                    inputId={"user_name"}
                    inputName={"user_name"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su nombre de usuario"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={dataLabel.password}
                    inputId={"password"}
                    inputName={"password"}
                    inputMax={100}
                    inputType={passView ? "text": "password"}
                    placeholder={"Ingrese su contraseña"}
                    inputHanler={(e) => inputHanler(e)}
                />
            </div>
            <div
                className="w-full my-2 p-3 flex flex-wrap gap-4 justify-between"
            >
                <button
                    onClick={(e) => handleSeePasswordBtn(e)}
                    className="ml-3 py-2 pr-4 text-left text-slate-100 tracking-wider font-medium"
                >
                    Ver contraseña
                </button>
                <button
                    onClick={(e) => resetPass(e)}
                    className="ml-3 py-2 pr-4 text-left text-slate-100 tracking-wider font-medium"
                >
                    Olvide mi contraseña
                </button>
            </div>
            <button
                    className="p-3 flex justify-center items-center text-blue-dark tracking-wider font-medium text-lg bg-slate-50 hover:bg-slate-200  transition-colors rounded-md mb-4 shadow-sm"
                    style={{ width: 'clamp(220px, 90%, 450px)' }}
                    onClick={(e) => handleLogBtn(e)}
                >
                    Iniciar sesión
                </button>
                <button
                    className="p-3 flex justify-center items-center text-slate-100 tracking-wider font-medium text-lg bg-neutral-700 hover:bg-neutral-900 transition-colors rounded-md shadow-sm"
                    style={{ width: 'clamp(220px, 90%, 450px)' }}
                    onClick={(e) => cancelProcessBtn(e)}
                >
                    Cancelar
                </button>
        </form>
    );
}

export default LoginForm;