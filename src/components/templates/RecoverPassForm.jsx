import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recoverPassword } from "../../features/auth/authSlice";
import LabelInput from "../molecules/LabelInput";

const RecoverPassForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passView, setPassView] = useState(false);
    const [storageLabel, setStorageLabel] = useState("");
    const [dataLabel, setDataLabel] = useState("Nombre de usuario",);
    const [data, setData] = useState("");

    const handleSeePasswordBtn = (e) => {
        e.preventDefault();
        setPassView(!passView);
    }

    const inputHanler = (e) => {
        const {value} = e.target;
        setData(value);
    }


    const handleResetBtn = async(e) => {
        e.preventDefault();

        if(data === ""){
            setStorageLabel(dataLabel);
            setDataLabel("No campos vacios");
            return;
        }else {
            if(storageLabel !== ""){
                setDataLabel(storageLabel);
            }

            try {
                await dispatch(recoverPassword(data)).unwrap();
                navigate("/reset-password")
            } catch (error) {
                console.log("Error: ", error.message);
            }
        }
    }

    // Funcion para cancelar todo...
    const cancelProcessBtn = (e) => {
        e.preventDefault();

        setData("");

        navigate("/login");
    }

    return (
        <form
            className="shadow-md bg-blue-dark rounded-sm p-6 h-auto flex flex-col justify-between items-center"
            style={{ width: 'clamp(220px, 90%, 450px)' }}
        >
            <div
                className="w-full p-3 text-center text-slate-50"
            >
                <h3
                    className="font-bold text-2xl mb-2 tracking-wider"
                >
                    Restaurar contraseña
                </h3>
            </div>
            <div
                className="bg-blue-soft p-3 flex flex-wrap gap-4 mt-2 justify-center"
                style={{ width: '94%'}}
            >
                <LabelInput
                    labelText={dataLabel}
                    inputId={"user_name"}
                    inputName={"user_name"}
                    inputMax={100}
                    inputType={"text"}
                    placeholder={"Ingrese su nombre de usuario"}
                    inputHanler={(e) => inputHanler(e)}
                />
            </div>
            <button
                className="mt-4 p-3 flex justify-center items-center text-blue-dark tracking-wider font-medium text-lg bg-slate-50 hover:bg-slate-200  transition-colors rounded-md mb-4 shadow-sm"
                style={{ width: 'clamp(220px, 90%, 450px)' }}
                onClick={(e) => handleResetBtn(e)}
            >
                Recuperar
            </button>
            <button
                className="p-3 flex justify-center items-center text-slate-100 tracking-wider font-medium text-lg bg-neutral-700 hover:bg-neutral-900 transition-colors rounded-md shadow-sm"
                style={{ width: 'clamp(220px, 90%, 450px)' }}
                onClick={(e) => cancelProcessBtn(e)}
            >
                Regresar a login
            </button>
        </form>
    );
}

export default RecoverPassForm;