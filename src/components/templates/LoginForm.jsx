import { useState } from "react";
import LabelInput from "../molecules/LabelInput";

const LoginForm = () => {

    const [data, setData] = useState({
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        email: "",
        user_name: "",
        password: ""
    });

    const inputHanler = (e) => {
        console.log(e.target.name);
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
                    labelText={"Primer nombre"}
                    inputId={"nombre1"}
                    inputName={"Nombre1"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su primer nombre"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Segundo nombre"}
                    inputId={"nombre2"}
                    inputName={"Nombre2"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su nombre"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Apellido paterno"}
                    inputId={"apellido1"}
                    inputName={"Apellido1"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese apeido paterno"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Apeido materno"}
                    inputId={"apellido2"}
                    inputName={"Apellido2"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese apeido materno"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Correo"}
                    inputId={"email"}
                    inputName={"Email"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su correo electronico"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Nombre de usuario"}
                    inputId={"username"}
                    inputName={"Username"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese un nombre de usuario."}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={"Contraseña"}
                    inputId={"password"}
                    inputName={"Password"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese un contraseña"}
                    inputHanler={(e) => inputHanler(e)}
                />
            </div>
        </form>
    );
}

export default LoginForm;