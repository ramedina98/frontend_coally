import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers, registerUser } from "../../features/auth/authSlice";
import { validateInput } from "../../utils/validateInput";
import { useNavigate } from "react-router-dom";
import LabelInput from "../molecules/LabelInput";

const RegisterForm = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { users, emails, isLoading, error, message } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const [passView, setPassView] = useState(false);
    const [iterator, setIterator] = useState(0);
    const [storageLabel, setStorageLabel] = useState({})
    const [changeLabel, setChangeLabel] = useState({
        nombre1: "Primer nombre",
        nombre2: "Segundo nombre",
        apellido1: "Apeido paterno",
        apellido2: "Apeido materno",
        email: "Correo",
        user_name: "Nombre de usuario",
        password: "Contraseña"
    });
    const [data, setData] = useState({
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        email: "",
        user_name: "",
        password: ""
    });

    const handleSeePasswordBtn = (e) => {
        e.preventDefault();
        setPassView(!passView);
    }

    const startProcess = (type, value, name) => {
        const response = validateInput(type, value);

        if (!response.valid) {

            if(iterator === 0){

                setStorageLabel(prev => ({
                    ...prev,
                    [name]: changeLabel[name],
                }));
            }
            setIterator(prev => prev+ 1);
            const errorLabel = response.error;
            setChangeLabel((prev) => ({
                ...prev,
                [name]: errorLabel,
            }));
            return;
        }
        setIterator(0);
        setChangeLabel((prev) => ({
            ...prev,
            [name]: storageLabel[name] || (type === "email" ? "Correo" : changeLabel[name]),
        }));

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const inputHanler = (e) => {
        const { name, value } = e.target;

        if(name !== "user_name" && name !== "password"){
            if(name === "email"){
                startProcess("email", value, name);
            } else {
                startProcess("text", value, name);
            }
        }

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const inputBlurHandler = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            const emailFound = emails.some((email) => value === email);

            if (emailFound) {
                if (iterator === 0) {
                    setStorageLabel((prev) => ({
                        ...prev,
                        [name]: changeLabel.email
                    }));
                }
                setIterator((prev) => prev + 1);
                setChangeLabel((prev) => ({
                    ...prev,
                    [name]: "Correo ya registrado",
                }));
            } else {
                setIterator(0);
                if(storageLabel[name]){
                    setChangeLabel((prev) => ({
                        ...prev,
                        [name]: storageLabel[name],
                    }));
                }
            }
        } else if (name === "user_name") {
            const userFound = users.some((user) => value === user);

            if (userFound) {
                if (iterator === 0) {
                    setStorageLabel((prev) => ({
                        ...prev,
                        [name]: changeLabel.user_name
                    }));
                }
                setIterator((prev) => prev + 1);
                setChangeLabel((prev) => ({
                    ...prev,
                    [name]: "Usuario ocupado",
                }));
            } else {
                setIterator(0);
                if(storageLabel[name]){
                    setChangeLabel((prev) => ({
                        ...prev,
                        [name]: storageLabel[name],
                    }));
                }
            }
        }
    };



    // funcion para enviar los datos a la base de datos...
    const registerNewUser = async (e) => {
        e.preventDefault();

        try {
            await dispatch(registerUser(data)).unwrap();

            setTimeout(() => {
                setData({
                    nombre1: "",
                    nombre2: "",
                    apellido1: "",
                    apellido2: "",
                    email: "",
                    user_name: "",
                    password: ""
                });

                navigate("/login");
            });
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    // Funcion para cancelar todo...
    const cancelProcessBtn = (e) => {
        e.preventDefault();

        setData({
            nombre1: "",
            nombre2: "",
            apellido1: "",
            apellido2: "",
            email: "",
            user_name: "",
            password: ""
        });

        navigate("/login");
    }

    return (
        <form
            className="shadow-md bg-blue-dark rounded-sm p-6 h-auto flex flex-col justify-between items-center my-6"
            style={{ width: 'clamp(220px, 90%, 650px)' }}
        >
            <div
                className="w-full p-3 text-center text-slate-50"
            >
                <h3
                    className="font-bold text-2xl mb-2 tracking-wider"
                >
                    Te damos la bienvenida a Taskify
                </h3>
                <span
                    className="tracking-wider"
                >
                    Empieza ya, organiza tus tareas fácilmente, mantén todo bajo control
                </span>
            </div>
            <div
                className="bg-blue-soft p-3 flex flex-wrap gap-4 mt-2 justify-between"
                style={{ width: '94%'}}
            >
                <LabelInput
                    labelText={changeLabel.nombre1}
                    inputId={"nombre1"}
                    inputName={"nombre1"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su primer nombre"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={changeLabel.nombre2}
                    inputId={"nombre2"}
                    inputName={"nombre2"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su nombre"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={changeLabel.apellido1}
                    inputId={"apellido1"}
                    inputName={"apellido1"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese apeido paterno"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={changeLabel.apellido2}
                    inputId={"apellido2"}
                    inputName={"apellido2"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese apeido materno"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={changeLabel.email}
                    inputId={"email"}
                    inputName={"email"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su correo electronico"}
                    inputHanler={(e) => inputHanler(e)}
                    blurHandler={(e) => inputBlurHandler(e)}
                />
                <LabelInput
                    labelText={changeLabel.user_name}
                    inputId={"username"}
                    inputName={"user_name"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese un nombre de usuario."}
                    inputHanler={(e) => inputHanler(e)}
                    blurHandler={(e) => inputBlurHandler(e)}
                />
                <LabelInput
                    labelText={changeLabel.password}
                    inputId={"password"}
                    inputName={"password"}
                    inputMax={100}
                    inputType={passView ? "text" : "password"}
                    placeholder={"Ingrese un contraseña"}
                    inputHanler={(e) => inputHanler(e)}
                />
            </div>
            <div
                className="w-full p-3"
            >
                <button
                    onClick={(e) => handleSeePasswordBtn(e)}
                    className="ml-3 py-2 pr-4 text-left text-slate-100 tracking-wider font-medium"
                >
                    Ver contraseña
                </button>
            </div>
            <div
                className="w-full flex flex-col justify-center items-center mt-6"
            >
                <button
                    className="p-3 flex justify-center items-center text-blue-dark tracking-wider font-medium text-lg bg-slate-50 hover:bg-slate-200  transition-colors rounded-md mb-4 shadow-sm"
                    style={{ width: 'clamp(220px, 90%, 450px)' }}
                    onClick={(e) => registerNewUser(e)}
                >
                    Registrarse
                </button>
                <button
                    className="p-3 flex justify-center items-center text-slate-100 tracking-wider font-medium text-lg bg-neutral-700 hover:bg-neutral-900 transition-colors rounded-md shadow-sm"
                    style={{ width: 'clamp(220px, 90%, 450px)' }}
                    onClick={(e) => cancelProcessBtn(e)}
                >
                    Ya tengo una cuenta
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;